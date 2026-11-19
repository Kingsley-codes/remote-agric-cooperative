"use client";
import { authRequest } from "@/lib/api-client";

import { useState } from "react";
import type { InputHTMLAttributes } from "react";
import { Icon, type IconName } from "@/components/public/site-ui";

export function PasswordRecovery() {
  const [step, setStep] = useState<"request" | "reset" | "done">("request");
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  return (
    <form
      className="auth-recovery"
      onSubmit={async (event) => {
        event.preventDefault();
        if (busy) return;
        const values = new FormData(event.currentTarget);
        setBusy(true);
        try {
          if (step === "request") {
            await authRequest("forgot-password", { email });
            setStep("reset");
            setNotice(
              "If an account exists, we sent a reset code to your email.",
            );
          } else {
            await authRequest("reset-password", {
              email,
              otp: values.get("otp"),
              password: values.get("new-password"),
              confirmPassword: values.get("reset-confirm-password"),
            });
            setStep("done");
            setNotice(
              "Your password has been reset. Close this dialog and sign in with your new password.",
            );
          }
        } catch (error) {
          setNotice(
            error instanceof Error
              ? error.message
              : "Unable to reset your password.",
          );
        } finally {
          setBusy(false);
        }
      }}
    >
      {step !== "done" && (
        <>
          <Field
            id="recovery-email"
            label="Email Address"
            icon="mail"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            readOnly={step === "reset"}
            required
          />
          {step === "reset" && (
            <>
              <Field
                id="otp"
                label="Reset Code"
                icon="mail"
                autoComplete="one-time-code"
                inputMode="numeric"
                pattern="[0-9]{6}"
                maxLength={6}
                required
              />
              <Field
                id="new-password"
                label="New Password"
                icon="lock"
                type="password"
                autoComplete="new-password"
                minLength={8}
                maxLength={72}
                pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,72}"
                hint="Use uppercase, lowercase, a number, and a symbol."
                required
              />
              <Field
                id="reset-confirm-password"
                label="Confirm Password"
                icon="lock"
                type="password"
                autoComplete="new-password"
                minLength={8}
                maxLength={72}
                required
              />
              <button
                type="button"
                onClick={() => {
                  setStep("request");
                  setNotice("");
                }}
              >
                Request another code
              </button>
            </>
          )}
          <button className="auth-primary" type="submit" disabled={busy}>
            {busy
              ? "Please wait…"
              : step === "request"
                ? "Send reset code"
                : "Reset password"}
          </button>
        </>
      )}
      {notice && (
        <p className="auth-notice" role="status">
          {notice}
        </p>
      )}
    </form>
  );
}

export function FieldIcon({
  name,
}: {
  name: IconName | "mail" | "link" | "phone";
}) {
  if (name !== "mail" && name !== "link" && name !== "phone")
    return <Icon name={name} className="auth-icon" />;
  return (
    <svg
      className="auth-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {name === "mail" ? (
        <>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 6 9 7 9-7" />
        </>
      ) : name === "link" ? (
        <>
          <path d="m10 13 4-4m-6 2-3 3a4 4 0 0 0 6 6l3-3m-4-10 3-3a4 4 0 0 1 6 6l-3 3" />
        </>
      ) : (
        <path d="m7 3 3 5-3 3a15 15 0 0 0 6 6l3-3 5 3c0 3-2 5-5 4A23 23 0 0 1 3 8C2 5 4 3 7 3Z" />
      )}
    </svg>
  );
}

export function Field({
  label,
  icon,
  id,
  required,
  type = "text",
  hint,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  icon: Parameters<typeof FieldIcon>[0]["name"];
  id: string;
  hint?: string;
}) {
  const [visible, setVisible] = useState(false);
  const password = type === "password";
  return (
    <div className="auth-field">
      <label htmlFor={id}>
        {label}
        {required && <span className="auth-required"> *</span>}
      </label>
      <div className="auth-input-wrap">
        <FieldIcon name={icon} />
        <input
          {...props}
          id={id}
          name={props.name ?? id}
          required={required}
          type={password && visible ? "text" : type}
          aria-describedby={hint ? `${id}-hint` : undefined}
        />
        {password && (
          <button
            className="auth-eye"
            type="button"
            onClick={() => setVisible(!visible)}
            aria-label={`${visible ? "Hide" : "Show"} ${label.toLowerCase()}`}
            aria-pressed={visible}
          >
            <Icon name="eye" className="auth-icon" />
            {!visible && <span className="auth-eye-slash" />}
          </button>
        )}
      </div>
      {hint && (
        <p id={`${id}-hint`} className="auth-hint">
          {hint}
        </p>
      )}
    </div>
  );
}

export const benefits: {
  title: string;
  description: string;
  icon: IconName;
}[] = [
  {
    title: "Save",
    description: "Contribute for short-term and long-term goals.",
    icon: "coins",
  },
  {
    title: "Grow",
    description: "Earn returns through pooled agricultural investments.",
    icon: "chart",
  },
  {
    title: "Access Financing",
    description: "Get loans backed by your agricultural investment.",
    icon: "loan",
  },
  {
    title: "Build Together",
    description: "Be part of a community of forward-thinking remote farmers.",
    icon: "people",
  },
];
