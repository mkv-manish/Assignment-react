import React from "react";
import type { Post } from "../types";

// Helper to get a placeholder image based on post id
const getImageUrl = (id: number) =>
    `https://picsum.photos/seed/post${id}/96/96`;

export const CardList: React.FC<{
    posts: Post[];
    onDelete: (id: number) => void;
}> = ({ posts, onDelete }) => {
    return (
        <div className="flex flex-col gap-5">
            {posts.map((p) => (
                <div
                    key={p.id}
                    className="bg-white rounded-xl shadow-lg p-5 flex items-start gap-5 relative transition-transform hover:-translate-y-1 hover:shadow-2xl"
                >
                    <button
                        onClick={() => onDelete(p.id)}
                        className="absolute top-3 right-3 text-red-500 bg-white rounded-full w-9 h-9 flex items-center justify-center shadow hover:bg-red-100 hover:text-red-700 z-10 transition"
                        title="Delete post"
                        aria-label="Delete post"
                    >
                        <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M6 6l8 8M14 6l-8 8"/>
                        </svg>
                    </button>
                    <img
                        src={getImageUrl(p.id)}
                        alt="Post visual"
                        className="w-16 h-16 rounded-lg object-cover flex-shrink-0 border border-gray-200"
                        loading="lazy"
                    />
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                            <h3 className="font-bold text-lg line-clamp-1 text-gray-900">
                                {p.title}
                            </h3>
                        </div>
                        <p className="text-sm text-gray-700 line-clamp-2 mb-2">
                            {p.body}
                        </p>
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-400">
                                Mon, 21 Dec 2020 14:57 GMT
                            </span>
                            
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
