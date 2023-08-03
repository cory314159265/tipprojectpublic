
import { PostgrestError } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
  );
  const reqData = await req.json();
 console.log(reqData);
  const { data, error } = await supabase
    .from("jobs_table")
    .insert([reqData])
    .select();
    console.log(data);
  if (error) {
    console.log(error);
    return NextResponse.json(error as PostgrestError);
  }

  if (data) {
    return NextResponse.json(data);
  } else {
    return NextResponse.json(reqData.place_id);
  }
}