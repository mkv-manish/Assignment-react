import React from "react";
import type { ViewMode } from "../types";

export const Sidebar: React.FC<{
    viewMode: ViewMode;
    onToggle: (mode: ViewMode) => void;
    onOpenFeedback: () => void;
}> = ({ viewMode, onToggle, onOpenFeedback }) => {
    
    const userPhoto = "https://randomuser.me/api/portraits/men/32.jpg";

    return (
        <aside className="w-80 max-w-full p-8 bg-gradient-to-b from-emerald-50 to-white min-h-screen flex flex-col gap-8 shadow-lg">
            {/* User Card */}
            <div className="bg-white rounded-2xl shadow-md p-6 flex items-center gap-4 hover:shadow-xl transition-shadow">
                <div className="relative">
                    <img
                        src={userPhoto}
                        alt="User"
                        className="w-14 h-14 rounded-full object-cover bg-gray-200 border-2 border-emerald-200 shadow"
                        loading="lazy"
                    />
                    <span className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-400 border-2 border-white rounded-full"></span>
                </div>
                <div>
                    <div className="font-extrabold text-lg text-gray-900">Hi Reader,</div>
                    <div className="text-sm text-gray-500 mt-1">
                        Here&#39;s your <span className="text-emerald-600 font-semibold">News!</span>
                    </div>
                </div>
            </div>

            {/* View Toggle */}
            <div className="bg-white rounded-2xl shadow-md p-6">
                <div className="font-bold text-xl mb-4 text-gray-800 flex items-center gap-2">
                    <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
                    </svg>
                    View Toggle
                </div>
                <div className="flex flex-row sm:flex-row items-center gap-2 bg-gray-100 p-2 rounded-xl w-full">
                    <button
                        onClick={() => onToggle("list")}
                        className={`flex-1 min-w-0 px-2 py-2 sm:py-3 rounded-xl flex items-center justify-center gap-2 font-semibold transition-all duration-150
                            ${
                                viewMode === "list"
                                    ? "bg-emerald-500 text-white shadow-lg scale-105"
                                    : "bg-white text-gray-700 hover:bg-gray-200"
                            }
                        `}
                        aria-pressed={viewMode === "list"}
                        title="Switch to List View"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <rect x="4" y="4" width="16" height="16" rx="2" strokeWidth="2" />
                            <line x1="4" y1="9" x2="20" y2="9" strokeWidth="2" />
                            <line x1="4" y1="15" x2="20" y2="15" strokeWidth="2" />
                        </svg>
                        <span className="hidden xs:inline sm:inline">List</span>
                    </button>
                    <button
                        onClick={() => onToggle("grid")}
                        className={`flex-1 min-w-0 px-2 py-2 sm:py-3 rounded-xl flex items-center justify-center gap-2 font-semibold transition-all duration-150
                            ${
                                viewMode === "grid"
                                    ? "bg-emerald-500 text-white shadow-lg scale-105"
                                    : "bg-white text-gray-700 hover:bg-gray-200"
                            }
                        `}
                        aria-pressed={viewMode === "grid"}
                        title="Switch to Grid View"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <rect x="4" y="4" width="7" height="7" rx="1.5" strokeWidth="2" />
                            <rect x="13" y="4" width="7" height="7" rx="1.5" strokeWidth="2" />
                            <rect x="4" y="13" width="7" height="7" rx="1.5" strokeWidth="2" />
                            <rect x="13" y="13" width="7" height="7" rx="1.5" strokeWidth="2" />
                        </svg>
                        <span className="hidden xs:inline sm:inline">Grid</span>
                    </button>
                </div>
            </div>

            {/* Feedback Card */}
            <div className="bg-gradient-to-r from-emerald-100 to-emerald-50 rounded-2xl shadow-md p-6 flex flex-col items-center">
                <div className="font-bold text-xl mb-3 text-gray-800 flex items-center gap-2">
                    <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeLinejoin="round"/>
                    </svg>
                    Have Feedback?
                </div>
                <button
                    onClick={onOpenFeedback}
                    className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 transition text-white rounded-xl font-semibold shadow-lg mt-2 flex items-center justify-center gap-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M8 10h.01M12 10h.01M16 10h.01M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeLinejoin="round"/>
                    </svg>
                    We&#39;re Listening!
                </button>
            </div>
        </aside>
    );
};
