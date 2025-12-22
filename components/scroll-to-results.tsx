"use client";

import { Button } from "@/components/ui/button";

export function ScrollToResults() {
  function go() {
    const el = document.getElementById("resultados");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="flex justify-center">
      <Button type="button" onClick={go} variant="outline">
        Ver resultados
      </Button>
    </div>
  );
}
