import { currentUser } from "@clerk/nextjs/server";

export interface User {
  email: string | undefined;
  username?: string | undefined | null;
  avatar: string | undefined;
}

export const getUserData = async (): Promise<User> => {
  const user = await currentUser();
  return {
    email: user?.emailAddresses[0].emailAddress,
    username: user?.username,
    avatar: user?.imageUrl,
  };
};
