import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        console.log("1. Credentials:", credentials); // чи приходять дані?

        // Шукаємо користувача в БД
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        console.log("2. User found:", user); // чи знайдено юзера?

        if (!user) return null;

        // Перевіряємо пароль
        const isValid = await bcrypt.compare(
          credentials.password,
          user.password,
        );

        console.log("3. Password valid:", isValid); // чи вірний пароль?

        if (!isValid) return null;

        return {
          id: String(user.id),
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    // Зберігаємо role в token
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    // // Зберігаємо role в session
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
        session.user.id = token.sub;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt" },
};
