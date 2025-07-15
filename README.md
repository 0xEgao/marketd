# Marketd

Web interface for viewing Coinswap market offers and monitoring the decentralized Bitcoin swap marketplace.

## Overview

Marketd provides a dashboard for the [Coinswap Protocol](https://github.com/citadel-tech/coinswap) - a decentralized atomic swap protocol for private Bitcoin transactions. View live market offers, maker node status, and network activity.

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

- [Coinswap Protocol](https://github.com/citadel-tech/coinswap) - Main implementation
- [Protocol Docs](https://github.com/citadel-tech/Coinswap-Protocol-Specification) - Technical specification

## License

MIT