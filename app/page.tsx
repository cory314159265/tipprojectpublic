import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from 'next/navigation';
import { cookies } from "next/headers";
import Link from "next/link";

import { ParsedUrlQuery } from "querystring";


export const dynamic = "force-dynamic";

interface Props {
  searchParams: ParsedUrlQuery;
}

export default async function Index({ searchParams }: Props) {
  const supabase = createServerComponentClient({ cookies });
 
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    redirect("/dashboard");
  
  }
  
  return (
    <div>
      {user ? (
        <div className="flex items-center gap-4">
          Hey, {user.email}!

        </div>
      ) : (
        <Link
          href="/login"
          className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
        >
          Login
        </Link>
      )}
      {searchParams.redirected ? <h1>Redirected</h1> : <h1>Not Redirected</h1>}
    </div>
  );
}
