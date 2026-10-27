# Remote Agric Cooperative --- Design System

**File:** `design.md`\
**Version:** 1.0\
**Status:** Initial design specification\
**Product:** Remote Agric Cooperative\
**Design direction:** Premium, calm, trustworthy financial cooperative
with a clear connection to agriculture.

------------------------------------------------------------------------

## 1. Design vision

Remote Agric Cooperative should feel like a reliable financial platform
built for members of the Remote Agric ecosystem. The interface should
combine the familiarity of agricultural green with the clarity and
confidence expected from a platform that handles savings, pooled assets,
withdrawals, and loans.

The product should be: - **Trustworthy:** financial figures, statuses,
fees, and terms are easy to understand. - **Calm and clear:** generous
spacing, restrained colors, and simple layouts. - **Member-first:**
personal financial data is separated from platform-wide statistics. -
**Consistent:** member and admin areas share the same design system
while presenting different information and actions. - **Responsive:**
usable on mobile, tablet, and desktop. - **Accessible:** readable
contrast, clear focus states, labels, and keyboard support.

Avoid overly decorative farm imagery, excessive gradients, flashy
financial effects, and crowded dashboards. The platform should feel like
a modern cooperative and financial service, not a farming game or crypto
trading terminal.

## 2. Color palette

Use the following palette as the primary design foundation.

  -----------------------------------------------------------------------------
  Token                         Hex                     Intended use
  ----------------------------- ----------------------- -----------------------
  `color-brand-primary`         `#123B2A`               Primary buttons,
                                                        sidebar, key headings,
                                                        active navigation,
                                                        important icons

  `color-brand-primary-hover`   `#194D38`               Hover and pressed
                                                        states for primary
                                                        actions

  `color-brand-primary-soft`    `#E8F0EB`               Soft green highlights,
                                                        selected rows, subtle
                                                        brand panels

  `color-background`            `#F7F5EE`               Main application
                                                        background

  `color-surface`               `#FFFFFF`               Cards, tables, forms,
                                                        dialogs, dropdowns

  `color-accent-gold`           `#C69A45`               Small highlights, chart
                                                        accents, premium
                                                        details, selected
                                                        indicators

  `color-text-primary`          `#344054`               Main body text and
                                                        table content

  `color-text-secondary`        `#667085`               Supporting text,
                                                        descriptions,
                                                        timestamps, helper text

  `color-border`                `#E4E7EC`               Borders, separators,
                                                        input outlines

  `color-success`               `#16803C`               Confirmed successful
                                                        actions and
                                                        transactions

  `color-success-soft`          `#EAF7EE`               Success status
                                                        backgrounds

  `color-warning`               `#A15C07`               Pending,
                                                        attention-needed, or
                                                        upcoming items

  `color-warning-soft`          `#FFF4D6`               Warning status
                                                        backgrounds

  `color-danger`                `#B42318`               Failed transactions,
                                                        destructive actions,
                                                        overdue/default alerts

  `color-danger-soft`           `#FEECEB`               Error status
                                                        backgrounds

  `color-info`                  `#175CD3`               Informational messages
                                                        and neutral system
                                                        notices

  `color-info-soft`             `#EFF8FF`               Informational status
                                                        backgrounds

  `color-disabled`              `#98A2B3`               Disabled controls and
                                                        inactive metadata
  -----------------------------------------------------------------------------

### Color usage rules

1.  Use deep forest green for the primary brand and important actions,
    not every component.
2.  Use warm ivory for the page canvas and white for most content
    surfaces.
3.  Use muted gold sparingly. It is an accent, not a second primary
    color. Do not use gold as small body text on white because contrast
    may be insufficient.
4.  Do not use color alone to communicate a transaction status. Pair
    status color with a text label and, where useful, an icon.
5.  Green must not automatically imply financial profit. Use explicit
    labels such as **Reported gain**, **Successful**, or **Available
    balance**.
6.  Use the semantic colors consistently across the member and admin
    interfaces.
