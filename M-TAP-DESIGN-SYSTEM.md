# M-Tap --- Brand & Web Design System

**Product:** M-Tap --- Proximity Settlement Experience\
**Company:** Boron Labs\
**Document:** Flow 2 Web / QR Self-Service Design System\
**Version:** 1.2 --- Simulation / Demo Scope\
**Implementation:** Next.js\
**Typography:** Outfit

------------------------------------------------------------------------

## 1. Product understanding

M-Tap is a proximity-settlement concept built around linking a physical
NFC sticker to a mobile-money number. This document defines the web
experience for **Flow 2: Web / QR Self-Service**.

For the current project phase, the website is a **front-end
simulation**. A visitor should be able to experience the intended
journey:

1.  Open an activation URL representing a QR scan.
2.  See a sample tag UID prefilled and locked.
3.  Enter a sample mobile-money number.
4.  Request a simulated SMS verification code.
5.  Enter a six-digit OTP.
6.  See a simulated activation result.

The interface should feel like a polished, commercially ready fintech
product. The underlying operations are mocked.

### Simulation boundaries

-   No real SMS messages are sent.
-   No real mobile-money wallet is contacted or linked.
-   No physical NFC tag is provisioned.
-   No real payment is initiated, authorized, or settled.
-   No production credentials, provider SDKs, or live API calls are
    required.
-   Use a mock service layer with deterministic responses. Keep it
    replaceable so real APIs can be integrated later.
-   The tag UID should appear prefilled and read-only, matching the
    intended flow.
-   If no `uid` query parameter exists, either show a clearly labelled
    sample UID in demo mode or present a missing-UID state. Never imply
    that a physical tag was actually scanned.
-   A fixed test OTP such as `123456` may be used. If displayed to the
    tester, label it clearly as a demo code, not an actual SMS.
-   A successful result must be labelled **Demo activation complete** or
    equivalent. Do not claim a real tag or wallet has been activated.
-   Never ask for or simulate entry of a customer's MoMo PIN. It is
    outside this web flow.

------------------------------------------------------------------------

## 2. Brand identity and logo

### Recommended logo direction

Use a **combination mark**: a distinctive M-inspired contactless symbol
paired with the `M-TAP` wordmark.

The symbol should suggest: - An abstract geometric M. - A contactless
tap or connection point. - A simple, recognizable mark that works at
favicon and app-icon sizes.

### Logo variants

1.  **Primary horizontal logo:** symbol + `M-TAP` wordmark.
2.  **Symbol-only:** for favicon, app icon, compact navigation, and
    loading states.
3.  **Single-colour dark:** dark artwork on light surfaces.
4.  **Reverse:** white artwork on a black surface.

### Logo rules

-   Do not include "By Boron Labs" or any company endorsement in the
    logo.
-   Preserve the approved artwork's proportions and clear space.
-   Do not stretch, skew, outline, or add effects.
-   Use the approved SVG asset where available; do not recreate a custom
    symbol using typed text.
-   Export SVG and transparent PNG versions into `public/brand/`.

The generated logo is a visual concept. Clean it up as vector artwork
before production use.

------------------------------------------------------------------------

## 3. Creative direction

Take inspiration from the supplied Finex reference through: - Generous
whitespace. - Editorial typography and large confident headings. -
Refined cards and subtle borders. - Floating, product-led visual
compositions. - Restrained use of colour. - Clear hierarchy and compact
navigation.

Remain original. Do not copy the Finex logo, exact layout,
illustrations, copy, or colour palette.

M-Tap should feel warmer and more tactile than a conventional digital
bank. The visual metaphor is **a simple tap that connects a physical
token to a digital service**.

### Design principles

-   Clarity over decoration.
-   One primary action per screen.
-   Quiet confidence through clean surfaces and deliberate typography.
-   Physical-to-digital motifs used sparingly.
-   Progressive disclosure: explain only what is needed for the current
    step.
-   Visible reassurance about what the customer is doing.

------------------------------------------------------------------------

## 4. Colour system

The palette is led by MTN Sunshine Yellow, black, and white. Restrained
neutral shades support readable text and borders; semantic colours are
reserved for status feedback.

### Brand colours

  Token                  Hex         Purpose
  ---------------------- ----------- ----------------------------------------
  `brand.yellow`         `#FFCC00`   Primary brand accent and CTA
  `brand.yellow-hover`   `#E6B800`   Hover and pressed CTA
  `brand.black`          `#000000`   Typography, key UI, dark surfaces
  `brand.white`          `#FFFFFF`   Content surfaces and whitespace
  `brand.mint`           `#18C99A`   Success and verified states
  `brand.mint-soft`      `#E7F8F2`   Success backgrounds
  `brand.sky`            `#FFF4CC`   Warm informational accent
  `brand.lilac`          `#FFFBE8`   Occasional secondary decorative panel

