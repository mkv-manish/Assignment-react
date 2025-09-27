import React, { useReducer, createContext, useContext } from "react";
import type {Post,  ViewMode } from "../types";

type State = { posts: Post[]; viewMode: ViewMode };

type Action =
    | { type: "SET_POSTS"; posts: Post[] }
    | { type: "DELETE_POST"; id: number }
    | { type: "TOGGLE_VIEW" };

const PostsContext = createContext<
    { state: State; dispatch: React.Dispatch<Action> } | undefined
>(undefined);

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case "SET_POSTS":
            return { ...state, posts: action.posts };
        case "DELETE_POST":
            return {
                ...state,
                posts: state.posts.filter((p) => p.id !== action.id),
            };
        case "TOGGLE_VIEW":
            return {
                ...state,
                viewMode: state.viewMode === "grid" ? "list" : "grid",
            };
        default:
            return state;
    }
}

export const PostsProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [state, dispatch] = useReducer(reducer, {
        posts: [],
        viewMode: "grid",
    });
    return (
        <PostsContext.Provider value={{ state, dispatch }}>
            {children}
        </PostsContext.Provider>
    );
};

export function usePosts() {
    const ctx = useContext(PostsContext);
    if (!ctx) throw new Error("usePosts must be used inside PostsProvider");
    return ctx;
}
