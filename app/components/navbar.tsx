import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import NavbarIndex from "./navbarindex";
import UserNavbar from "./usernavbar";


export default async function Navbar({}) {
    const supabase = createClientComponentClient();
    const loggedIn = await supabase.auth.getSession()
    
    if (loggedIn) {
        return (
           <UserNavbar />
        )    }
    else { return <NavbarIndex /> }

}