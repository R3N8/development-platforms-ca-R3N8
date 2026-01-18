import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabaseClient } from "../supabaseClient";
import { useAlert } from "../hooks/useAlert";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const { showAlert } = useAlert();
    const navigate = useNavigate();

    // Function to handle user login
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        // Sign in the user with Supabase
        const { error } = await supabaseClient.auth.signInWithPassword({
            email,
            password,
        });

        // Handle potential errors OR navigate on success
        if (error) {
            showAlert("error", error.message);
        } else {
            showAlert("success", "Login successful!");
            navigate("/");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center gap-6 min-h-screen bg-indigo-100">
                <h2 className="font-bold text-4xl">Welcome back!</h2>
                <form className="w-2/3 h-full flex flex-col gap-4" onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="example@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="p-2 bg-indigo-50 rounded-md"
                    />
                    <input
                        type="password"
                        placeholder="enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="p-2 bg-indigo-50 rounded-md"
                    />
                    <button className="p-2 bg-indigo-500 tracking-wider text-zinc-50 font-semibold rounded-md hover:bg-indigo-600 cursor-pointer" type="submit">Login</button>
                </form>
        </div>
    )
}
