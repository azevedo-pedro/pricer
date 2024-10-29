# Pricer

A clean and modern admin dashboard built with Next.js 14+ and Tailwind CSS, featuring a secure login page and internal dashboard view.

## Features

- 🔐 Secure authentication system
- 📊 Clean dashboard interface
- 🎨 Modern UI with Tailwind CSS
- 📱 Fully responsive design
- 🚀 Server-side rendering with Next.js
- 🔄 Built-in API routes
- 📦 Shadcn/ui components integration

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
cp .env.example .env.local
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
├── README.md
├── app
│   ├── (auth)
│   │   └── sign-in
│   │       └── [[...sign-in]]
│   │           └── page.tsx
│   ├── (private)
│   │   ├── (dashboard)
│   │   │   ├── layout.tsx
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
│   │   ├── header.test.tsx
│   │   └── user-button.test.tsx
│   ├── auth-form.tsx
│   ├── header.tsx
│   ├── ui
│   │   ├── avatar.tsx
│   │   ├── button.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── form.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   └── sonner.tsx
│   └── user-button.tsx
├── components.json
├── hooks
│   └── useProfile.tsx
├── jest.config.ts
├── jest.setup.ts
├── lib
│   ├── __tests__
│   │   └── api.integration.test.ts
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
│   └── query-provider.tsx
├── public
│   ├── logo.svg
│   └── profile.png
├── tailwind.config.ts
├── tests
├── tests-examples
├── tsconfig.json
├── tsconfig.tsbuildinfo
├── types
│   └── next-auth.d.ts
└── yarn.lock
```

## Authentication

This project uses Next-Auth.js for authentication. Configure your auth providers in `pages/api/auth/[...nextauth].ts`:

```typescript
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Add your authentication logic here
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
});
```

## Styling

The project uses Tailwind CSS for styling. Key color schemes can be customized in `tailwind.config.js`:

```javascript
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#156D5C",
          // Add your color palette
        },
      },
    },
  },
  plugins: [],
};
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

## Deployment

The application can be deployed to various platforms:

### Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

### Docker

```bash
docker build -t admin-dashboard .
docker run -p 3000:3000 admin-dashboard
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