7.  For dark green buttons, use white text. For gold accents, use dark
    text or use gold as a border, indicator, or chart element.

## 3. Typography

Use **Inter** as the preferred typeface, with a system sans-serif
fallback.

  -------------------------------------------------------------------------
  Style                 Suggested size               Weight Use
  --------------- -------------------- -------------------- ---------------
  Display                    32--40 px             600--700 Major dashboard
                                                            value or page
                                                            hero, used
                                                            sparingly

  Page title                 24--28 px             600--700 Main page
                                                            heading

  Section heading            18--20 px                  600 Card groups and
                                                            page sections

  Card title                 14--16 px                  600 Summary cards
                                                            and panels

  Body                       14--16 px                  400 Main content
                                                            and
                                                            instructions

  Supporting                 12--14 px                  400 Timestamps,
                                                            helper text,
                                                            metadata

  Table                      13--14 px             400--500 Transaction and
                                                            admin tables

  Button                         14 px                  600 Button labels
  -------------------------------------------------------------------------

Use tabular numerals for financial values and transaction tables where
possible. Format currency consistently, using `₦` for Nigerian naira
where applicable. Use readable date formats and show the relevant
timezone when precise timestamps matter.

Avoid tiny text for fees, repayment terms, lock-in dates, or
disclosures. Important financial terms must remain readable on mobile.

## 4. Layout and spacing

Use a spacing scale based on multiples of 4 px.

  Token          Value Typical use
  ------------ ------- ---------------------------
  `space-1`       4 px Icon-to-label spacing
  `space-2`       8 px Tight control spacing
  `space-3`      12 px Compact component spacing
  `space-4`      16 px Standard internal padding
  `space-5`      20 px Card spacing
  `space-6`      24 px Section spacing
  `space-8`      32 px Major section spacing
  `space-10`     40 px Large layout separation
  `space-12`     48 px Page-level breathing room

### General layout rules

-   Desktop application pages use a persistent left sidebar and a top
    header.
-   The main content area should have a comfortable maximum width and
    consistent horizontal padding.
-   Use a responsive grid for summary cards: four across on wide screens
    where useful, two across on tablet, and one or two across on narrow
    mobile screens depending on content.
-   Keep the main page title and primary action near the top of each
    screen.
-   Use cards to group related information, not to wrap every individual
    line of text.
-   Prefer tables for admin transaction management and stacked
    transaction cards on small mobile screens.
-   Avoid horizontal scrolling for core member tasks. For dense admin
    tables, provide a responsive card view or an intentional scroll
    container.

## 5. Shape, borders, and elevation

-   **Card radius:** 12--16 px.
-   **Input and button radius:** 8--10 px.
-   **Pill/status radius:** fully rounded.
-   **Borders:** thin, neutral `#E4E7EC` borders.
-   **Shadows:** subtle and infrequent; rely primarily on spacing and
    borders.
-   **Dialogs and popovers:** white surfaces, clear titles, concise
    descriptions, and visible dismissal controls.

Do not use heavy shadows, glassmorphism, or decorative gradients as the
default style.

## 6. Navigation

### Member application

Primary navigation: 1. Overview 2. Long-term Pool 3. Short-term Savings
4. Loans 5. Transactions 6. Profile & Terms

Use clear labels and familiar line icons. The active item uses a soft
green background and deep green text/icon. On mobile, use a compact
navigation pattern that keeps the most important destinations accessible
without crowding the screen.

### Admin application

Primary navigation: 1. Admin Overview 2. Members 3. Long-term
Contributions 4. Short-term Contributions 5. Withdrawals 6. Loans 7. All
Transactions 8. Pool & Assets 9. Reports & Exports 10. Audit Log &
Settings

The admin area may use a denser layout than the member area, but it must
retain the same typography, color tokens, component behavior, and
spacing principles. Show the current admin identity and role, and make
the admin area visually identifiable without introducing a separate
brand palette.

## 7. Shared components

### Buttons

