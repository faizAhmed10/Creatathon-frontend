"use client";  // Required for handling form submission in client components

import { useState } from "react";
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import { login, register } from "../api";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        
        try{
            const response = await register(email,password)
            if (response){
                await login(email, password)
                console.log("Logged in")
            }
        } catch(error){
            alert("Registration failed")
        }
        
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleRegister} className="flex flex-col items-center transform -translate-y-1/2 gap-5">
                <h1 className="font-bold text-3xl">Register</h1>
                
                <TextField onChange={(e) => setEmail(e.target.value)} required label="Email" variant="standard" />
                <TextField type="password" onChange={(e) => setPassword(e.target.value)} required  label="Password" variant="standard" />
                
                <Button variant="contained" type="submit">Register</Button>
            </form>
        </div>
    );
}
