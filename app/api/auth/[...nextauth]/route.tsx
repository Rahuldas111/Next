import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, { NextAuthOptions, RequestInternal } from "next-auth";
import { models } from "@/app/models";
import bcrypt from "bcrypt";

declare module 'next-auth' {
  interface Session {
    user: {
      name: string;
      roles: string;
    };
  }

  interface User {
    name: string;
    roles: string;
  }
}

async function login(credentials:any){
  try {
    const user = await models.User.findOne({
      where: {
        email: credentials.email
      },
      include: [
        {
          model: models.Role
        }
      ],
      raw: true,
      nest: true
    })
    if (!user) throw new Error("Wrong Credentials.")
    const isCorrect = await bcrypt.compare(credentials.password, user?.password);
    if (!isCorrect) throw new Error("Wrong Credentials.")
    return user
  } catch (error) {
    throw new Error('Something wentr wrong.')
  }
}

const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/signin',
  },
  providers: [
    CredentialsProvider({
      name: "credentials",

      credentials: {
        email: {},
        password: {}
      },
      authorize: async (
        credentials: Record<"password" | "email", string> | undefined,
        req: Pick<RequestInternal, 'body' | 'query' | 'headers' | 'method'>
      ) => {
        try {
          const user = await login(credentials);
          return {
            id: user?.id,
            name: user?.name,
            email: user?.email,
            roles: user?.Role?.name
          };
        } catch (error) {
          throw new Error("Failed to login")
        }
      }
    })
  ],
  callbacks:{
    async jwt({token, user}:any){
      if (user) {
        token.email = user?.email;
        token.id = user?.id,
        token.roles = user?.roles
      }
      return token
    },
    async session({session,token}:any){
      if (token) {
        session.user.email = token.email;
        session.user.id = token.id,
        session.user.roles = token.roles
      }
      return session
    },
  },
}

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}