-   **Primary:** deep green fill, white label. Use for the main action
    on a screen.
-   **Secondary:** white or transparent fill, green border/text.
-   **Tertiary:** text-only action for low-priority actions.
-   **Danger:** semantic red, reserved for destructive or high-risk
    actions.
-   **Disabled:** muted appearance and no interaction.
-   Include visible hover, focus, pressed, loading, and disabled states.
-   Prevent repeated submissions while a payment or other consequential
    request is processing.

Use one dominant primary action per panel or workflow step whenever
possible.

### Inputs and forms

-   White background with neutral border.
-   Persistent labels; do not rely on placeholder text alone.
-   Show helper text for amount limits, fees, eligibility, and required
    formats.
-   Place validation errors beside the relevant field and explain how to
    fix them.
-   Format currency clearly and show the currency code or symbol.
-   Use confirmation screens before submitting consequential financial
    requests.

### Cards

-   White surface, subtle border, 12--16 px radius.
-   Use a short label, a prominent value, and optional supporting
    context.
-   Financial cards must identify what the number represents, such as
    **My total contributions**, **Available short-term balance**, or
    **Current reported pool value**.
-   Include an "as of" timestamp for figures that may be updated
    periodically.

### Tables

-   Clear column headings, consistent alignment, and readable row
    height.
-   Right-align monetary amounts.
-   Keep dates, status, and reference fields easy to scan.
-   Provide search, date filters, category filters, status filters, and
    pagination where appropriate.
-   On mobile, use a condensed card/list representation or a controlled
    horizontal scroll area.
-   Never expose one member's personal transaction details to another
    member.

### Status badges

Use compact badges with a text label and a pale semantic background: -
**Successful / Completed:** green. - **Pending / Processing:** amber. -
**Failed / Reversed:** red or neutral depending on the final state. -
**Needs review:** amber. - **Approved:** green. - **Rejected:** red. -
**Overdue / Defaulted:** red, with explicit text. - **Draft /
Inactive:** neutral.

The status label must remain understandable without the color.

### Charts

-   Use deep green for the primary series.
-   Use muted gold for a secondary comparison or approved return/gain
    series.
-   Use neutral gray for baselines, axes, and gridlines.
-   Provide chart titles, units, date ranges, legends, and accessible
    summaries.
-   Do not use a chart to imply a guaranteed return.
-   Avoid showing individual member contribution series in a
    platform-wide member dashboard.

### Empty, loading, and error states

-   **Empty:** explain what the screen is for and provide one relevant
    next action.
-   **Loading:** use skeletons for dashboard cards and table rows where
    helpful.
-   **Error:** state what failed in plain language and offer a safe
    retry when possible.
-   **Pending:** explain that confirmation is still awaited; do not show
    a pending payment or payout as successful.
-   **Unavailable data:** show the last successful update where useful
    and distinguish stale data from current data.

## 8. Member experience

### 8.1 Overview dashboard

The overview should prioritize the member's own financial position.

Recommended content order: 1. Greeting, membership status, and relevant
alerts. 2. Personal summary cards: - My long-term contributions. - My
estimated long-term share/value, if supported by an approved
calculation. - My available short-term balance. - My active loan balance
or next repayment date. 3. Quick actions: - Contribute to long-term
pool. - Add short-term funds. - Request withdrawal. - Apply for a loan.
4. Long-term pool snapshot: - Aggregate contributed capital. - Current
reported pool/asset value. - Reported gain/loss, if available and
approved. - Last valuation/update date. 5. Recent personal transactions.
6. Loan or withdrawal notices requiring the member's attention.

Do not show other members' names, individual balances, daily
contributions, or personal loan information.

### 8.2 Long-term Pool

The screen should clearly separate personal figures from pool-wide
figures.

**Personal section** - Total confirmed contributions. - Estimated
share/current value where supported. - Contribution history. - Lock-in
terms and applicable dates.

