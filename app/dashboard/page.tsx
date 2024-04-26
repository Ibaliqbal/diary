import CreateDiaryForm from "@/components/auth/CreateDiaryForm";
import DashboardLayout from "@/components/global/DashboardLayout";
import React from "react";

export default function page() {
  return (
    <DashboardLayout>
      <CreateDiaryForm edit={false} />
    </DashboardLayout>
  );
}
