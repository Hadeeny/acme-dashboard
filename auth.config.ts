import Credentials from 'next-auth/providers/credentials';
import Github from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import type { NextAuthConfig } from 'next-auth';
import bcrypt from 'bcryptjs';
import { db } from './app/lib/db';
import { LoginSchema } from './app/lib/definitions';
import { getUserByEmail } from './app/lib/data';

export default {
  events: {
    // sets verified email for users who signed in with 0auths
    // async linkAccount({ user }) {
    //   await db.user.update({
    //     where: { id: user.id },
    //     data: { emailVerified: new Date() },
    //   });
    // },
  },
  providers: [
    // Github({
    //   clientId: process.env.GITHUB_CLIENT_ID,
    //   clientSecret: process.env.GITHUB_CLIENT_SECRET,
    // }),
    // Google({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // }),
    // Credentials({
    //   async authorize(credentials) {
    //     const validatedFields = LoginSchema.safeParse(credentials);
    //     if (validatedFields.success) {
    //       const { email, password } = validatedFields.data;
    //       const user = await getUserByEmail(email);
    //       if (!user || !user.password) {
    //         return;
    //       }
    //       const passwordsMatch = await bcrypt.compare(password, user.password);
    //       if (passwordsMatch) {
    //         return user;
    //       }
    //     }
    //     return null;
    //   },
    // }),
  ],
} satisfies NextAuthConfig;
