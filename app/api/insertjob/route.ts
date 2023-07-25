import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
  );
  const reqData = await req.json();

  const { data, error } = await supabase
    .from("businesses")
    .upsert([reqData], { onConflict: "place_id" })
    .select();
  
  if (error) {
    return NextResponse.json(error, { status: error.status });
  }

  if (data && data.length > 0 && data[0].place_id) {
    return NextResponse.json(data[0].place_id);
  } else {
    return NextResponse.json(reqData.place_id);
  }
}