### Neutral colours

  Token           Hex         Purpose
  --------------- ----------- ----------------------------
  `neutral.0`     `#FFFFFF`   Cards and primary surfaces
  `neutral.25`    `#FAFAF8`   Page background
  `neutral.50`    `#F5F5F3`   Soft section background
  `neutral.100`   `#ECEFF3`   Borders and dividers
  `neutral.200`   `#D9DEE7`   Input borders
  `neutral.500`   `#737E8F`   Muted text
  `neutral.700`   `#3D4858`   Body text
  `neutral.900`   `#151515`   Primary text

### Semantic colours

  Token            Hex         Usage
  ---------------- ----------- -------------------------------------
  `success`        `#159B72`   Verified / demo activation complete
  `success-soft`   `#E7F8F2`   Success callout
  `warning`        `#D98A16`   Expiring code / caution
  `warning-soft`   `#FFF5E3`   Warning callout
  `danger`         `#D94B4B`   Invalid code / blocking error
  `danger-soft`    `#FFF0F0`   Error callout
  `info`           `#3977D5`   Neutral information
  `info-soft`      `#EDF4FF`   Information callout

### Colour balance

As a starting point: - 70% white and warm neutral surfaces. - 20% black
typography and dark surfaces. - 8% yellow brand accents. - 2% mint and
semantic status accents.

Use black text on yellow controls and avoid yellow for small text.
Maintain WCAG AA contrast for text and interactive controls. Never rely
on colour alone to communicate status.

------------------------------------------------------------------------

## 5. Typography

Use **Outfit** throughout the product. Load it with `next/font/google`
to optimize rendering and avoid a late font swap.

  Role                 Weight    Desktop     Mobile   Line height
  ---------------- ---------- ---------- ---------- -------------
  Display / hero     600--700   56--64px   38--44px          1.05
  H1                 600--700       44px       34px           1.1
  H2                      600       32px       27px           1.2
  H3                      600       22px       20px          1.25
  Body large         400--500       18px       17px          1.55
  Body                    400       16px       15px          1.55
  Small / helper     400--500   13--14px       13px          1.45
  Button                  600   15--16px   15--16px             1

### Typography rules

-   Use sentence case for headings and buttons.
-   Keep paragraphs short and readable.
-   Use medium or semibold weights for headings; do not make everything
    bold.
-   Use tabular numerals for OTP digits where supported.
-   A tag UID may use a monospaced utility style for readability, but
    all brand typography remains Outfit.
-   Avoid ultra-light weights for important copy.

------------------------------------------------------------------------

## 6. Layout, spacing, and surfaces

### Page shell

-   Mobile-first and task-focused.
-   Desktop content container: maximum width approximately `1120px`.
-   Activation form: approximately `420–480px` wide.
-   On desktop, use a two-column composition only when it adds context:
    form on one side, calm product illustration on the other.
-   On mobile, use one column and place the form near the top of the
    viewport.
-   Keep the primary action visible without excessive scrolling.

### Spacing scale

Use a 4px base scale:

`4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96`

### Radius

  Token             Value Usage
  --------------- ------- ---------------------------
  `radius.sm`         8px Small controls and badges
  `radius.md`        12px Inputs and compact cards
  `radius.lg`        18px Main cards
  `radius.xl`        24px Feature panels
  `radius.pill`     999px Pills and status tags

### Shadows

Use soft, low-opacity shadows sparingly: - Card:
`0 12px 36px rgba(0, 0, 0, 0.07)` - Floating element:
`0 8px 24px rgba(0, 0, 0, 0.08)`

Prefer a fine neutral border over a heavy shadow.

------------------------------------------------------------------------

## 7. Component system

### Buttons

**Primary** - Yellow fill with black text. - 48--52px minimum
height. - 12--14px radius. - Semibold Outfit label. - Clear hover,
pressed, focus-visible, loading, and disabled states. - Full-width on
mobile forms.

**Secondary** - White or transparent surface with ink border and ink
text. - Same dimensions as primary.

**Tertiary** - Text-only action for low-priority navigation, resend
code, or back.

Use direct labels such as `Request activation code`, `Verify code`, and
`Continue`. Avoid vague labels such as `Submit`.

### Inputs

