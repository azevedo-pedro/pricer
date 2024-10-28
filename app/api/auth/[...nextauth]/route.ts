import NextAuth from "next-auth";

import { NextAuthOptions } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
import { api } from "@/lib/api";

const nextOptions: NextAuthOptions = {
  debug: true,
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        scope: { type: "text" },
        client_id: { type: "text" },
        client_secret: { type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const formData = new URLSearchParams();
        formData.append("grant_type", "password");
        formData.append("username", credentials.email);
        formData.append("password", credentials.password);
        if (credentials.scope) {
          formData.append("scope", credentials.scope);
        }
        if (credentials.client_id) {
          formData.append("client_id", credentials.client_id);
        }

        if (credentials.client_secret) {
          formData.append("client_secret", credentials.client_secret);
        }
        try {
          const { data: tokens } = await api.post("/token", formData, {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          });
          const { data } = await api.get("/users/me", {
            headers: { Authorization: `Bearer ${tokens.access_token}` },
          });

          if (data) {
            return {
              id: data.client_id,
              email: data.email,
              name: data.full_name,
              username: data.username,
              accessToken: tokens.access_token,
            };
          }
          return null;
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
};

const handler = NextAuth(nextOptions);

export { handler as GET, handler as POST };
