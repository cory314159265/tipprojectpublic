"use client";

import DropdownMenu from "./components/dropdown";
import { useState } from "react";
import AddJob from "./components/addjob";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selection, setSelection] = useState<string>("Add Tip");
  return (
    <>
      <DropdownMenu setSelection={setSelection} />
      {selection === "Add Tip" && <h1>Add Tip</h1>}
      {selection === "Add Job" && <AddJob />}
      {children}
    </>
  );
}
