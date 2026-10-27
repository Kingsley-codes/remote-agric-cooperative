import type { IconName } from "@/components/public/site-ui";

type Question = { question: string; answer: string };
type FaqCategory = { id: string; label: string; icon: IconName; questions: Question[] };

export const faqCategories: FaqCategory[] = [
  {
    id: "general", label: "General Questions", icon: "people",
    questions: [
      { question: "What is Remote Agric Cooperative?", answer: "Remote Agric Cooperative is a member-driven financial cooperative for e-farmers. It provides a platform to save, grow, access loans, and build long-term wealth together, powered by agriculture and driven by people like you." },
      { question: "Who can join the cooperative?", answer: "Membership is for people with an existing and active Remote Agric investment. You do not need to own or work on a farm. Your Remote Agric account will be verified as part of registration." },
      { question: "Do I need an existing Remote Agric account?", answer: "Yes. You need an existing Remote Agric account and an active investment to join the cooperative. Use the email associated with that account when you register so your eligibility can be checked." },
      { question: "What are the main services offered?", answer: "The cooperative brings together short-term savings, long-term pooled agricultural investments, and access to financing for eligible members. It also provides a community for members to build their financial futures together." },
      { question: "How is the cooperative different from a bank?", answer: "The cooperative is built around its members and their shared participation in agriculture. Its membership, contributions, and financing follow cooperative terms. Review those terms to understand how each service works." },
      { question: "Is my money safe on the platform?", answer: "Savings and agricultural investments have different terms and risks. Agricultural returns are not guaranteed, and an investment may lose value. Review the terms, fees, and risk information for each service before contributing, and contact support if anything is unclear." },
      { question: "How are returns generated from long-term contributions?", answer: "Long-term contributions are pooled into agricultural investments. Any reported gain or loss depends on the performance and valuation of those investments, after applicable costs. Past performance does not guarantee future returns." },
    ],
  },
  {
    id: "membership", label: "Membership & Eligibility", icon: "people",
    questions: [
      { question: "How do I become a member?", answer: "Start with Create Account and provide your contact details and the email used for your Remote Agric account. Membership requires verification of an existing, active Remote Agric investment. Review the membership terms before agreeing to join." },
      { question: "Why do you ask for my Remote Agric account email?", answer: "This email connects your cooperative registration with your existing Remote Agric account so your investment eligibility can be verified. It can be different from the email you choose for cooperative correspondence." },
      { question: "Can I join without an active investment?", answer: "An existing and active Remote Agric investment is required for cooperative membership. Contact the team if you are unsure whether your investment meets the requirement." },
    ],
  },
  {
    id: "savings", label: "Contributions & Savings", icon: "coins",
    questions: [
      { question: "What is the difference between short-term and long-term contributions?", answer: "Short-term savings help you plan for nearer-term needs. Long-term contributions participate in pooled agricultural investments and may have commitment periods and different withdrawal terms. Review the rules for the plan you choose." },
      { question: "Is there a minimum contribution amount?", answer: "Contribution limits depend on the service and its current terms. Check the amount limits and any fees shown before making a contribution, or ask support for clarification." },
      { question: "How can I track my contributions?", answer: "The member portal is designed to show your confirmed contributions, pending payments, and transaction history separately. Keep your payment reference so support can help if a contribution needs to be traced." },
    ],
  },
  {
    id: "loans", label: "Loans", icon: "loan",
    questions: [
      { question: "Can every member access a loan?", answer: "Loan access depends on eligibility, active contributions, and approval. Membership alone does not guarantee a loan. Review the applicable limit, fees, repayment schedule, and collateral or recovery requirements before applying." },
      { question: "How much can I borrow?", answer: "Your borrowing limit depends on your eligibility and the cooperative’s lending terms. The available amount and repayment terms should be provided before you accept a loan." },
      { question: "Does approval mean my loan has been paid out?", answer: "Approval and disbursement are separate steps. An approved loan may still be awaiting payment. Check the loan status and payment confirmation before treating the funds as available." },
    ],
  },
  {
    id: "withdrawals", label: "Withdrawals", icon: "wallet",
    questions: [
      { question: "How do I request a withdrawal?", answer: "Use the withdrawal option for eligible short-term savings in the member portal. Review your available balance, payout destination, fees, and expected processing time before confirming. Long-term contributions follow their own withdrawal terms." },
      { question: "Can I withdraw a long-term contribution at any time?", answer: "Long-term contributions may be subject to commitment periods and withdrawal restrictions. Review your plan’s terms before contributing or requesting access to the funds." },
      { question: "What should I do if a withdrawal is pending?", answer: "Check the status and expected processing time. Pending means payment has not yet been confirmed. If the stated time has passed, contact support with the transaction reference before trying again." },
    ],
  },
  {
    id: "returns", label: "Returns & Investments", icon: "chart",
    questions: [
      { question: "Are returns guaranteed?", answer: "No. Agricultural investments carry risks, their value can change, and returns may vary. Review the investment terms and reporting before deciding to contribute." },
      { question: "What does an estimated investment value mean?", answer: "An estimate reflects the latest available valuation and may change. It is different from an available cash balance. Check the valuation date and the explanation of fees and calculations alongside the figure." },
      { question: "Where can I find investment updates?", answer: "The member portal is designed to provide pool information, valuation dates, and cooperative updates. Contact support if you need help understanding a report or the terms of an investment." },
    ],
  },
  {
    id: "payments", label: "Payments", icon: "wallet",
    questions: [
      { question: "When is a contribution counted as successful?", answer: "A contribution is confirmed only after the payment has been verified. A pending payment should remain separate from your confirmed balance until that confirmation arrives." },
      { question: "What should I do if I was debited but cannot see my contribution?", answer: "Keep your payment reference, amount, and payment date. Check the transaction status, then contact support if the payment remains unresolved. Do not share your password or payment authorization codes." },
      { question: "Are there payment or withdrawal fees?", answer: "Any applicable fees should be shown before you confirm a transaction. Review the final amount and service terms, and ask support about any charge you do not understand." },
    ],
  },
  {
    id: "security", label: "Security & Privacy", icon: "shield",
    questions: [
      { question: "How can I protect my account?", answer: "Use a strong, unique password and keep your login details private. Never share your password, one-time codes, or payment authorization details with anyone claiming to offer support." },
      { question: "Why is personal information requested during registration?", answer: "Contact and Remote Agric account details are requested to support registration and eligibility checks. Review the Privacy Policy for the applicable information-handling terms before creating an account." },
      { question: "What if I suspect unauthorized activity?", answer: "Contact support promptly with the relevant transaction reference and a description of what happened. Avoid including passwords or one-time codes in your message." },
    ],
  },
  {
    id: "account", label: "Account Management", icon: "user",
    questions: [
      { question: "How do I sign in to my cooperative account?", answer: "Choose Sign In and use your cooperative email and password. The sign-in page also includes an option for an existing Remote Agric account. Account access will be available when the member portal is connected." },
      { question: "What if I forget my password?", answer: "Choose Forgot password on the sign-in page and enter your cooperative email address. Password recovery will be available when account services are connected." },
      { question: "How can I update my contact details?", answer: "Contact support if you need to correct the email or phone number associated with your membership. Some changes may require verification to protect your account." },
    ],
  },
];
