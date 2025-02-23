'use client'
import Link from "next/link";

const Navbar = () => {
    
    const token = localStorage.getItem("access")
    
    return (
        <nav className="flex w-[90%] justify-between mx-auto my-3">
            <h1 className="font-bold text-3xl"><Link href="/">Creatathon</Link></h1>
            <ul className="flex font-semibold gap-3 items-center">               
                <li><Link href="/dashboard">Dashboard</Link></li>
                <li><Link href="/leaderboard">Leaderboard</Link></li>
                {!token && (
                    <>
                    <li><Link href="/auth/login">Login</Link></li>
                    <li><Link href="/auth/register">Register</Link></li>
                    </>
                )}
                
            </ul>
        </nav>
    )
}

export default Navbar;