**Pool overview** - Aggregate contributed capital. - Latest approved
asset/pool value. - Reported gains or losses and relevant fees where
approved. - Valuation date and explanatory notes.

Use plain-language explanations for the calculation and make it clear
when a displayed figure is an estimate. Never present uncertain returns
as guaranteed.

### 8.3 Short-term Savings

Show available balance, pending withdrawals, contribution history, and
withdrawal history as distinct figures. The withdrawal flow should use a
short review step that confirms amount, payout destination, fees,
expected timing, and the fact that processing may remain pending until
the payout provider confirms completion.

Routine withdrawals are automatically validated and processed in the
first release. Admin screens monitor failures and exceptions; they do
not require routine manual approval.

### 8.4 Loans

Show eligibility information, the application action, active loan
details, repayment schedules, and application status. Before submission,
display the requested amount, duration, applicable fees/interest,
repayment estimate, and required collateral or recovery consent.

Use a clear status timeline: - Submitted - Pending review - Approved or
rejected - Disbursement pending - Active - Overdue, if applicable -
Repaid or default workflow, if applicable

Approval and disbursement are separate events and must be presented as
such.

### 8.5 Transactions

Group or filter transactions by: - Long-term contributions. - Short-term
contributions. - Withdrawals. - Loan disbursements. - Loan repayments. -
Reversals or adjustments.

Show amount, date, status, transaction reference, and category. Each
transaction detail view should explain its current state in plain
language.

## 9. Admin experience

### 9.1 Admin overview

Use a practical operations dashboard rather than a marketing-style
dashboard.

Recommended top-level metrics: - Long-term contributions today,
month-to-date, and all-time. - Short-term contributions today and
month-to-date. - Withdrawal requests processing. - Completed withdrawal
amount/count. - Failed withdrawals and items needing investigation. -
Pending loan requests. - Active loan outstanding balance. -
Overdue/defaulted loan count. - Payment or reconciliation exceptions. -
Latest approved long-term pool value and valuation date.

Below the KPI row, include: - Daily and monthly contribution charts,
separated by contribution type. - Recent transaction activity. - Pending
loan review queue. - Withdrawal processing exceptions. - Payment
reconciliation and integration health.

Define every metric. Do not combine deposits, current asset value, loan
disbursements, and investment gains into one ambiguous total.

### 9.2 Contribution screens

Provide separate Long-term Contributions and Short-term Contributions
screens. Each should support date range, status, member reference,
payment reference, and reconciliation filters. Show totals for the
selected period and separate successful, pending, failed, and reversed
transactions.

### 9.3 Withdrawals

Provide separate views or filters for: - Requested/validating. -
Processing. - Completed. - Failed/reversed. - Needs investigation.

Admins can inspect details, provider references, attempts, and exception
reasons. Routine withdrawals do not require admin approval. Any retry
must be controlled and idempotent so it cannot result in duplicate
payouts.

### 9.4 Loans

The loan queue should make pending applications easy to review. The
detail view should show the eligibility snapshot, investment/collateral
snapshot, requested amount, policy limit, terms, and consent state.

Authorized admins can approve or reject and must record a decision.
Rejections require a reason. Approval records the approved amount and
terms. Disbursement is tracked separately. All decisions and sensitive
actions must be auditable.

### 9.5 All Transactions

Use one searchable admin ledger with clear transaction categories and
filters. Each entry links to its underlying contribution, withdrawal,
loan, or repayment record. Financial entries should not be silently
edited; corrections should use linked reversal or adjustment records
with an audit trail.

### 9.6 Reports and exports

Allow authorized staff to export date-filtered operational reports.
Exports should identify the selected date range, timezone, transaction
categories, and generation time. Restrict access because reports may
contain personal and financial information.

## 10. Interaction and content principles

-   Use plain, direct language.
-   Put the action first in button labels: **Add funds**, **Request
    withdrawal**, **Submit loan request**.
-   Explain fees, lock-in periods, repayment dates, and restrictions
    before the user confirms.