-   Height: 52--56px.
-   White background, 1px neutral border, 12px radius.
-   Persistent visible label; never rely on placeholder text alone.
-   Visible focus ring with sufficient contrast.
-   Error border plus concise message below the field.
-   Helper text in muted neutral.
-   Use appropriate mobile input modes and autocomplete hints.

### Tag UID field

-   Read-only and visually locked.
-   Label: `M-Tap tag ID`.
-   Display the UID in a legible monospaced treatment.
-   Include a small lock or token indicator.
-   Never style it like an editable phone-number input.
-   If the UID is missing or malformed, show a helpful demo recovery
    state.

### OTP input

-   Six individual visual cells or one accessible six-digit input styled
    as cells.
-   Support pasting the full code.
-   Use a numeric keyboard on mobile.
-   Predictable focus movement; do not trap keyboard users.
-   Show a countdown only if the simulated timer is implemented.
-   Resend is disabled until the demo resend policy permits it.
-   Distinguish invalid and expired codes.

### Status badges

-   `Ready to activate` --- info.
-   `Demo code sent` --- info.
-   `Verified` --- success.
-   `Demo activation complete` --- success.
-   `Expired` --- warning.
-   `Action needed` --- danger.

### Cards and alerts

-   White surfaces on a warm neutral page background.
-   Fine border, subtle shadow, 18--24px radius.
-   Alerts include an icon, concise title, and one-sentence explanation.
-   Error alerts explain the next step.
-   Success alerts appear only after the mock service returns success.

------------------------------------------------------------------------

## 8. Flow 2 --- simulated customer journey

### Screen 1: QR landing / identify tag

**Purpose:** reassure the visitor that the QR-style URL has opened the
correct M-Tap activation experience.

Content: - M-Tap logo. - Small eyebrow: `M-TAP TAG ACTIVATION`. -
Heading: `Let's activate your M-Tap`. - Supporting copy:
`Link this tag to your mobile money number in a few simple steps.` -
Read-only tag ID field, prefilled from the `uid` query parameter or a
sample demo UID. - Reassurance:
`This is a demonstration. No real tag will be activated.` - Primary CTA:
`Continue`.

Rules: - Read the UID from the URL query parameter when supplied. - Keep
the UID locked. - Validate presence and expected format. - If no UID
exists, either use an explicitly labelled demo sample or show a
missing-UID state. - Do not expose internal database identifiers or
unrelated customer information.

### Screen 2: Mobile money number

**Purpose:** collect a sample number for the simulated journey.

Content: - Progress indicator. - Heading:
`Which number uses your mobile money?` - Supporting copy explaining that
a demo verification code will be shown/simulated. - Phone input with
Ghana country context (`+233`) and formatting guidance. - Primary CTA:
`Request activation code`. - Secondary action: `Back`.

Rules: - Normalize and validate the phone number for the demo. - The
specification's Ghana examples use the international format
`233XXXXXXXXX`. - Do not imply that entering the number completes
activation. - On simulated success, move to OTP verification and show a
masked destination number. - Do not send a real SMS.

### Screen 3: Verify phone number

**Purpose:** demonstrate the ownership-verification step.

Content: - Heading: `Check your messages`. - Supporting copy:
`Enter the 6-digit demo code for [masked number].` - Six-digit OTP
input. - Primary CTA: `Verify and activate`. - Secondary action:
`Resend demo code` when permitted. - Helper text:
`In this demo, the code expires after 5 minutes.` - Optional demo hint:
`Demo code: 123456`.

Rules: - Use a six-digit demo code. - Simulate a five-minute expiry if
the timer is implemented. - Support paste and mobile numeric input. -
Show loading feedback while verification is simulated. - Handle
incorrect, expired, and simulated network-failure outcomes distinctly. -
Never request or reveal a MoMo PIN.

### Screen 4: Demo activation success

**Purpose:** demonstrate the intended successful end state without
claiming a real tag was activated.

Content: - Simple success illustration using the M-Tap signal motif. -
Status badge: `DEMO ACTIVATION COMPLETE`. - Heading:
`You're ready to tap`. - Supporting copy:
`This demo tag has been linked to the sample mobile money number in the simulation.` -
Tag ID summary. - Masked phone number summary. - Explanation:
`In the real M-Tap experience, you would tap your sticker on a participating terminal and approve the payment on your phone. Payments are not enabled in this demo.` -
CTA: `Start again` or `Done`.

Rules: - Show this screen only after the mock service returns simulated
success. - Clearly label the result as a demo; it does not link a real
wallet or activate physical hardware. - Never suggest that the NFC
sticker contains money or a PIN.

### Error and recovery states

