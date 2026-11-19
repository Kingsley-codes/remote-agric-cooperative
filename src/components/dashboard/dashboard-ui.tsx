"use client";

import { useState, type ReactNode } from "react";
import { Icon, type IconName } from "@/components/public/site-ui";

export type Identity = { name: string; email: string; reference?: string };
export type Transaction = {
  date: string;
  description: string;
  type: string;
  amount: number;
  status: string;
  reference: string;
};
export const money = (amount: number) => `₦ ${amount.toLocaleString("en-NG")}`;
export const transactions: Transaction[] = [
  {
    date: "Oct 20, 2026",
    description: "Short-term contribution",
    type: "Contribution",
    amount: 50000,
    status: "Completed",
    reference: "COOP-001245",
  },
  {
    date: "Oct 18, 2026",
    description: "Loan repayment",
    type: "Repayment",
    amount: 100000,
    status: "Completed",
    reference: "COOP-001244",
  },
  {
    date: "Oct 15, 2026",
    description: "Withdrawal to bank",
    type: "Withdrawal",
    amount: 80000,
    status: "Processing",
    reference: "COOP-001243",
  },
  {
    date: "Oct 10, 2026",
    description: "Long-term contribution",
    type: "Contribution",
    amount: 200000,
    status: "Completed",
    reference: "COOP-001242",
  },
  {
    date: "Oct 05, 2026",
    description: "Loan disbursement",
    type: "Loan",
    amount: 500000,
    status: "Completed",
    reference: "COOP-001241",
  },
];
export const members = [
  {
    name: "Kingsley Agbam",
    email: "kingsley@example.com",
    id: "RAU-00128",
    joined: "Oct 20, 2026",
    status: "Active",
  },
  {
    name: "Amina Yusuf",
    email: "amina@example.com",
    id: "RAU-00127",
    joined: "Oct 18, 2026",
    status: "Active",
  },
  {
    name: "Chinedu Okafor",
    email: "chinedu@example.com",
    id: "RAU-00126",
    joined: "Oct 16, 2026",
    status: "Active",
  },
  {
    name: "Tolu Adeyemi",
    email: "tolu@example.com",
    id: "RAU-00125",
    joined: "Oct 15, 2026",
    status: "Pending",
  },
];

export function Glyph({ name }: { name: string }) {
  const custom: Record<string, ReactNode> = {
    home: (
      <>
        <path d="m3 10 9-7 9 7v11h-6v-7H9v7H3Z" />
        <path d="M1 11 12 2l11 9" />
      </>
    ),
    document: (
      <>
        <path d="M5 2h10l4 4v16H5Z" />
        <path d="M14 2v5h5M8 11h8m-8 4h8m-8 4h5" />
      </>
    ),
    bell: (
      <>
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 8-3 8h18s-3-1-3-8M9 21h6" />
      </>
    ),
    upload: (
      <>
        <path d="M12 16V2m-5 5 5-5 5 5M3 13v8h18v-8" />
      </>
    ),
    plus: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 7v10M7 12h10" />
      </>
    ),
    search: (
      <>
        <circle cx="10" cy="10" r="7" />
        <path d="m15 15 7 7" />
      </>
    ),
  };
  if (!custom[name]) return <Icon name={name as IconName} />;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {custom[name]}
    </svg>
  );
}

export function ActivityChart({ platform }: { platform: boolean }) {
  const [range, setRange] = useState("6");
  const [point, setPoint] = useState<number | null>(null);
  const months =
    range === "6"
      ? ["May", "Jun", "Jul", "Aug", "Sep", "Oct"]
      : ["Aug", "Sep", "Oct"];
  const base = [
    [500, 800, 1000, 1500, 1730, 1980],
    [290, 430, 540, 710, 920, 1120],
    [180, 220, 260, 310, 440, 600],
  ];
  const series = range === "6" ? base : base.map((values) => values.slice(3));
  const colors = ["#075b3c", "#e5ab1b", "#3998f7"];
  const x = (i: number) => 58 + i * (630 / (months.length - 1));
  const y = (value: number) => 170 - (value / 2000) * 142;
  const labels = [
    "Long-term Contributions",
    "Short-term Contributions",
    "Loan Balance",
  ];
  return (
    <section className="dash-panel dash-chart">
      <div className="dash-panel-heading">
        <span className="dash-round-icon">
          <Glyph name="document" />
        </span>
        <div>
          <h2>
            {platform
              ? "Cooperative Growth"
              : "Your Contributions and Balances"}
          </h2>
          <p>
            A simple view of {platform ? "platform" : "your"} activity over
            time.
          </p>
        </div>
        <label className="dash-select">
          <span className="sr-only">Chart period</span>
          <select
            value={range}
            onChange={(event) => {
              setRange(event.target.value);
              setPoint(null);
            }}
          >
            <option value="6">Last 6 months</option>
            <option value="3">Last 3 months</option>
          </select>
        </label>
      </div>
      <div className="dash-chart-plot">
        <svg
          viewBox="0 0 720 213"
          role="img"
          aria-label={`Sample ${platform ? "platform" : "personal"} contributions and loan balances, ${months[0]} to October. Long-term contributions rise steadily.`}
        >
          <defs>
            <linearGradient id="balance-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#81b798" stopOpacity=".22" />
              <stop offset="100%" stopColor="#81b798" stopOpacity=".02" />
            </linearGradient>
          </defs>
          {[0, 500, 1000, 1500, 2000].map((value) => (
            <g key={value}>
              <line
                x1="48"
                x2="695"
                y1={y(value)}
                y2={y(value)}
                stroke="#e7ebe9"
              />
              <text x="38" y={y(value) + 4} textAnchor="end">
                {value === 0
                  ? "₦ 0"
                  : `₦ ${value < 1000 ? "500K" : `${value / 1000}M`}`}
              </text>
            </g>
          ))}
          <path
            d={`M ${x(0)},170 ${series[0].map((value, i) => `L ${x(i)},${y(value)}`).join(" ")} L ${x(months.length - 1)},170 Z`}
            fill="url(#balance-fill)"
          />
          {series.map((values, index) => (
            <g key={colors[index]}>
              <polyline
                points={values
                  .map((value, i) => `${x(i)},${y(value)}`)
                  .join(" ")}
                fill="none"
                stroke={colors[index]}
                strokeWidth="1.7"
              />
              {values.map((value, i) => (
                <circle
                  key={i}
                  cx={x(i)}
                  cy={y(value)}
                  r={point === i ? 5 : 4}
                  fill={colors[index]}
                />
              ))}
            </g>
          ))}
          {months.map((month, i) => (
            <text key={month} x={x(i)} y="199" textAnchor="middle">
              {month}
            </text>
          ))}
        </svg>
        <div className="dash-chart-hitareas">
          {months.map((month, i) => (
            <button
              key={month}
              aria-label={`View ${month} sample balances`}
              onFocus={() => setPoint(i)}
              onBlur={() => setPoint(null)}
              onMouseEnter={() => setPoint(i)}
              onMouseLeave={() => setPoint(null)}
              onClick={() => setPoint(point === i ? null : i)}
            />
          ))}
        </div>
        {point !== null && (
          <div className="dash-chart-tooltip" role="status">
            <strong>{months[point]} · sample balances</strong>
            {series.map((values, i) => (
              <span key={i} style={{ color: colors[i] }}>
                {labels[i]}: {money(values[point] * 1000)}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="dash-chart-legend">
        {labels.map((label, i) => (
          <span key={label}>
            <i style={{ background: colors[i] }} />
            {label}
          </span>
        ))}
      </div>
    </section>
  );
}
