import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();

 
  const YOUR_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
  const apiUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(`${data.searchText} in ${data.zip}`)}&key=${YOUR_API_KEY}`;

  const response = await fetch(apiUrl);
  
  const json = await response.json();
 
  

  return NextResponse.json(json);
}
