"use client";
import { useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import NavbarNotLoggedIn from "./navbarnotlogged";

export default function ClientComponent() {
  return (
    <NavbarNotLoggedIn />
  )
}
