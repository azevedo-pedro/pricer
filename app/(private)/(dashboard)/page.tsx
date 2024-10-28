"use client";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-[#D0D0D0] w-full h-[60px] flex items-center px-5">
        <Button>+ Cotação</Button>
        <Button variant="secondary" className="mx-5">
          <Trash />
          Excluir
        </Button>
      </div>
    </div>
  );
}
