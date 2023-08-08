'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const router = useRouter()

  // Create a Supabase client configured to use cookies
  const supabase = createClientComponentClient()

  const signOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  return (
    <button
    className="text-xs px-3 py-2 uppercase flex items-center font-bold leading-snug text-white hover:opacity-75"
    onClick={signOut}
  ><span className="ml-2">Logout </span>
    
  </button>
  )
}
