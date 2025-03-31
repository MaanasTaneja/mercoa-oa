import { useRouter } from 'next/router';
import { useState } from 'react';

export default function LoginForm(){
    const router = useRouter();
    const [ent_name, setEntName] = useState(""); //defuatlt is string
        //password is simply placehgolder since its a fakelogin what matters is the username (or entity name)
        const handleLogin = async (event) => {
        event.preventDefault(); // Prevent page reload
        //fetch the token from api and then route to dashboard page.
        const res = await fetch("/api/loginapi", {
            method : "POST",
            headers :{
                'Content-Type' : "application/json"
            },
            body : JSON.stringify({
                ent_name  //from our hook.
            })
        })

        const data = await res.json();
        const token = data.token;
        const entityId = data.entityId;

        //route to dashboard page (onboarding and then we can display their invoces and let them crate invoices.)
        if(token && entityId){
            router.push(`/onboard?token=${token}&entityId=${entityId}`);
        }
    }

    return (
        <div className = "font-whiterabbit p-40 m-10 text-black flex flex-col items-center">
            <h1 className = "text-xl pr-5 pl-5 pt-1 pb-1 bg-black font-bold text-white mb-4">Login</h1>
            <form onSubmit={handleLogin} className = "p-10 flex flex-col bg-black text-white shadow-2xl">
                <label htmlFor = "b_name" className = "mb-2">Business Name</label>
                <input id = "b_name" onChange = {(e) => setEntName(e.target.value)} type = "text" placeholder = "Business Name" className = "p-2 mb-4 border border-white" required />
                <label htmlFor ="password" className = "mb-2">Password</label> 
                <input id = "password" type = "password" placeholder = "Password" className = "p-2 mb-4 border border-white" required/>
                <div > <button type = "submit" className = "bg-white text-black pl-2 pr-2 pt-1 pb-1 hover:bg-gray-200">Login</button></div>
            </form>
        </div>
    )
}