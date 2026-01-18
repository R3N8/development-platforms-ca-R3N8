import type { CreateNewProps } from "../types/index.ts";

// Card component to display article information
export default function ArticleCard({ article }: CreateNewProps) {
    return (
        <div className="relative flex flex-col h-full bg-indigo-50 leading-normal rounded-md p-4 shadow-md hover:scale-105 transition-transform">
            <p className="absolute top-2 right-2 px-2 py-1 rounded-full bg-indigo-200 text-xs font-bold text-indigo-900"># {article.category}</p>
            <h2 className="p-1.5 text-xl font-semibold text-zinc-900 line-clamp-1">{article.title}</h2>
            <p className="p-2 text-zinc-700 truncate">{article.body}</p>
            <p className="text-end p-2 text-sm font-semibold text-zinc-500">{new Date(article.created_at).toLocaleDateString()}</p>
        </div>
    )
}