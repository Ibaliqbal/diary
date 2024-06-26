"use server";

import { getUserData } from "@/utils/clerk";
import { IDiary, supabase } from "@/utils/supabase";
import { revalidatePath } from "next/cache";

export const createDiaryAction = async (formData: FormData) => {
  const content = formData.get("content") as string;
  if (!content || content.trim() === "") return;
  const { avatar, email, username } = await getUserData();
  const data: IDiary = {
    content,
    email,
    username,
    avatar,
    likes: 0,
  };

  await supabase.from("dairy").insert(data);

  revalidatePath("/dashboard/my-diary");

  return true;
};

export async function deleteDiary(id: number | undefined) {
  if (!id) return;
  await supabase.from("dairy").delete().eq("id", id);

  revalidatePath("/dashboard/my-diary");
}

export const editDiaryAction = async (formData: FormData) => {
  const contentEdit = formData.get("content") as string;
  const id = formData.get("diary_id");

  await supabase.from("dairy").update({ content: contentEdit }).eq("id", id);
  revalidatePath("/dashboard/my-diary");
  return true;
};

export async function favDiary(
  id: number | undefined,
  red: string,
  type: "like" | "unlike"
) {
  const { email, username } = await getUserData();
  if (!username && !email) return false;

  const { data: favorite } = await supabase
    .from("dairy")
    .select("favorites")
    .eq("email", email);
  const { data: likesDiarySup } = await supabase
    .from("dairy")
    .select("likes")
    .eq("id", id)
    .single();

  const existingFavorites = favorite![0].favorites || [];
  const existingLikesDiarySup = likesDiarySup?.likes || 0;
  const newFavorites =
    type === "like"
      ? [...existingFavorites, id]
      : existingFavorites.filter((f: any) => f !== id);
  const likesDiary =
    type === "like"
      ? existingLikesDiarySup + 1
      : existingLikesDiarySup === 0
      ? 0
      : existingLikesDiarySup - 1;

  await supabase
    .from("dairy")
    .update({ favorites: newFavorites })
    .eq("email", email);

  await supabase.from("dairy").update({ likes: likesDiary }).eq("id", id);

  revalidatePath(red);
}
