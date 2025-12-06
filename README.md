# KStayble - KRW Stablecoin Payment Gateway for Foreign Tourists 🚀

> **Built on MemeCore - Where memes meet real-world utility!** 🎭

## Live Demo

🚀 **[View Live Demo](https://kstayble-wallet-memecore-ideathon.vercel.app/)**

Experience the KStayble platform in action with our interactive demo featuring Korean food delivery integration, wallet functionality, and payment flows. Now powered by MemeCore's viral economy! 💜

## Overview

KStayble is an all-in-one payment gateway application designed specifically for foreign tourists visiting Korea. The platform leverages KRW-based stablecoins to provide seamless payment experiences while addressing the fragmented payment infrastructure that currently inconveniences international visitors.

**What makes us special?** We're building on [MemeCore](https://docs.memecore.com/) - the first Layer 1 blockchain built for Meme 2.0, where meme culture meets real-world utility. This isn't just another payment app - it's a cultural bridge powered by community-driven virality! 🎪

## Business Context

### Market Opportunity

Korea's tourism industry represents a significant economic opportunity:
- **Annual visitors**: Over 16 million foreign tourists
- **Market size**: Approximately 59 trillion KRW
- **Growth trajectory**: 11% increase in international tourist spending in 2024 ($16.7 billion USD)
- **Total tourism expenditure**: 58.75 trillion KRW (combining domestic and international spending)

### Current Pain Points

Foreign tourists face several structural challenges when visiting Korea:

1. **Fragmented Payment Systems**
   - Multiple payment methods required (cash, credit cards, transportation cards)
   - Complex currency exchange processes with high fees
   - Limited acceptance of foreign payment methods

2. **Restricted Access to Local Services**
   - Inability to use Korean-only applications (delivery apps, mobility services)
   - Identity verification barriers for foreign users
   - Language and localization issues

3. **Limited Data Analytics**
   - Difficulty distinguishing domestic vs. international spending patterns
   - Fragmented data across multiple payment platforms
   - Lack of actionable insights for tourism policy development

4. **Insufficient Marketing Channels**
   - Limited direct marketing channels to foreign tourists
   - Reliance on traditional marketing or overseas platforms
   - Absence of integrated digital marketing infrastructure

## MemeCore Blockchain Technical Specifications

KStayble leverages **MemeCore Mainnet**, the first Layer 1 blockchain built for Meme 2.0 - where meme coins evolve from short-term speculation into long-term cultural and economic forces! 🎨

### **Network Architecture**

- **Consensus**: Proof of Meme (PoM) with Epoch-based validator selection
- **Block Time**: ~7 seconds (optimized for high throughput)
- **EVM Compatibility**: Full Ethereum Virtual Machine compatibility - deploy with ease!
- **Account Model**: Supports EOAs and Smart Contract Accounts
- **Fee Structure**: Native $M token for gas payments

### **Key Features**

1. **EVM-Compatible**: The MemeCore network is an Ethereum Virtual Machine compatible network. Users and developers familiarized with the Ethereum network can onboard into MemeCore with ease.

2. **Multi-Rewards**: In addition to $M rewards earned through block creation, validators also receive a portion of all MRC-20 tokens generated on the network.

3. **Meme Vault**: The Meme Vault is a unique mechanism within MemeCore that is created alongside the launch of each meme coin. It is designed to fuel the viral economy by rewarding users who contribute to the longevity of the meme coin's lifecycle — including creators, community users, and holders.

### **Development Environment**

- **Mainnet**: MemeCore Mainnet
- **Testnet**: Insectarium Testnet
- **RPC Endpoint**: `https://rpc.insectarium.memecore.net` (testnet)
- **Block Explorer**: `https://insectarium.blockscout.memecore.com` (testnet)
- **Chain ID**: Check [MemeCore Documentation](https://docs.memecore.com/developer-guide/quickstart/add-the-memecore-network-to-your-wallet) for latest network details

### **Adding MemeCore Network to Your Wallet**

To connect to MemeCore, follow the [official guide](https://docs.memecore.com/developer-guide/quickstart/add-the-memecore-network-to-your-wallet):

1. Open MetaMask and click "Networks" menu
2. Click "Add a Custom Network"
3. Enter network details:
   - **Network Name**: MemeCore Testnet (Insectarium) or MemeCore Mainnet
   - **RPC URL**: `https://rpc.insectarium.memecore.net` (testnet)
   - **Chain ID**: See official documentation
   - **Currency Symbol**: $M
   - **Block Explorer**: `https://insectarium.blockscout.memecore.com` (testnet)

## Solution Architecture

### Core Technology Stack

**Frontend**
- Next.js 15.2.4
- React 19
- TypeScript
- Tailwind CSS
- Shadcn/UI Components
- **8-bit pixel font styling** for that authentic meme culture vibe! 🎮

**Blockchain Infrastructure**
- **MemeCore Network**: EVM-compatible blockchain optimized for meme culture and real-world utility
- **Smart Contracts**: Solidity-based contracts deployed on MemeCore mainnet
- **Gas Optimization**: Native $M token for gas payments
- **Wallet Integration**: MetaMask and standard Web3 wallet compatibility
- DID (Decentralized Identity) based wallet creation
- Cross-chain bridge technology for asset management

**Key Features**
- Passport-based deterministic wallet generation
- DID-based identity verification system
- Integration with major Korean service platforms
- NFT-based gamification and loyalty programs
- **MemeCore-native token support** - because why not make payments fun? 🎪

### Technical Implementation

**Wallet Creation Process**
```
Passport Information (Number + DOB + Expiry) 
→ SHA256 Hash with Secret Key 
→ Private Key Generation 
→ Public Key Derivation 
→ Wallet Address Creation
```

**Payment Flow**
```
Tourist Registration → DID Wallet Creation → Stablecoin Purchase 
→ Integrated Service Usage → Data Collection → Analytics
```

## Platform Integrations

### Transportation & Mobility
- T-Money integration for public transportation
- Kakao T for taxi services
- SOCAR for car sharing

### Shopping & Delivery
- Baemin (Delivery) integration
- Olive Young (Beauty/Health products)
- Coupang (E-commerce)
- Naver Shopping

### Reservation Services
- NOL (Accommodation/Content)
- Catchtable (Restaurant reservations)
- SafeDoc (Medical services)

## Business Model

### Revenue Streams

1. **Transaction Fees**: Commission from integrated service platforms
2. **Digital Advertising**: Targeted advertising based on nationality data
3. **Data Analytics**: Anonymized tourism consumption data for institutions
4. **DID Integration Fees**: Wallet creation and identity verification services
5. **Breakage Revenue**: Unused voucher/stablecoin balances
6. **NFT Loyalty Programs**: Gamification-based tourism experiences
7. **MemeCore Ecosystem Participation**: Leveraging Meme Vault rewards and MRC-20 token participation

### User Journey Optimization

**Pre-Visit**: Planning and reservation through integrated platforms
**Arrival**: Instant wallet creation and currency exchange
**During Stay**: Unified payment system across all services
**Departure**: Remaining balance conversion to discount vouchers
**Return Visits**: Loyalty rewards and personalized marketing

## Data Privacy & Compliance

### Personal Information Protection
- Explicit consent collection for all data usage
- Separate consent for payment services vs. analytics
- Passport and foreign registration number handling protocols
- Defined data retention periods with automatic deletion
- Anonymous/pseudonymous data processing for public benefit

### Security Measures
- Secure blockchain architecture preventing unauthorized data access
- Personal information encryption and separated storage
- Regular security audits and compliance reviews
- Enterprise-grade security infrastructure

## Development & Deployment

### Getting Started

```bash
# Clone the repository
git clone [repository-url]

# Navigate to frontend directory
cd kstayble-fe

# Install dependencies
npm install
# or
pnpm install

# Start development server
npm run dev
# or
pnpm dev
```

### Project Structure

```
kstayble-memecore-hackathon/
├── kstayble-fe/          # Next.js frontend application
├── kstayble-contracts/   # Smart contract implementations
└── README.md            # This file
```

### Environment Setup

The project uses environment variables for configuration management. Make sure to set up your MemeCore network RPC endpoints and other required configuration.

## MemeCore Ecosystem & Culture 🎭

### Why MemeCore?

We chose MemeCore because it aligns perfectly with our vision of making payments fun, engaging, and culturally relevant. MemeCore's **Proof of Meme (PoM)** consensus and **Meme Vault** mechanisms create a unique ecosystem where:

- **Creators are rewarded** for viral content and community engagement
- **Users participate** in a participatory economy that thrives on activity
- **Cultural value** is recognized alongside economic value
- **Long-term sustainability** is built into the meme coin lifecycle

### Meme 2.0 Philosophy

MemeCore introduces the **viral economy**: a Meme 2.0 paradigm where meme coins become enduring cultural assets and active economic engines. By rewarding both content virality and transaction volume, MemeCore ensures that every meaningful interaction — whether social or on-chain — becomes part of a sustainable, value-generating ecosystem.

**This isn't just about payments - it's about building a community!** 🎪

### Memekathon Seoul 2025

This project was built for [Memekathon Seoul 2025](https://memekathon.memecore.com/ko) - a hackathon celebrating meme culture and blockchain innovation! The event brings together developers, creators, and innovators to build services that make the MemeCore ecosystem more diverse and exciting.

**Event Details:**
- **Dates**: November 22 - December 13, 2025
- **Location**: AMC Tower (LBank Labs), Seoul, Korea
- **Focus**: Social services inspired by internet culture, creative new services combining memes and fun

## Future Roadmap

### Phase 1: Core Platform Development
- DID-based wallet system implementation
- Major service platform integrations
- Basic analytics and reporting
- MemeCore network integration

### Phase 2: Enhanced Features
- NFT-based loyalty programs
- Advanced gamification elements
- Expanded service integrations
- MRC-20 token support and Meme Vault participation

### Phase 3: Scale & Expansion
- Multi-language support
- Regional service expansion
- Advanced AI-driven personalization
- Full MemeCore ecosystem integration

## Vision Statement

KStayble aims to modernize Korea's tourism payment infrastructure through blockchain technology. Built on MemeCore's innovative network architecture, the platform enables seamless KRW stablecoin transactions for foreign tourists while providing data analytics for policy development.

Our mission is to create scalable digital payment infrastructure that enhances visitor experiences and supports Korea's tourism industry growth through efficient blockchain-based financial services - all while embracing the fun, creative spirit of meme culture! 🎨

**We're not just building a payment app - we're building a cultural bridge powered by MemeCore's viral economy!** 💜

## Contributing

This project represents a comprehensive solution for modernizing Korea's tourism payment infrastructure while embracing meme culture and community-driven innovation. Contributors should focus on maintaining the highest standards of security, user experience, and regulatory compliance.

For technical questions or contribution guidelines, please refer to the development documentation in each respective module.

## Resources

- [MemeCore Documentation](https://docs.memecore.com/)
- [MemeCore Consensus Guide](https://docs.memecore.com/guides/consensus-current-ver.)
- [Adding MemeCore Network to Wallet](https://docs.memecore.com/developer-guide/quickstart/add-the-memecore-network-to-your-wallet)
- [Memekathon Seoul 2025](https://memekathon.memecore.com/ko)

---

*KStayble is not just an app for foreigners - it's infrastructure for Korea's future, powered by MemeCore's viral economy!* 🚀

**Built with 💜 on MemeCore - Where memes meet real-world utility!** 🎭
