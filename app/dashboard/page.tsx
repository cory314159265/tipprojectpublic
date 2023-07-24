"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";


export default function ClientComponent() {
  const [session, setSession] = useState<any>(null);
  const supabase = createClientComponentClient();
  
  
  
  useEffect(() => {
    
    const getuserdata = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();
        console.log(data, error);
        setSession(data.user);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    getuserdata();
  }, []);

  return (
    <div className="mt-10 flex-1 flex flex-col w-full px-8 sm:max-w-md gap-2">
      <h1>Dashboard</h1>
    
      <h3>{JSON.stringify(session)}</h3>
    </div>
  );
}
