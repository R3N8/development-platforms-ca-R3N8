// src/pages/CreatePost.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabaseClient } from "../supabaseClient";
import { useAlert } from "../hooks/useAlert";
import type { User } from "@supabase/supabase-js";

export default function CreatePost() {
  // Form state
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("");

  // Auth state
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const { showAlert } = useAlert();
  const navigate = useNavigate();

  // Check auth when page loads
  useEffect(() => {
    supabaseClient.auth.getSession().then(({ data }) => {
      if (!data.session) {
        navigate("/login"); // redirect if not logged in
      } else {
        setUser(data.session.user);
      }
    });
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      showAlert("error", "You must be logged in to create a post.");
      return;
    }

    setLoading(true);

    const { error } = await supabaseClient.from("articles").insert({
      title,
      body,
      category,
      user_id: user.id, // make sure your table has this column
    });

    if (error) {
      showAlert("error", `Error creating post: ${error.message}`);
    } else {
      showAlert("success", "Post created successfully!");
      // reset form
      setTitle("");
      setBody("");
      setCategory("");
      navigate("/"); // redirect home
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 min-h-screen bg-indigo-100 px-4 md:px-0">
      <h2 className="font-bold text-4xl">Create a New Post</h2>

      <form
        className="w-full max-w-xl flex flex-col gap-4 bg-white p-6 rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Enter your post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="p-2 bg-indigo-50 rounded-md"
        />

        <input
          type="text"
          placeholder="Enter tags (programming, joke, etc.)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="p-2 bg-indigo-50 rounded-md"
        />

        <textarea
          placeholder="Write your new post here..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
          className="p-2 bg-indigo-50 rounded-md h-40 resize-none"
        />

        <button
          type="submit"
          disabled={loading}
          className={`p-2 bg-indigo-500 tracking-wider text-zinc-50 font-semibold rounded-md hover:bg-indigo-600 cursor-pointer ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Creating..." : "Create Post"}
        </button>
      </form>
    </div>
  );
}
