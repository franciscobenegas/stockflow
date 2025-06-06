import CredentialsProviders from "next-auth/providers/credentials";
import prisma from "@/libs/prisma";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProviders({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email@email.com" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "*******",
        },
      },

      // async authorize(credentials, req) {

      async authorize(credentials) {
        const userFount = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });

        if (!userFount) throw new Error("Error en el inicio de session");

        const matchPassword = bcrypt.compare(
          credentials!.password,
          userFount.password
        );

        if (!matchPassword) throw new Error("Error en el inicio de session");

        return {
          id: userFount.id,
          name: userFount.username,
          email: userFount.email,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/login",
  },
};
