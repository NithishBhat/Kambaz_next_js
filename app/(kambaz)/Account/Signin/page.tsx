import Link from "next/link";
export default function Signin() {
 return (
   <div>
        <h3>Sign in</h3>
        <input placeholder="username"  className="mb-2" /> 
        <input placeholder="password" type="password" className="mb-2"/>

        <Link href="/Dashboard" className="btn btn-primary w-100 mb-2"> Sign in </Link> 
        <Link href="Signup"> Sign up </Link>
   </div>
   
);}
