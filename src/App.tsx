import React, { useEffect, useState } from "react";
import { PostsProvider, usePosts } from "./context/PostsContext";
import { LoadingScreen } from "./components/LoadingScreen";
import { Sidebar } from "./components/Sidebar";
import { CardGrid } from "./components/CardGrid";
import { CardList } from "./components/CardList";
import { Pagination } from "./components/Pagination";
import { FeedbackModal } from "./components/FeedbackModal";
import type { Post } from "./types"; 

const PER_PAGE = 6;

const AppContent: React.FC = () => {
    const { state, dispatch } = usePosts();
    const [currentPage, setCurrentPage] = useState(1);
    const [showFeedback, setShowFeedback] = useState(false);

    const total = state.posts.length;
    const pages = Math.max(1, Math.ceil(total / PER_PAGE));

    useEffect(() => {
        if (currentPage > pages) setCurrentPage(pages);
    }, [total, pages, currentPage]);

    function onDelete(id: number) {
        dispatch({ type: "DELETE_POST", id });
        const afterTotal = total - 1;
        const lastPageAfter = Math.max(1, Math.ceil(afterTotal / PER_PAGE));
        if (currentPage > lastPageAfter) setCurrentPage(lastPageAfter);
    }

    const start = (currentPage - 1) * PER_PAGE;
    const viewPosts = state.posts.slice(start, start + PER_PAGE);

    return (
        <div className="min-h-screen bg-slate-100 flex">
            <Sidebar
                viewMode={state.viewMode}
                onToggle={() => dispatch({ type: "TOGGLE_VIEW" })}
                onOpenFeedback={() => setShowFeedback(true)}
            />
            <main className="flex-1 p-8">
                <div className="max-w-6xl mx-auto">
                    {state.viewMode === "grid" ? (
                        <CardGrid posts={viewPosts} onDelete={onDelete} />
                    ) : (
                        <CardList posts={viewPosts} onDelete={onDelete} />
                    )}

                    <Pagination
                        total={total}
                        perPage={PER_PAGE}
                        current={currentPage}
                        onPageChange={setCurrentPage}
                    />
                </div>
            </main>

            <FeedbackModal
                open={showFeedback}
                onClose={() => setShowFeedback(false)}
            />
        </div>
    );
};

export default function WrappedApp() {
    return (
        <PostsProvider>
            <AppLoader />
        </PostsProvider>
    );
}

function AppLoader() {
    const [loading, setLoading] = useState(true);
    const { dispatch } = usePosts();

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 5000);
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then((r) => r.json())
            .then((data: Post[]) =>
                dispatch({ type: "SET_POSTS", posts: data })
            )
            .catch(console.error);
        return () => clearTimeout(timer);
    }, [dispatch]);

    if (loading) return <LoadingScreen />;
    return <AppContent />;
}
