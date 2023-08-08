import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest, res: NextResponse) {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || "",
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
    );
    const business_id = await req.json(); 
    try {
        const { data, error } = await supabase
            .from("businesses")
            .select("name")
            .eq("place_id", business_id);

        return NextResponse.json(data);
        

    }
    catch (error) {
        
    }
    
}
