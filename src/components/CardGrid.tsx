import React from "react";
import type { Post } from "../types";


const getImageUrl = (id: number) =>
    `https://picsum.photos/seed/post${id}/400/220`;

export const CardGrid: React.FC<{
    posts: Post[];
    onDelete: (id: number) => void;
}> = ({ posts, onDelete }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {posts.map((p) => (
                <div
                    key={p.id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden relative flex flex-col transition-transform hover:-translate-y-1 hover:shadow-2xl"
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
                        className="w-full h-44 object-cover"
                        loading="lazy"
                    />
                    <div className="flex-1 flex flex-col p-5">
                        <h3 className="font-bold text-xl mb-2 line-clamp-2 text-gray-900">
                            {p.title}
                        </h3>
                        <p className="text-base text-gray-700 line-clamp-3 mb-4">
                            {p.body}
                        </p>
                        <div className="mt-auto flex items-center justify-between">
                            <span className="text-xs text-gray-400">
                                {/* Ideally, use real date if available */}
                                Mon, 21 Dec 2020 14:57 GMT
                            </span>
                            
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
