# Pricer

A real-time active investment monitoring platform offers investors an advanced way to track and manage their portfolio in real time. Through this platform, users can view the performance of different asset classes—such as stocks, real estate funds, cryptocurrencies, commodities, and fixed income—consolidating all information in a single, user-friendly interface.

### Key Features

1. **Real-Time Monitoring**: The platform collects and displays market data in real time, enabling investors to view price and volume fluctuations of their assets within seconds. This allows users to make quick decisions, reacting to market events swiftly and accurately.

2. **Portfolio and Profitability Analysis**: The system provides a detailed view of the portfolio, allowing investors to monitor the individual performance of each asset and the overall profitability of their investments. Interactive charts and customized indicators help interpret data and identify trends.

### Benefits of a Real-Time Monitoring Platform

- **Faster, More Informed Decisions**: With data updated every second, investors gain confidence in making informed decisions, minimizing risks.

- **Risk Reduction**: With risk alerts and volatility monitoring features, the platform helps protect portfolios against unexpected losses.

- **Centralized Access to Various Assets**: By consolidating multiple assets and classes in one place, the platform makes it easy to fully monitor a portfolio, even if investors hold assets in different brokerages.

- **Greater Control and Efficiency**: Automating data collection and report generation simplifies tracking and analysis, giving investors more time to focus on strategy and optimization.

A real-time active investment monitoring platform is an essential tool for investors seeking to maximize returns and minimize risks in a dynamic market. With it, users can stay ahead, responding intelligently and swiftly to market changes.

## Tech Stack

- [Next.js 14+](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn/ui](https://ui.shadcn.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Next-Auth.js](https://next-auth.js.org/)

## Getting Started

1. Clone the repository:

```bash
git clone git@github.com:azevedo-pedro/pricer.git
cd pricer
```

2. Install dependencies:

```bash
npm install

or

yarn install
```

3. Set up environment variables:

```bash
cp .env.local.example .env.local
```

4. Start the development server:

```bash
npm run dev

or

yarn dev
```

## Project Structure

```
pricer
├── app
│   ├── (auth)
│   │   └── sign-in
│   │       └── [[...sign-in]]
│   │           └── page.tsx
│   ├── (private)
│   │   ├── (dashboard)
│   │   │   ├── actions.tsx
│   │   │   ├── columns.tsx
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── api
│   │   └── auth
│   │       └── [...nextauth]
│   │           └── route.ts
│   ├── favicon.ico
│   ├── globals.css
│   └── layout.tsx
├── components
│   ├── __tests__
│   │   ├── auth-form.test.tsx
│   │   ├── data-tables.test.tsx
│   │   ├── header.test.tsx
│   │   └── user-button.test.tsx
│   ├── auth-form.tsx
│   ├── data-table.tsx
│   ├── header.tsx
│   ├── ui
│   │   ├── avatar.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── checkbox.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── form.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── sheet.tsx
│   │   ├── sonner.tsx
│   │   └── table.tsx
│   └── user-button.tsx
├── components.json
├── features
│   └── price
│       ├── api
│       │   ├── api.ts
│       │   ├── use-create-price.ts
│       │   ├── use-delete-price.ts
│       │   ├── use-edit-price.ts
│       │   ├── use-edit-prices.ts
│       │   ├── use-get-price-id.ts
│       │   └── use-get-price.ts
│       ├── components
│       └── hooks
│           ├── use-new-price.tsx
│           └── use-open-price.tsx
├── hooks
│   ├── use-confirm.tsx
│   └── use-profile.tsx
├── jest.config.ts
├── jest.setup.ts
├── lib
│   ├── __tests__
│   │   ├── api.integration.test.ts
│   │   └── utils.test.ts
│   ├── api.ts
│   ├── test-utils.tsx
│   └── utils.ts
├── middleware.ts
├── next-env.d.ts
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── providers
│   ├── auth-provider.tsx
│   ├── query-provider.tsx
│   └── websocket-provider.tsx
├── public
│   ├── logo.svg
│   └── profile.png
├── tailwind.config.ts
├── tsconfig.json
├── tsconfig.tsbuildinfo
├── types
│   └── next-auth.d.ts
└── yarn.lock
```

## Development

### Prerequisites

- Node.js 20+
- npm or yarn
- Git

### Commands

- `npm run dev` - Start development server
- `npm run build` - Build production bundle
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
  :

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
