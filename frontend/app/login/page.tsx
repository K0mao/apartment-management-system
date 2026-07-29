"use client";

import { useState } from "react";
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
export default function LoginPage(){

    const setToken = useAuthStore((state) => state.setToken)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()
    async function handleLogin() {
        try{
            const response = await authService.login({
                email,
                password,
            })
            setToken(response.accessToken)
            router.push("/dashboard");
            console.log("Login success")
        }catch (error){
        console.log(error)
        }
    }

    return(
        <div>
            <h1>Login</h1>
            <input 
                type="email" 
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input 
                type="password" 
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>
                Login
            </button>

        </div>
    )

}