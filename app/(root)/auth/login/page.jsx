"use client";  // Required for handling form submission in client components

import { useState } from "react";
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import { login } from "../api";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try{
            const response = await login(email, password)
            if(response){
                console.log("You are now logged in!")
            }

        } catch(error){
            console.log(error)
        }

        // Add API call to authenticate user
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleLogin} className="flex flex-col items-center transform -translate-y-1/2 gap-5">
                <h1 className="font-bold text-3xl">Login</h1>
                
                <TextField onChange={(e) => setEmail(e.target.value)} required label="Email" variant="standard" />
                <TextField onChange={(e) => setPassword(e.target.value)} required  label="Password" variant="standard" type="password"/>
                
                <Button variant="contained" type="submit">Login</Button>
            </form>
        </div>
    );
}
