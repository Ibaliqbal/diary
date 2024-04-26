import { createClient } from "@supabase/supabase-js";
import { UUID } from "crypto";
import { getUserData } from "./clerk";

export interface IDiary {
  diary_id?: number;
  content: string;
  email: string | undefined;
  username?: string | null;
  avatar: string | undefined;
  created_at?: string | Date;
  favorites?: Array<number | undefined>;
  comments?: Array<ICooments>;
  likes?: 0;
}

export interface ICooments extends IDiary {
  id: UUID;
  reply_to?: string;
}

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.SUPABASE_SECRET_KEY as string
);

export async function getUser() {
  const { email } = await getUserData();
  const { data, status } = await supabase
    .from("dairy")
    .select()
    .eq("email", email);

  if (status !== 200) return null;
  return data;
}
