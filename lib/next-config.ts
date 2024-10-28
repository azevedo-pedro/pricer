import { NextAuthOptions } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
import { api } from "@/lib/api";

export const nextOptions: NextAuthOptions = {
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
          const response = await api.post("/token", formData, {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          });
          console.log(response);
          if (response.data) {
            return response.data;
          }
          return null;
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
};