Design explicit states for: - Missing or invalid QR UID. - Sample tag
already activated. - Tag not eligible in the simulated scenario. -
Incorrect OTP. - Expired OTP. - Too many attempts / temporarily blocked
(simulated). - Simulated SMS delivery failure. - Simulated network
unavailable. - Simulated server error. - Activation pending /
confirmation delayed (simulated).

Every error state should include: 1. Plain-language explanation. 2. Safe
next step. 3. Retry action when valid. 4. A reset or support-style
fallback when the visitor cannot proceed.

Clearly identify simulated failures as demo scenarios, not live provider
responses or confirmed production policy.

------------------------------------------------------------------------

## 9. Page composition

The root route (`/`) presents the product concept and its simulation
boundaries. The `/activate` route remains a focused, task-oriented
walkthrough.

### Desktop

-   Warm off-white canvas.
-   Slim header with M-Tap logo at left and a small `Help` link at
    right.
-   Centered content with generous whitespace.
-   White activation card with clear title, concise explanation, locked
    tag ID, and phone/OTP fields.
-   Optional side panel with abstract NFC tag artwork and three
    reassurance points:
    -   `No app download`
    -   `Simple guided setup`
    -   `Payments are not enabled in this demo`
-   Small footer: `A Boron Labs product` and privacy/help links if
    appropriate.

### Mobile

-   Compact header.
-   Single-column form on a soft neutral background.
-   Full-width CTA.
-   Inputs sized for touch.
-   No decorative side panel.
-   Keep the main task and its status visible.
-   Respect safe-area insets and the mobile keyboard.

### Keep the scope focused

The activation route is a task-focused simulation, not a full banking
website. Keep the product landing page focused on explaining the M-Tap
concept; do not imply that transaction dashboards, account balances, or
payment services are implemented.

------------------------------------------------------------------------

## 10. Motion and interaction

-   Use 150--220ms for hover, focus, and state transitions.
-   Use subtle progress transitions between steps.
-   Use a restrained success animation after simulated activation.
-   Show loading indicators inside the CTA while mock requests are
    pending.
-   Avoid blocking full-screen animations.
-   Respect `prefers-reduced-motion`.
-   Never use animation as the only signal for a state change.

------------------------------------------------------------------------

## 11. Accessibility and trust

-   Aim for WCAG 2.2 AA contrast.
-   All controls must be keyboard accessible with visible focus.
-   Every input needs a programmatic label.
-   Associate helper and error text with the relevant input.
-   Announce errors and asynchronous status updates to screen readers.
-   OTP input must support paste and assistive technologies.
-   Use semantic headings in a logical hierarchy.
-   Touch targets should be at least 44 × 44px.
-   Do not communicate status by colour alone.
-   Do not request the customer's MoMo PIN or unrelated personal data.
-   Mask phone numbers in confirmation views.
-   Keep the tag UID visible only where it helps identify the sample
    tag.

------------------------------------------------------------------------

## 12. Next.js implementation guidance

### Recommended stack

-   Next.js App Router.
-   TypeScript.
-   Tailwind CSS using centralized design tokens.
-   Outfit via `next/font/google`.
-   React Hook Form + Zod (or an equivalent typed validation approach).
-   Lucide icons or a consistent outline icon set.
-   A small product-specific component layer.

Avoid adding a large component library solely for visual polish.

### Suggested route and component structure

``` text
app/
  layout.tsx
  page.tsx
  activate/
    page.tsx
    loading.tsx
    error.tsx

components/
  brand/
    mtap-logo.tsx
  activation/
    activation-shell.tsx
    activation-progress.tsx
    tag-uid-field.tsx
    phone-number-field.tsx
    otp-input.tsx
    activation-success.tsx
    activation-error.tsx
  ui/
    button.tsx
    input.tsx
    card.tsx
    alert.tsx
    badge.tsx

lib/
  validation/
    activation.ts
  services/
    activation-service.ts
    mock-activation-service.ts
  utils/
    phone.ts
    mask-phone.ts

public/
  brand/
    mtap-logo.svg
    mtap-symbol.svg
```

Adapt this structure to the existing repository rather than duplicating
an established architecture.

### Suggested state model

``` ts
type ActivationStep =
  | "tag-check"
  | "phone-entry"
  | "otp-verification"
  | "activating"
  | "success"
  | "error";

type ActivationState = {
  uid: string;
  phoneNumber?: string;
  maskedPhoneNumber?: string;
  step: ActivationStep;
  errorCode?: string;
};
```

For this simulation, journey state can live in client state or a
lightweight mock store. It is temporary presentation state, not
authoritative account or activation data.

### Mock service requirements

Implement a `mockActivationService` with deterministic responses and no
network calls.

