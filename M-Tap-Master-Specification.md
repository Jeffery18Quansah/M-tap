# M-Tap: Proximity Settlement Engine

**Entity:** Boron Labs Technologies Ltd.\
**Product:** M-Tap (Proximity Settlement Engine)\
**Document Identity:** BL-MTAP-MASTER-SPEC-2026-REV3\
**Implementation Focus:** Fast-Path Prototyping

> Converted from the supplied 13-page PDF. Text, headings, and readable
> tabular content are retained as Markdown where possible. Complex
> diagrams and visual layouts may be represented less precisely than in
> the original PDF.

## PDF page 1

M-Tap: Proximity Settlement Engine Entity: Boron Labs Technologies Ltd.
Product: M-Tap (Proximity Settlement Engine) Document Identity:
BL-MTAP-MASTER-SPEC-2026-REV3 Implementation Focus: Fast-Path
Prototyping 1. Executive Strategy & Market Grounding The Frontier
Micro-Retail Settlement Problem Over 90% of adults across urban and
peri-urban Ghana hold an active mobile money account, yet over 80% of
counter transactions at campus canteens, transport interchanges, and
open-air markets remain in physical cash. Existing digital settlement
methods fail in high-throughput retail: Manual USSD (\*170#): Requires
dialing, waiting for prompts, and manual merchant code entry. Average
checkout time is 45 to 75 seconds, causing queues to stall during peak
rush hours. Static QR Stickers: Demand an autofocus camera, ambient
lighting, a smartphone, and an active mobile data subscription. Most
mass-market devices are entry-tier smartphones or basic feature phones
without reliable cameras. Traditional Card POS (EMV): Devices cost \$150
to \$350, carry high maintenance fees, and charge 2.5% to 3.5%
transaction cuts that eliminate micro-merchant margins. The Boron Labs
Solution M-Tap bridges this gap by decoupling the payment token from the
phone hardware: The Token: A passive 13.56 MHz NFC sticker (NTAG213,
costing under \$0.15) adhered to the back of any smartphone or feature
phone, or embedded inside a student ID card. The Terminal: An
ultra-low-cost, battery-backed desktop counter pod (under \$15 factory
BOM) featuring high-speed NFC, tactile merchant amount keys, an audio
confirmation soundbox, and dual displays. The Settlement: Tapping
triggers an instant cloud lookup to initiate a carrier-grade
requesttopay prompt on the customer's phone. Funds clear only when the
customer keys in their secret MoMo PIN.

## PDF page 2

2.  End-to-End System Topology
3.  Finite State Machine (FSM) The terminal transitions through
    deterministic states to ensure that queues never stall: Layer 3:
    Carrier Clearing Rails Layer 2: Boron Switching Core Layer 1:
    Proximity Edge Hardware 13.56 MHz RF Induction HTTP POST / MQTT
    (Local Wi-Fi) POST /collection/v1_0/requesttopay Direct Network
    PushAuthorizes with Secret MoMo PIN Signed Webhook Callback Response
    Status (200 OK / Chime Trigger) Passive M-Tap Token(NTAG213 / No
    Battery) M-Tap Prototype Terminal(ESP32 DevKit + PN532 + OLED +
    Buzzer) API Ingress (HTTP REST / MQTT)(Local IP / Ngrok Proxy) Boron
    Core Engine(Golang Gin Microservice) Redis Cluster / Cache(Hot Token
    Mapping & OTP Nonces) PostgreSQL 16 Engine(ACID Relational Ledger &
    Tag State) Telecom Gateway / Sandbox(MTN MoMo Sandbox / Collections
    API) Customer Handset(Any 2G / 3G / 4G Device)

## PDF page 3

4.  End-to-End Sequence Lifecycle Cashier enters amount on KeypadClear
    key pressed (\*) or 60s inactivity Tag taps within 2.5 cm (RF
    Induction) Read 7-byte UID & emit chirp Tag Active & Linked in
    Redis/Postgres Tag Unregistered or SuspendedHTTP 202 Accepted from
    MoMo Gateway Gateway network failure / Rejected Webhook confirmed
    (PIN entered) 30s timeout elapsed / Customer rejected Audio chime +
    Green LED + Reset Double buzz + Red LED + Reset 01_TERMINAL_IDLE
    02_AMOUNT_LOCKED 03_TAG_DETECTED 04_TOKEN_VALIDATION
    05_CARRIER_DISPATCH 08_ABORT_DECLINED 06_AWAITING_PIN
    07_SETTLED_SUCCESS MoMo Sandbox / GatewayPostgreSQL 16Redis
    StoreBoron Cloud Core (Go)Prototype Terminal (ESP32)NTAG213 Sticker
    MoMo Sandbox / GatewayPostgreSQL 16Redis StoreBoron Cloud Core
    (Go)Prototype Terminal (ESP32)NTAG213 Sticker Merchant enters
    amount: GHS 25.00 alt \[Cache Hit (\< 2ms)\] \[Cache Miss\]
    Real-time ledger debit/credit Complete turnaround under 5 seconds
    Customer Customer Handset Proximity Tap (\< 3 cm) 1 13.56 MHz RF
    Field Energizes Chip 2 Emits 7-Byte Factory UID (e.g.,
    04A38CF2196880) 3 Play short chirp tone + Display: "Authorizing..."
    4 HTTP POST /api/v1/terminal/tap {tag_uid, terminal_id, amount} 5
    GET tag:active:{tag_uid} 6 Returns MSISDN (233XXXXXXXXX) 7 SELECT
    phone_number FROM customer_tags WHERE tag_uid = \$1 AND status =
    'ACTIVE' 8 Returns MSISDN 9 SETEX tag:active:{tag_uid} 86400
    {msisdn} 10 POST /collection/v1_0/requesttopay 11 Acknowledge Prompt
    Queued (202 Accepted) 12 USSD Push Prompt: "Pay GHS 25.00 to
    Merchant? PIN:" 13 Enters secret 4-Digit MoMo PIN 14 Authenticated
    Carrier PIN Response 15 Webhook Callback (Status: SUCCESSFUL) 16
    INSERT INTO transactions (status, momo_ref) VALUES ('SETTLED', ...)
    17 Broadcast Settlement Success (200 OK) 18 Sound Victory Chime +
    Solid Green LED 19 Screen: "SUCCESS GHS 25.00" 20 Customer Customer
    Handset

## PDF page 4

5.  Token Onboarding, Self-Service & Lifecycle Security To prevent
    unauthorized linking, a passive NFC tag cannot transition to ACTIVE
    until ownership of the MSISDN wallet is cryptographically verified
    via a One-Time Password (OTP). Detailed Operational Steps for
    Self-Service & Onboarding Flow 1: Merchant / Agent Terminal
    Onboarding (Feature Phones & Non-Smartphones)
6.  Activation Trigger: Cashier hits \* (Menu) on the terminal pad and
    selects 1: Pair Tag.
7.  Proximity Scan: Customer taps the blank sticker against the PN532
    target area. Terminal Web Portal Code Valid Code Invalid or Expired
    3 consecutive unconfirmed taps Lost or stolen sticker Customer buys
    blank tag at counter Cashier selects Pairing Mode on terminal Tap
    new tag on terminal reader Terminal prompts for Phone Number Phone
    number entered on keypad Customer scans QR on tag backing Portal
    opens with Tag UID prefilled Customer enters personal MoMo number
    Backend generates 6-digit OTP Store OTP in Redis with 5min TTL Save
    record in Postgres as PENDINGSend OTP via SMS to handset Customer
    receives SMS code Submit OTP Enter code on terminal keypadEnter code
    on activation page Backend checks OTP against Redis Update Postgres
    to ACTIVE Warm Redis cache for 24 hours Tag Linked Successfully
    Reject pairing: Tag remains INACTIVE Tag is active for tap payments
    Security Alert Triggered? Velocity Lock: Status becomes
    FROZENCustomer dials USSD or uses portal Evict key from Redis cache
    Update Postgres to REVOKED Terminal rejects future taps instantly

## PDF page 5

3.  Identity Capture: Terminal screen prompts Phone:. The customer keys
    in their 10- digit number (024XXXXXXX) followed by #.
4.  Challenge Dispatch: The backend receives the request, generates a
    secure random 6- digit OTP, caches it in Redis with a 5-minute
    Time-To-Live (TTL), and triggers an automated SMS push.
5.  Two-Factor Entry: Customer receives the SMS on their handset and
    enters the 6 digits onto the terminal keypad.
6.  Confirmation: The Go backend validates the OTP against Redis. Upon a
    valid match, it flips the PostgreSQL record to ACTIVE, loads the hot
    cache key in Redis, and signals the terminal to emit a victory chirp
    and illuminate green. Flow 2: Web / QR Self-Service (Smartphone
    Users)
7.  Packaging QR: Each M-Tap sticker is shipped attached to a small
    paper release liner containing a unique QR code encoded with its
    hardware identity: https://kwickmo.me/activate?uid=04A38CF2196880.
8.  Direct Browser Launch: Scanning the QR with any smartphone camera
    opens the Boron Labs onboarding PWA without installing an app.
9.  Number Entry: The tag's hexadecimal UID is pre-locked on screen; the
    user types their MoMo phone number and hits Request Activation Code.
10. Validation: The server issues an SMS OTP, which the customer
    confirms in the browser form.
11. Activation: The record is updated in PostgreSQL and primed in Redis.
    The sticker is immediately active for tap payments.
12. Database Entity Relational Model (PostgreSQL 16) Financial
    quantities are tracked as unsigned 64-bit integers in minor units
    (Pesewas) to eliminate floating-point roundoff errors:

## PDF page 6

In-Memory Cache Key Schema (Redis) Key Pattern Data Structure TTL
Purpose tag:active: {tag_uid} String (MSISDN) 86400s (24h, Sliding)
Resolves tag UID to phone number in \<2ms during counter taps.
otp:{tag_uid} String (Hashed 6- digit OTP) 300s (5 mins) Enforces
one-time password lifecycle during onboarding verification.
terminal:nonce: {terminal_id} String (Active Txn Ref) 45s Prevents
duplicate charge processing on repeated accidental taps. velocity:tag:
{tag_uid} Integer Counter 120s Tracks failed/unanswered prompts to
auto-freeze tags experiencing prompt spam. 7. Prototype Hardware
Implementation (Bench Testing) owns holds logs initiates MERCHANTS uuid
id PK varcharmerchant_codeUKe.g., MCH_LEGON_01 varcharbusiness_name
varcharsettlement_msisdn timestampcreated_at TERMINALS uuid id PK uuid
merchant_idFK varcharhardware_macUKPermanent Board MAC
varcharterminal_identifierUKe.g., POD_001 timestamplast_heartbeat
CUSTOMERS uuid id PK varcharphone_numberUKE.164: 233XXXXXXXXX
bigintdaily_limit_pesewasDefault 50000 (GHS 500)
booleanis_blockedDefault FALSE timestampcreated_at CUSTOMER_TAGS
varchartag_uid PKHex UID: 7 bytes (14 chars) uuid customer_idFK
varcharstatus PENDING_ACTIVATION, ACTIVE, FROZEN, REVOKED int
failed_prompt_count timestampcreated_at timestampupdated_at TRANSACTIONS
uuid id PK uuid terminal_idFK varchartag_uid FK
bigintamount_pesewasStored in minor unit uuid momo_reference_idUKCarrier
UUID varcharsettlement_statePENDING, SETTLED, DECLINED, TIMEOUT int
latency_milliseconds timestampcreated_at

## PDF page 7

Component Selection Microcontroller: ESP32 DevKit V1 (dual-core, onboard
Wi-Fi, 30-pin header). NFC Transceiver: PN532 Breakout Module
(configured via I2C for minimal pin usage). Visual Interface: 0.96-inch
I2C OLED screen (SSD1306, 128×64). User Input: 4x3 or 4x4 Membrane
Matrix Keypad. Audio Feedback: 5V / 3.3V Active Piezo Buzzer. Status
Indicators: 1 Green 5mm LED, 1 Red 5mm LED (220Ω current-limiting
resistors). Tokens: Passive NTAG213 adhesive stickers (25mm round, 13.56
MHz). Prototype Pinout Matrix (I2C Bus Configuration) Peripheral
NetModule Pin ESP32 GPIOOperational Logic OLED + PN532 SDA SDA (Display
& NFC) GPIO 21 Shared I2C Serial Data line OLED + PN532 SCL SCL (Display
& NFC) GPIO 22 Shared I2C Serial Clock line PN532 Interrupt IRQ GPIO 16
Hardware interrupt when a tag enters the RF field PN532 Reset RST GPIO
17 Hardware reset pulse Active Buzzer Positive (+) GPIO 18 Digital
Output (High = Audible beep) Green LED Anode (+) via 220Ω GPIO 19 Lights
solid on successful PIN authorization Red LED Anode (+) via 220Ω GPIO 23
Flashes on decline, cancel, or 30s timeout Keypad Rows (1-4) R1, R2, R3,
R4GPIO 13, 12, 14, 27 Matrix row strobing Keypad Cols (1-3) C1, C2, C3
GPIO 26, 25, 33 Matrix column reading (internal pull-down) Power Ground
GND GND Common reference ground bus System Power VCC / VIN 3.3V / 5V
(VIN) Board power distribution bus 8. Prototype vs. Production
Progression

## PDF page 8

Engineering Roadmap Comparison Architecture Vector Iteration 1: Bench
Prototype Iteration 2: Commercial Production Pod Form Factor Breadboard
/ 3D-printed plastic housing IP54 custom injection-molded ABS enclosure
Microcontroller ESP32-WROOM-32D Development Board ESP32-S3
surface-mounted on custom 4-layer PCB NFC Interface PN532 Breakout Board
via Jumper Wires NXP PN532 / ST25R3916 with matched PCB loop antenna
Network Layer Local 2.4 GHz Wi-Fi Router Integrated 4G LTE Cat-1
cellular modem with SIM slot Power Engine 5V USB wall adapter or power
bank 3000 mAh 18650 Li-ion cell + onboard BMS (20-hour runtime) Audio
Feedback 5V Active Piezo Buzzer Tone 2W cavity speaker with voice prompt
playback Backend State Local Redis cache + Local PostgreSQL 16
Distributed Go switching core + Redis Cluster + Postgres HA Iteration 2:
Production Pod Custom 4-Layer SMT PCB 4G LTE Cat-1 + MQTT via TLS
PostgreSQL 16 Cluster + Redis Cluster Live Commercial Aggregator Rails
Iteration 1: Bench Prototype ESP32 DevKit + Breadboard Local Wi-Fi +
HTTP Polling Redis Cache + PostgreSQL 16 MoMo Sandbox Simulator

## PDF page 9

Architecture Vector Iteration 1: Bench Prototype Iteration 2: Commercial
Production Pod Clearing Mode MTN MoMo Sandbox mock accounts Live
production collections via licensed partner switch 9. Regulatory &
Licensing Roadmap (Bank of Ghana) Under the Payment Systems and Services
Act, 2019 (Act 987), routing financial transactions requires clear
compliance boundaries: The Recommended Commercial Strategy Route B:
Technology Enabler Model (Boron Labs) Frontier Technology Provider Zero
Statutory Core Capital Fast-Track Launch (4 to 8 Weeks) Integrate via
Licensed Partner Switch(Hubtel / Paystack) Route A: Dedicated Direct PSP
License BoG Enhanced PSP Category Statutory Capital: GH¢ 2M to 20M 12 to
18 Month Licensing Window Direct Clearing with GHIPSS

## PDF page 10

1.  Launch Phase (Years 1--2): Operate as a Payment Technology Enabler.
    Boron Labs supplies the edge hardware terminals, tag infrastructure,
    and switching software. Escrow management, money transmission, and
    direct Bank of Ghana compliance remain with an existing licensed
    partner switch (such as Hubtel or Paystack).
2.  Expansion Phase (Year 3+): Once monthly Gross Transaction Volume
    (GTV) crosses institutional thresholds, use accumulated revenue to
    apply for an independent Dedicated Electronic Money Issuer (DEMI) or
    Enhanced PSP license from the Bank of Ghana.
3.  Data Compliance: Maintain compliance with the Data Protection
    Commission (DPC) of Ghana under Act 843, ensuring that all stored
    phone numbers and token mappings are encrypted using AES-256 at
    rest.
4.  Business Model & Financial Strategy
5.  Consumer Tag Sales Landed Cost: GH¢ 1.50 per sticker. Retail Price:
    GH¢ 5.00 to GH¢ 10.00 each. Distribution Incentive: GH¢ 2.00
    commission per activated tag paid to campus vendors and local
    agents. Gross Margin: 70% to 85%.
6.  Merchant Terminal Deployments Outright Purchase: GH¢ 350.00 per unit
    (production BOM: \~GH¢ 210.00). Hardware-as-a-Service (Lease): GH¢
    40.00/month recurring lease with a GH¢ 50.00 activation deposit. The
    hardware amortizes in under 5 months, producing recurring income
    afterward. 42% 35% 15% 8% Projected 3-Year Gross Revenue Split
    Merchant Terminal Leases & Hardware Transaction Take-Rate (0.25% -
    0.50%) Consumer NFC Sticker Sales Merchant Pro Analytics SaaS

## PDF page 11

3.  Transaction Take-Rate Charge a 0.25% to 0.50% convenience slice on
    processed volume, or earn an aggregator commission rebate for
    driving off-us mobile money transaction frequency. A busy eatery
    processing 250 orders daily at an average ticket of GH¢ 20 moves GH¢
    5,000 daily. At 0.40%, that generates GH¢ 520.00 per month per
    terminal.
4.  Pro Merchant Software (Freemium) Basic tap, chime, and daily SMS
    reconciliation are free. Pro Plan (GH¢ 50.00/month): Multi-till
    staff tracking, automatic customer WhatsApp receipts, live inventory
    deductions synced to taps, and peak-hour sales analytics.
5.  Three-Year Financial Forecast Operational MetricYear 1 (Campus &
    Kiosk Pilot) Year 2 (Urban Interchanges) Year 3 (National Rollout)
    Active Deployed Pods 1,200 terminals 6,500 terminals 12,500
    terminals Active Linked Consumer Tags 45,000 tags 350,000 tags
    1,200,000 tags Gross Transaction Volume (GTV) GH¢ 46,800,000 GH¢
    320,000,000 GH¢ 975,000,000 Hardware & Tag Margin GH¢ 210,000 GH¢
    1,120,000 GH¢ 3,450,000 Recurring Leases & SaaS GH¢ 576,000 GH¢
    3,120,000 GH¢ 6,000,000 Transaction Processing Share GH¢ 163,800 GH¢
    1,120,000 GH¢ 3,412,500 Total Gross Revenue GH¢ 949,800 GH¢
    5,360,000 GH¢ 12,862,500 Operating Expenses (OPEX) (GH¢ 620,000)
    (GH¢ 2,800,000) (GH¢ 5,400,000) EBITDA (Operating Profit) GH¢
    329,800 GH¢ 2,560,000 GH¢ 7,462,500
6.  Strategic SWOT & Risk Mitigation

## PDF page 12

Risk Mitigation Playbook USSD Push Timeouts or Network Congestion: If
telecom USSD signaling experiences temporary downtime, the terminal
automatically times out after 30 seconds and switches to displaying a
dynamic QR code on its customer screen so transactions can proceed
without stalling the line. Tag Theft or Cloned UIDs: Physical tags hold
no wallet credentials, PINs, or money. Any attempted charge on a stolen
tag still triggers an authorization prompt on the legitimate owner's
handset, where entering a secret PIN is mandatory. Power Grid
Instability (Dums or ): Terminals feature an onboard 3000 mAh lithium
cell with intelligent sleep modes, providing up to 20 hours of
continuous operation without AC mains. Spotty Merchant Wi-Fi: The
production terminal design incorporates 4G LTE Cat-1 fallback with an
onboard SIM/eSIM slot to keep transactions running when local Wi-Fi
drops. 13. Phased Implementation Roadmap Strengths to
LeverageOpportunities to Capture Threats to Defend Weaknesses to Fortify
Import Component Lead Times Carrier API Price Hikes Carrier Signaling
Latency Physical Tag Onboarding Friction Smart Campus ID Integration
Campus & Transit Monopolies Anti-Fraud Audio Confirmation Sub-\$15 BOM
Economics Phone-Agnostic Accessibility Low Market Control High Market
Control High Operational Threat High Operational Advantage Boron Labs
SWOT Positioning

## PDF page 13

2 0 2 7 - 0 1 - 0 1 2 0 2 7 - 0 4 - 0 1 2 0 2 7 - 0 7 - 0 1 2 0 2 7 - 1
0 - 0 1 2 0 2 8 - 0 1 - 0 1 2 0 2 8 - 0 4 - 0 1 2 0 2 8 - 0 7 - 0 1 2 0
2 8 - 1 0 - 0 1 ESP32 & PN532 Bench Wiring & Firmware Go Backend with
Redis & Postgres Setup UG Campus Canteen Bench Testing (5 Units) Custom
4-Layer PCB Layout & SMT Run ABS Enclosure Molds & 100-Unit Batch Deploy
50 Pods on UG Campus Distribute 5,000 Student NFC Tags Scale to 10,000+
Terminals Nationwide Transport ID & Union Integrations Direct BoG
Dedicated PSP Application Iteration 1: Prototype Iteration 2: Production
Pilot Iteration 3: National Scale Boron Labs M-Tap Implementation &
Scale Roadmap
