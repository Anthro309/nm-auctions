# NM Auctions — Mobile App
### Innovative Auction, Liquidation & Estate Sales

Android app (Google Play Store) for **NM Auctions** — weekly online estate & consignment auctions in Southern New Mexico.

---

## 📱 Screens

| Screen | Description |
|---|---|
| **Home** | Category filter, promo banner, live auction cards |
| **Auctions** | Full list of all active weekly auctions |
| **Auction Detail** | Searchable lot list with per-lot countdowns |
| **Lot Detail** | Item info, Standard + Proxy Auto-Bid, pickup instructions |
| **My Bids** | Winning / Outbid tabs with live timers |
| **Account** | Stats, invoices, notifications, contact & sign out |

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18+
- Expo CLI: `npm install -g expo-cli`
- EAS CLI: `npm install -g eas-cli`
- An [Expo account](https://expo.dev/signup) (free)

### Install & Run

```bash
npm install
npx expo start
```

Press `a` to open on Android emulator, or scan the QR code with **Expo Go** on your phone.

---

## 🏗️ Building for the Play Store

### Step 1 — Link your Expo account

```bash
eas login
eas build:configure
```

### Step 2 — Update `app.json`

Replace the two placeholder values:

```json
"owner": "your-expo-username",
"projectId": "the-id-eas-just-generated"
```

### Step 3 — Replace placeholder assets

| File | Size | Notes |
|---|---|---|
| `assets/icon.png` | 1024×1024 | App icon (no transparency) |
| `assets/adaptive-icon.png` | 1024×1024 | Android adaptive icon foreground |
| `assets/splash.png` | 1284×2778 | Splash screen |

Use the NM Auctions logo on a navy (`#1A3A5C`) background.

### Step 4 — Test build (APK)

```bash
npm run build:android:preview
```

Installs directly on any Android device — no Play Store needed.

### Step 5 — Production build (AAB)

```bash
npm run build:android:prod
```

Produces the `.aab` bundle required by the Play Store.

---

## 📤 Play Store Submission

1. Go to [play.google.com/console](https://play.google.com/console)
2. Pay the one-time **$25 USD** developer fee
3. Create app: **"NM Auctions"**
4. Complete store listing (screenshots, description, content rating)
5. Set up a Google Play service account key → save as `google-play-service-account.json`
6. Run: `npm run submit:android`

---

## 🔌 Connecting to the Live Backend

All data lives in `src/data/mockData.js`. To go live, replace with API calls to `nmestateauctions.com` or a new API layer. Key integrations to add:

- **Auth** — register/login using existing bidder accounts
- **Push Notifications** — outbid alerts via `expo-notifications` or Firebase
- **Real-time Bidding** — live bid count/amount updates via WebSocket or Supabase Realtime
- **Payment** — card management via Stripe or your existing processor

---

## 📁 Project Structure

```
NMAuctions/
├── App.js                             # Entry point, fonts, navigation container
├── app.json                           # Expo + Play Store config
├── eas.json                           # EAS Build & Submit profiles
├── package.json
├── assets/                            # ← Replace with real artwork
└── src/
    ├── navigation/AppNavigator.js     # Bottom tabs + stack navigators
    ├── theme/index.js                 # Navy/gold color system, fonts, spacing
    ├── data/mockData.js               # Mock auctions, lots, bids → replace with API
    ├── hooks/useCountdown.js          # Live countdown timer hook
    ├── components/
    │   ├── AuctionCard.js             # Auction card with gradient + timer
    │   ├── LotCard.js                 # Individual lot row
    │   └── BidCard.js                 # My Bids row (winning/outbid)
    └── screens/
        ├── HomeScreen.js              # Categories + active auctions
        ├── AuctionsScreen.js          # Full auction list
        ├── AuctionDetailScreen.js     # Lots within an auction
        ├── LotDetailScreen.js         # Item detail + bidding UI
        ├── MyBidsScreen.js            # Bid tracker
        └── AccountScreen.js           # Profile, settings, contact
```

---

## 🎨 Design System

| Token | Value | Use |
|---|---|---|
| `primary` | `#1A3A5C` | Navy — headers, buttons, active states |
| `accent` | `#C8922A` | Gold — featured badges, tab indicator, accents |
| `teal` | `#1B7A72` | Links, contact actions |
| `bg` | `#F5F7FA` | Screen background |
| **Display font** | Playfair Display | Headings, auction titles |
| **UI font** | Nunito | All body copy, labels, buttons |

---

## 📞 Contact

**NM Auctions / Mesilla Valley Estate Sales, LLC**
- 📞 (575) 639-0213
- ✉️ admin@nmestateauctions.com
- 🌐 nmestateauctions.com
- 📍 210 S Nevarez St, Las Cruces, NM 88001

**Pickup hours:** Saturday & Sunday, 9:00 AM – 1:00 PM
*(Enter from Nevarez St — exit onto E. Bowman Ave)*
