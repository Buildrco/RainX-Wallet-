# RainX Wallet

Native React Native / Expo mobile wallet for the independent RainX Network and its native asset **RainX Coin (RXC)**.

This is **not a web wrapper**. Expo apps are React Native applications and build to native Android/iOS binaries. The project uses native device capabilities for secure storage, biometrics, haptics and the device-safe application lifecycle.

## Product direction

The mobile UX takes proven wallet patterns from established products while keeping RainX visually distinct:

- Balance-first home screen
- Compact crypto asset row
- Familiar Send / Receive actions
- Real QR receive address
- Transaction history and detail
- Network health and latest blocks
- Self-custody recovery phrase flow
- Secure local signing
- Device biometric unlock
- Subtle spring press motion and screen transitions
- Lottie confirmation animation
- System typography: iOS uses the device system/SF family; Android uses the native system sans family
- No HTML/CSS dashboard layer

## RainX protocol integration

The client talks directly to the RainX node REST API:

- `GET /api/status`
- `GET /api/balance?address=...`
- `GET /api/utxos?address=...`
- `GET /api/history?address=...`
- `GET /api/blocks?limit=...`
- `GET /api/tx?id=...`
- `POST /api/submit`

Private keys stay local. The mobile client reproduces the RainX transaction hashing/signing rules so transfers are signed before submission.

## Protocol-specific signing

The current RainX Chain v1 transaction format uses:

- Ed25519 keys
- SHA-256 transaction hashes
- Base58Check addresses with version `0x52`
- 8 decimal places
- UTXO inputs/outputs

The recovery phrase uses standard mnemonic encoding to preserve 256-bit wallet entropy. The current chain wallet derives one Ed25519 key directly from the 32-byte entropy so the same deterministic rule can be documented and migrated later.

## Setup

Use Node 22+.

```bash
npm install
npx expo install --fix
npm run start
```

For an Android device/emulator:

```bash
npm run android
```

For iPhone/iOS Simulator on macOS:

```bash
npm run ios
```

To generate/update the native projects:

```bash
npm run prebuild
```

Configure the RainX node in the app's **Settings → Network** screen, or set:

```bash
EXPO_PUBLIC_RAINX_RPC_URL=http://YOUR_NODE_IP:27778
```

Do not use `127.0.0.1` from a physical phone unless the node is running on that phone.

## Repository layout

```text
src/
  components/     Reusable native UI primitives
  screens/        Wallet and network screens
  services/       RainX chain client
  store/          Wallet persistence + app state
  theme/          Design tokens and typography
  utils/          Address, cryptography and transaction encoding
assets/
  lottie/         Local Lottie animation
```

## Important security status

This is a real native client and can create/sign/submit transactions against a real RainX node, but it is **not declared production-mainnet secure** solely by virtue of compiling. Before public-money use, add device-level security review, transaction signing test vectors, fuzzing, dependency auditing, recovery testing, multi-node interoperability tests and an independent security audit.
