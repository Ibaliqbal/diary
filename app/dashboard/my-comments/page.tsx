import Comments from "@/components/global/(dashboard)/Comments";
import DashboardLayout from "@/components/global/DashboardLayout";
import { getUserData } from "@/utils/clerk";
import { getUser, supabase } from "@/utils/supabase";
import React from "react";

export default async function page() {
  const user = await getUser();
  const { email } = await getUserData();
  const { data, error } = await supabase.from("dairy").select("comments");

  if (error) return <p>Reload...</p>;
  const filtered = data
    .filter((d) => d.comments !== null)
    .map((c) => c.comments?.filter((a: any) => a.email === email))
    .filter((c) => c.length > 0)
    .flatMap((arr) => arr);
  const comments = user?.filter((u) => u.my_comments !== null)[0]?.my_comments;
  return (
    <DashboardLayout>
      <Comments data={comments} />
    </DashboardLayout>
  );
}
