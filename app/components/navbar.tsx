"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import NavbarIndex from "./navbarindex";
import UserNavbar from "./usernavbar";


export default async function Navbar({}) {
    
        return (
           <UserNavbar />
        )   

}