
# TripMate Share

TripMate Share is an AI-powered travel memory assistant built on ElizaOS that helps users retrieve, summarize, and share their travel experiences stored on decentralized storage. It serves as the sharing component of the TripMate ecosystem, allowing friends and family to view stored travel data and contribute suggestions.

## Prerequisites

- Node.js version 22 or higher
- pnpm package manager
- Telegram account (for bot creation)
- OpenRouter API key
- Storacha account and w3cli tools

## Installation Steps

### Clone the Repository

```bash
git clone https://github.com/Dhruv-Varshney-developer/Tripmate-Share
cd Tripmate-Share
```

### Install Dependencies

```bash
pnpm install
```

### Set Up Storacha Integration

a. Install w3cli tool:
```bash
npm install -g @web3-storage/w3cli
```

b. Generate a DID (Decentralized Identifier):
```bash
w3 key create
```
Save both the private key (starts with Mg...) and public key (starts with did:key:)

c. Create a Space:
```bash
w3 space create [YOUR_SPACE_NAME]
```
Save the space DID for later use

d. Create Delegation:
```bash
w3 delegation create -c space/blob/add -c space/index/add -c filecoin/offer -c upload/add <YOUR_AGENT_DID> --base64
```
Save the delegation output for environment variables.

### Set Up Telegram Bot

1. Go to @BotFather on Telegram
2. Create a new bot using the `/newbot` command
3. Save the bot token provided by BotFather

### Configure Environment Variables

Create a .env file in the project root:
```bash
cp .env.example .env
```

Add the following essential variables to your .env file:
```
# Required API Key
OPENROUTER_API_KEY=your-openrouter-api-key

# Telegram Bot
TELEGRAM_BOT_TOKEN=your-telegram-bot-token

# Storacha Configuration
STORACHA_AGENT_PRIVATE_KEY=your-private-key-from-w3-key-create
STORACHA_AGENT_DELEGATION=your-delegation-from-w3-delegation-create
```

## Start the Agent

```bash
pnpm start
```

For custom character configuration:
```bash
pnpm start --characters="characters/eliza.character.json"
```

## Using Docker (Alternative)

For x86_64 architecture:
```bash
# Edit environment variables in docker-compose.yaml first
docker compose up
```

For Mac M-Series or aarch64:
```bash
# Build the image
docker buildx build --platform linux/amd64 -t tripmate-share:v1 --load .
# Edit environment variables in docker-compose-image.yaml first
docker compose -f docker-compose-image.yaml up
```

## TripMate Ecosystem Integration

TripMate Share is part of the broader TripMate ecosystem:

- **[TripMate Planner](https://github.com/Dhruv-Varshney-developer/Tripmate-Planner)** - Interacts with users to collect travel preferences
- **[TripMate Finder](https://github.com/Dhruv-Varshney-developer/Tripmate-Finder)** - Processes user preferences and searches for travel options
- **TripMate Share** (this project) - Allows retrieval and sharing of stored travel data

TripMate Share focuses on:
- Retrieving travel data stored on decentralized storage using CIDs
- Presenting and summarizing travel memories in a clear, organized format
- Enabling friends and family to view and comment on travel experiences

## Features

- Fetch and display travel data from decentralized storage
- Summarize travel itineraries in an easy-to-read format
- Store user travel memories securely using Storacha
- Allow sharing of travel experiences with friends and family
- Support for viewing and adding comments/suggestions to shared trips

## Customizing the Agent

You can customize the agent's personality and behavior by:
1. Editing `src/character.ts` directly
2. Creating a custom character JSON file in the `characters/` directory
3. Running with the `--characters` flag to load your custom configuration

## Learn more about the project on these links:
- [TripMate Planner](https://github.com/Dhruv-Varshney-developer/Tripmate-Planner) - Agent 1
- [TripMate Finder](https://github.com/Dhruv-Varshney-developer/Tripmate-Finder)- Agent 2
- [TripMate Share](https://github.com/Dhruv-Varshney-developer/Tripmate-Share)- Agent 3
- [Technical Whitepaper](https://motley-popcorn-c4a.notion.site/Technical-docs-1d52ab2404df8018afdfe86f4e8fdd29)
- [Tripmate Overview](https://docs.google.com/document/d/1YahKkW0qBaG_6H9lp3DIPhmn56ApjW2dxbJNvrDZqOg/edit?usp=sharing)
- [Demo video](https://www.youtube.com/watch?v=cyKxdZ3uryQ)
- [Presentation Link](https://www.canva.com/design/DAGkjcxFXBQ/az25u5Wo1RgXVDd7d78UYQ/edit?utm_content=DAGkjcxFXBQ&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton) 
