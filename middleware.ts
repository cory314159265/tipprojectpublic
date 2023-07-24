import { SupabaseClient, createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res: NextResponse = NextResponse.next();
  const protectedPaths: string[] = ["dashboard"];

  const supabase: SupabaseClient = createMiddlewareClient({ req, res });
  
  const { data, error } = await supabase.auth.getSession();
  for (let i = 0; i < protectedPaths.length; i++) {
    if (req.url.includes(protectedPaths[i])) {
      if (!data.session) {
        const redirectUrl = `http://localhost:3000/?redirected=true`;
        return NextResponse.redirect(redirectUrl);
      }
    }
  }
  await supabase.auth.getSession();
  return res;
}
