import React from "react";

export const Pagination: React.FC<{
    total: number;
    perPage: number;
    current: number;
    onPageChange: (n: number) => void;
}> = ({ total, perPage, current, onPageChange }) => {
    const pages = Math.max(1, Math.ceil(total / perPage));

    
    const getPageNumbers = () => {
        const windowSize = 2; 
        let start = Math.max(1, current - windowSize);
        let end = Math.min(pages, current + windowSize);

       
        if (end - start < windowSize * 2) {
            if (start === 1) {
                end = Math.min(pages, start + windowSize * 2);
            } else if (end === pages) {
                start = Math.max(1, end - windowSize * 2);
            }
        }

        const arr = [];
        for (let i = start; i <= end; i++) {
            arr.push(i);
        }
        return arr;
    };

    const pageNumbers = getPageNumbers();

    return (
        <nav
            className="flex items-center justify-center gap-2 mt-8"
            aria-label="Pagination"
        >
            <button
                onClick={() => onPageChange(current - 1)}
                className="px-3 py-1 rounded bg-white shadow disabled:opacity-50"
                disabled={current === 1}
                aria-label="Previous page"
            >
                ‹
            </button>
            {pageNumbers[0] > 1 && (
                <>
                    <button
                        onClick={() => onPageChange(1)}
                        className={`w-8 h-8 rounded-full ${
                            current === 1
                                ? "bg-gray-800 text-white"
                                : "bg-white shadow"
                        }`}
                        aria-label="Page 1"
                    >
                        1
                    </button>
                    {pageNumbers[0] > 2 && (
                        <span className="px-1 text-gray-400 select-none">…</span>
                    )}
                </>
            )}
            {pageNumbers.map((p) => (
                <button
                    key={p}
                    onClick={() => onPageChange(p)}
                    className={`w-8 h-8 rounded-full transition ${
                        p === current
                            ? "bg-gray-800 text-white"
                            : "bg-white shadow hover:bg-gray-100"
                    }`}
                    aria-current={p === current ? "page" : undefined}
                    aria-label={`Page ${p}`}
                >
                    {p}
                </button>
            ))}
            {pageNumbers[pageNumbers.length - 1] < pages && (
                <>
                    {pageNumbers[pageNumbers.length - 1] < pages - 1 && (
                        <span className="px-1 text-gray-400 select-none">…</span>
                    )}
                    <button
                        onClick={() => onPageChange(pages)}
                        className={`w-8 h-8 rounded-full ${
                            current === pages
                                ? "bg-gray-800 text-white"
                                : "bg-white shadow"
                        }`}
                        aria-label={`Page ${pages}`}
                    >
                        {pages}
                    </button>
                </>
            )}
            <button
                onClick={() => onPageChange(current + 1)}
                className="px-3 py-1 rounded bg-white shadow disabled:opacity-50"
                disabled={current === pages}
                aria-label="Next page"
            >
                ›
            </button>
        </nav>
    );
};
