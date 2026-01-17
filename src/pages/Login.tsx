import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabaseClient } from "../supabaseClient";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleLognin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const { error } = await supabaseClient.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
        } else {
            navigate("/");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center gap-6 min-h-screen bg-indigo-100">
                <h2 className="font-bold text-4xl">Welcome back!</h2>
                <form className="w-2/3 h-full flex flex-col gap-4" onSubmit={handleLognin}>
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
            {error && <p className="error-message">{error}</p>}
        </div>
    )
}
