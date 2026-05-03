import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/lib/validations";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  pages: {
    signIn: "/admin/login",
  },
  providers: [
    CredentialsProvider({
      name: "Admin",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        try {
          const user = await prisma.user.findUnique({
            where: { email: parsed.data.email },
          });

          if (!user) return null;
          const valid = await bcrypt.compare(parsed.data.password, user.password);
          if (!valid) return null;

          return {
            id: user.id,
            email: user.email,
            name: user.name ?? "Admin",
          };
        } catch {
          const envEmail = process.env.ADMIN_EMAIL;
          const envPassword = process.env.ADMIN_PASSWORD;

          if (parsed.data.email === envEmail && parsed.data.password === envPassword) {
            return {
              id: "local-admin",
              email: envEmail,
              name: "Local Admin",
            };
          }

          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};