It should support scenarios for: - Successful OTP request. - Successful
OTP verification. - Incorrect OTP. - Expired OTP. - Simulated SMS
delivery failure. - Sample tag already activated. - Missing or invalid
UID. - Simulated network/server error.

Keep UI components dependent on a typed service interface rather than
mock implementation details. This allows a production service adapter to
replace the mock later.

Show a small `DEMO MODE` indicator in the interface. If a test OTP is
displayed, label it as a demo code.

### Future production considerations

When moving beyond simulation: - Replace the mock adapter with the
approved backend contract. - Keep credentials and privileged operations
on the server. - Add server-side validation. - Reconcile uncertain
network outcomes with the backend before reporting activation status. -
Do not store OTP values in browser storage, analytics, or logs. - Do not
log full phone numbers or full tag identifiers in analytics. - Confirm
real provider integrations, rate limits, retry policies, support
details, privacy notices, and legal copy with the relevant owners.

No production API endpoints or payloads are defined by this design
document.

------------------------------------------------------------------------

## 13. Tailwind / CSS token foundation

Define the palette as CSS variables, then reference the variables from
Tailwind.

``` css
:root {
  --mtap-ink: #000000;
  --mtap-ink-deep: #111111;
  --mtap-yellow: #FFCC00;
  --mtap-yellow-hover: #E6B800;
  --mtap-mint: #18C99A;
  --mtap-mint-soft: #E7F8F2;
  --mtap-sky: #FFF4CC;

  --surface-page: #FAFAF8;
  --surface-soft: #F5F5F3;
  --surface-card: #FFFFFF;

  --text-primary: #151515;
  --text-secondary: #3D4858;
  --text-muted: #737E8F;

  --border-default: #D9DEE7;
  --border-subtle: #ECEFF3;

  --state-success: #159B72;
  --state-warning: #D98A16;
  --state-danger: #D94B4B;
  --state-info: #3977D5;

  --radius-control: 12px;
  --radius-card: 18px;
  --radius-panel: 24px;
}
```

Load Outfit in the root layout with Next.js font optimization, and
expose it as the default sans-serif family.

------------------------------------------------------------------------

## 14. Voice and microcopy

Use a calm, direct, helpful voice. Avoid technical jargon such as UID,
MSISDN, Redis, or NFC in customer-facing explanations unless the
technical identifier itself needs to be shown.

Prefer: - `Your sample tag is ready for the demo.` -
`Enter the mobile money number you want to use for this simulation.` -
`Your demo code is 123456.` -
`Demo activation complete. No real tag or wallet was changed.`

Avoid: - `Initialize token binding.` - `Submit MSISDN.` -
`Provisioning successful.` - `Your wallet has been charged.`

Never imply that the simulation charges the customer.

------------------------------------------------------------------------

## 15. Definition of done

-   [ ] The approved M-Tap logo is integrated without the "By Boron
    Labs" endorsement.
-   [ ] Outfit is loaded through Next.js font optimization.
-   [ ] Colour, type, spacing, radius, and shadow tokens are
    centralized.
-   [ ] The QR-style `uid` is parsed and displayed read-only.
-   [ ] Missing UID and sample UID states are handled explicitly.
-   [ ] Phone-number form is responsive and accessible.
-   [ ] Six-digit OTP flow supports paste and mobile numeric input.
-   [ ] OTP expiry and incorrect-code states are simulated.
-   [ ] Success appears only after mock service success and is labelled
    as a demo.
-   [ ] All simulated failure and recovery states have actionable copy.
-   [ ] No MoMo PIN is requested or collected.
-   [ ] No real SMS, wallet, NFC, or payment integration is present.
-   [ ] Mobile and desktop layouts are polished.
-   [ ] Keyboard navigation, focus, labels, and screen-reader
    announcements work.
-   [ ] No dead buttons or fake live integrations remain.
-   [ ] All mock data and simulated outcomes are clearly identified as
    demo behaviour.

------------------------------------------------------------------------

## 16. Source alignment and assumptions

This design system follows the intended Flow 2 journey: QR-based browser
entry, a locked tag identifier, mobile-money number entry, SMS-style OTP
verification, and an activation result.

The visual identity, colour palette, component specifications,
microcopy, and Next.js recommendations are proposed design decisions.
This version intentionally defines a simulation-first implementation.
Mock data, OTP delivery, verification, and activation outcomes are demo
behaviours, not claims about live integrations.

Before production, replace the mock service with the approved backend
contract and confirm provider integrations, retry policies, privacy
notices, support details, and legal copy with the relevant owners.
