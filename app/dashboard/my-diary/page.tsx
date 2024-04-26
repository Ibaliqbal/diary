import Card from "@/components/global/(diarys)/Card";
import DashboardLayout from "@/components/global/DashboardLayout";
import { getUserData } from "@/utils/clerk";
import { supabase } from "@/utils/supabase";
import React from "react";

export default async function page() {
  const { email } = await getUserData();
  const { data, error } = await supabase
    .from("dairy")
    .select()
    .order("created_at", { ascending: false })
    .eq("email", email);

  if (error) return <p>Reload...</p>;
  return (
    <DashboardLayout>
      <div className="grid md:grid-cols-3 col-span-3 gap-4 pb-24">
        {data.map((diary) => {
          return (
            <Card
              key={diary.id}
              avatar={diary.avatar}
              content={diary.content}
              username={diary.username}
              email={diary.email}
              created_at={diary.created_at}
              diary_id={diary.id}
              likes={diary.likes}
            />
          );
        })}
      </div>
    </DashboardLayout>
  );
}
