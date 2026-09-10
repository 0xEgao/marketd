# Marketd

Web interface for viewing OpenSwap market offers and monitoring the decentralized Bitcoin swap marketplace.

## Overview

Marketd provides a dashboard for the [OpenSwap Protocol](https://github.com/citadel-foss/openswap) - a decentralized atomic swap protocol for private Bitcoin transactions. View live market offers, maker node status, and network activity.

Marketd uses `MARKETD_WALLET_PASSWORD` for OpenSwap's required encrypted
wallet. `run.sh` defaults it to the configured Tor password; direct runs default
to `openswap` and should override it in production.

## Quick Start

### Prerequisites
- Rust (latest stable)
- Node.js (v16+)

### Run everything
```bash
chmod +x run.sh
./run.sh
```

Open http://localhost:5173

### Manual setup
Backend:
```bash
cd daemon
cargo run
```

Frontend (in another terminal):
```bash
cd web
npm install
npm run dev
```

## Features

- **Live Market Data**: View available swap offers and fees
- **Maker Status**: Monitor online/offline maker nodes  
- **Network Stats**: Track liquidity and swap activity
- **Privacy First**: All communication over Tor



## Related

- [OpenSwap Protocol](https://github.com/citadel-foss/openswap) - Main implementation and protocol documentation

## License

MIT
### Offer cleanup

After each successful sync, marketd removes makers whose last successful offer
update was at least three days ago, regardless of maker state. Removal uses
OpenSwap's existing API, which updates the in-memory and persisted offerbook.
Removed entries are also omitted from the dashboard snapshot. Makers still
advertised in the discovery registry can be rediscovered on a later sync.
Records with no successful-update timestamp are left alone because their age
is unknown. Removal errors are logged.
