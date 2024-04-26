import React from "react";
import Card from "./Card";
import { supabase } from "@/utils/supabase";

const CardDiarys = async () => {
  const { data, error } = await supabase
    .from("dairy")
    .select()
    .order("created_at", {
      ascending: false,
    });

  if (error) return <p>Reload page...</p>;
  return (
    <div className="grid md:grid-cols-3 gap-4 pb-24">
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
  );
};

export default CardDiarys;
