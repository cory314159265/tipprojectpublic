import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest, res: NextResponse) {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || "",
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
    );
    const user_id = await req.json();
     // Get user_id from client query string
    try {
        const { data, error } = await supabase
            .from("users_table")
            .select("user_id")
            .eq("id", user_id);
            
        return NextResponse.json(data);
        

    }
    catch (error) {
        
    }
    
}


