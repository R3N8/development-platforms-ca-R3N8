import { useEffect, useState } from "react";
import { supabaseClient } from "../supabaseClient";
import ArticleCard from "../components/Card";
import type { Article } from "../types";
import { useAlert } from "../hooks/useAlert";

export default function Home() {
    // State to hold articles, loading status, and error message
    const [articles, setArticles] = useState<Article[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    const { showAlert } = useAlert()

    useEffect(() => {
        // Function to fetch articles
        const fetchArticles = async () => {

        // Fetch articles ordered by creation date descending
        setLoading(true)

        // Fetch articles ordered by creation date descending
        const { data, error } = await supabaseClient
            .from('articles')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) {
            // if Supabase returns an error, set the error state
            showAlert('error', `Error fetching articles: ${error.message}`)
        } else {
            // otherwise, update the articles state with fetched data
            setArticles(data ?? [])
        }

        // finally, set loading to false
        setLoading(false)
        }

        // Call the fetchArticles function
        fetchArticles()
    }, [showAlert]);

    return (
        <section className="max-w-full mx-auto p-2 md:p-4 min-h-screen bg-indigo-100">
            {/* Article grid container */}
            <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4 xxl:grid-cols-4 lg:gap-6">
                {/* Display loading message */}
                {loading && (
                    <p className="text-gray-500">Loading articles...</p>
                )}

                {/* Render ArticleCard components for each article */}
                {articles.map(article => (
                    <ArticleCard key={article.id} article={article} />
                ))}
            </div>
        </section>
    )
}
