import { useEffect, useState } from "react";
import { supabaseClient } from "../supabaseClient";
import ArticleCard from "../components/Card";
import type { Article } from "../types/index.ts";

export default function Home() {
    // State to hold articles, loading status, and error message
    const [articles, setArticles] = useState<Article[]>([])
    const [error, setError] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        // Function to fetch articles
        const fetchArticles = async () => {

        // Fetch articles ordered by creation date descending
        setLoading(true)

        // reset error state
        setError('')

        // Fetch articles ordered by creation date descending
        const { data, error } = await supabaseClient
            .from('articles')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) {
            // if Supabase returns an error, set the error state
            setError(error.message)
        } else {
            // otherwise, update the articles state with fetched data
            setArticles(data ?? [])
        }

        // finally, set loading to false
        setLoading(false)
        }

        // Call the fetchArticles function
        fetchArticles()
    }, [])

    return (
        <section className="max-w-full mx-auto p-2 md:p-4 min-h-screen bg-indigo-100">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold mb-4">Articles: </h1>
            </div>

            {/* Article grid container */}
            <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4 xxl:grid-cols-4 lg:gap-6">
                {/* Display loading message */}
                {loading && (
                    <p className="text-gray-500">Loading articles...</p>
                )}

                {/* Display error message if any */}
                {error && (
                    <p className="text-red-500 mb-4">{error}</p>
                )}

                {/* Display message if no articles are found */}
                {!loading && !error && articles.length === 0 && (
                    <p className="text-gray-500">No articles yet.</p>
                )}

                {/* Render ArticleCard components for each article */}
                {!loading && !error && articles.map(article => (
                    <ArticleCard key={article.id} article={article} />
                ))}
            </div>
        </section>
    )
}
