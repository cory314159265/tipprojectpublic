import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest, res: NextResponse) {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || "",
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
    );
    const user_id = await req.json(); // Get user_id from client query string
    console.log('line 10 getJobs APi', user_id);
    try {
        const { data, error } = await supabase
            .from("jobs_table")
            .select("*")
            .eq("user_id", user_id);

        console.log(data);
        return NextResponse.json(data);
        

    }
    catch (error) {
        console.log(error);
    }
    
}


