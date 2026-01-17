import {  useState, useEffect } from 'react';  
import { useNavigate } from 'react-router-dom';
import { supabaseClient } from '../supabaseClient';
import type { User } from '@supabase/supabase-js';

export default function CreatePost() {
    // Form state
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [category, setCategory] = useState('');

    // Auth + error state
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    // Check auth when page loads
    useEffect(() => {
        supabaseClient.auth.getUser().then(({ data }) => {
            if (!data.user) {
                // If someone bypasses, Supabase will block them, but just in case, redirect to login
                navigate('/login');
            } else {
                setUser(data.user);
            }
        })
    }, [navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Ensure user is logged in
        if (!user) {
            setError('You must be logged in to create a post.');
            return;
        }

        // Insert new post into 'articles' table in Supabase
        const { error } = await supabaseClient.from('articles').insert({
            title,
            body,
            category,
            user_id: user.id,
        });

        // Handle any errors OR navigate back to home on success
        if (error) {
            setError(error.message);
        } else {
            navigate('/');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center gap-6 min-h-screen bg-indigo-100">
            <h2 className="font-bold text-4xl">Create a New Post</h2>
            <form className="w-2/3 h-full flex flex-col gap-4" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="enter your post title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="p-2 bg-indigo-50 rounded-md"
                />
                <input
                    type="text"
                    placeholder="enter tags (programming, joke, language, etc.)"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    className="p-2 bg-indigo-50 rounded-md"
                />
                <textarea
                    placeholder="write your new post here..."
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    required
                    className="p-2 bg-indigo-50 rounded-md h-40"
                />
                <button className="p-2 bg-indigo-500 tracking-wider text-zinc-50 font-semibold rounded-md hover:bg-indigo-600 cursor-pointer" type="submit">Create Post</button>
            </form>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
}