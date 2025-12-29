// Define user type
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
};

// Extend the default session and JWT token types
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      isAdmin: boolean;
    };
  }

  interface User {
    isAdmin: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    isAdmin: boolean;
  }
}