-   Use confirmation dialogs for consequential actions, but avoid
    unnecessary confirmation for ordinary navigation.
-   Show a transaction reference after submission where available.
-   Make clear whether an action is submitted, processing, completed, or
    failed.
-   Do not use misleading urgency, guaranteed-return language, or
    celebratory animations for financial events.
-   Use dates and currency formats consistently.
-   Keep error messages helpful and avoid exposing internal system
    details.

## 11. Accessibility

-   Meet WCAG AA contrast targets where practical.
-   Ensure controls work with keyboard navigation.
-   Show a visible focus indicator.
-   Use semantic headings and form labels.
-   Provide accessible names for icon-only buttons.
-   Do not rely on color alone for statuses or chart interpretation.
-   Support text zoom and narrow screens.
-   Keep touch targets comfortable on mobile.
-   Respect reduced-motion preferences and avoid unnecessary animation.

## 12. Responsive behavior

### Desktop

-   Persistent sidebar, top header, dashboard card grid, full
    transaction tables.
-   Use available width for data comparison without overcrowding.
-   Keep primary actions visible near the page heading.

### Tablet

-   Collapsible sidebar.
-   Two-column card grids where appropriate.
-   Condensed tables and filters.

### Mobile

-   Compact navigation.
-   Single-column forms and dashboard sections.
-   Transaction rows become stacked cards where this improves
    readability.
-   Primary actions are easy to reach and full-width when appropriate.
-   No horizontal overflow in core workflows.
-   Review and confirmation screens must fit small displays.

## 13. Motion and feedback

Use restrained transitions, generally around 150--200 ms, for menus,
dialogs, tabs, and hover states. Use progress indicators for payment and
payout processing. Avoid animation that suggests money has arrived
before authoritative confirmation.

## 14. Suggested frontend implementation

Recommended stack: - Next.js and React. - TypeScript. - Tailwind CSS. -
A consistent icon set such as Lucide. - Accessible reusable components
for buttons, inputs, cards, tables, badges, dialogs, tabs, and charts.

Suggested organization: - `app/(member)/...` for member routes. -
`app/(admin)/...` for admin routes. - `components/ui/` for shared
primitives. - `components/member/` for member-specific components. -
`components/admin/` for admin-specific components. - `lib/` for
formatting, validation helpers, and API client utilities. - `types/` for
shared frontend types.

Keep financial calculations and authorization decisions on the backend.
The frontend formats and displays authoritative API values; it must not
be the source of truth for balances, eligibility, loan approval, or
payment completion.

## 15. Design acceptance checklist

-   [ ] The palette uses deep forest green, warm ivory, white, slate,
    and restrained gold accents.
-   [ ] Member and admin screens share a consistent design system.
-   [ ] Personal member data is visually distinct from aggregate
    platform statistics.
-   [ ] Long-term and short-term contributions are clearly separated.
-   [ ] Withdrawals distinguish requested, processing, completed, and
    failed states.
-   [ ] Loan approval and disbursement are shown as separate states.
-   [ ] Admin screens distinguish long-term contributions, short-term
    contributions, withdrawals, loans, repayments, and all transactions.
-   [ ] Financial figures include clear labels and relevant reporting
    dates.
-   [ ] Semantic statuses use both text and color.
-   [ ] Empty, loading, error, and pending states are designed.
-   [ ] Core workflows are responsive and accessible.
-   [ ] No screen exposes another member's private financial history.
-   [ ] The interface does not imply guaranteed returns.
-   [ ] Consequential actions include clear terms and confirmation.
-   [ ] The UI never treats an unconfirmed payment or payout as
    successful.

------------------------------------------------------------------------

## Final design direction

Use **Deep Forest Green (`#123B2A`) + Warm Ivory (`#F7F5EE`) + Muted
Gold (`#C69A45`)** as the defining palette. Keep the overall interface
light, spacious, and data-focused. The brand should feel rooted in
agriculture, while the product experience feels like a careful, modern
financial cooperative.
