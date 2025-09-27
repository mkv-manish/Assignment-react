import React, { useEffect, useState, useRef } from "react";
import { isEmail, isPhone } from "../utils/validators";

export const FeedbackModal: React.FC<{
    open: boolean;
    onClose: () => void;
}> = ({ open, onClose }) => {
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [country, setCountry] = useState("");
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submitted, setSubmitted] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open) {
            
            setFirst("");
            setLast("");
            setEmail("");
            setPhone("");
            setAddress("");
            setCountry("");
            setErrors({});
            setSubmitted(false);
        }
    }, [open]);

    
    useEffect(() => {
        if (!open) return;
        const focusable = modalRef.current?.querySelectorAll<HTMLElement>(
            'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );
        focusable?.[0]?.focus();
        function handleKey(e: KeyboardEvent) {
            if (e.key === "Escape") {
                onClose();
            }
            if (e.key === "Tab" && focusable && focusable.length > 0) {
                const first = focusable[0];
                const last = focusable[focusable.length - 1];
                if (e.shiftKey) {
                    if (document.activeElement === first) {
                        e.preventDefault();
                        last.focus();
                    }
                } else {
                    if (document.activeElement === last) {
                        e.preventDefault();
                        first.focus();
                    }
                }
            }
        }
        document.addEventListener("keydown", handleKey);
        return () => document.removeEventListener("keydown", handleKey);
    }, [open, onClose]);

    function validate() {
        const e: Record<string, string> = {};
        if (!first.trim()) e.first = "First name is required";
        if (!last.trim()) e.last = "Last name is required";
        if (!isEmail(email)) e.email = "A valid email is required";
        if (!isPhone(phone))
            e.phone = "A valid phone is required (digits, optional +)";
        if (!address.trim()) e.address = "Address is required";
        if (!country.trim()) e.country = "Country is required";
        setErrors(e);
        return Object.keys(e).length === 0;
    }

    function onSubmit(evt?: React.FormEvent) {
        evt?.preventDefault();
        if (!validate()) return;
        setSubmitted(true);
        setTimeout(() => {
            onClose();
        }, 1200);
    }

    if (!open) return null;
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-colors duration-200">
            <div
                ref={modalRef}
                className="relative bg-white w-full max-w-lg rounded-2xl p-8 shadow-2xl animate-fadeIn"
                style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.18)" }}
                role="dialog"
                aria-modal="true"
                aria-labelledby="feedback-modal-title"
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 focus:outline-none focus:ring-1 focus:ring-green-500 rounded-full p-1 transition"
                    aria-label="Close feedback form"
                    tabIndex={0}
                >
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 6l12 12M6 18L18 6" />
                    </svg>
                </button>
                <div className="flex flex-col items-center mb-6">
                    <div className="bg-green-100 rounded-full p-3 mb-2">
                        <svg width="32" height="32" fill="none" stroke="green" strokeWidth="2">
                            <circle cx="16" cy="16" r="15" stroke="green" />
                            <path d="M10 16l4 4 6-8" stroke="green" strokeWidth="2" fill="none" />
                        </svg>
                    </div>
                    <h2 id="feedback-modal-title" className="text-2xl font-bold text-gray-800">
                        Feedback
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">
                        We value your feedback. Please fill out the form below.
                    </p>
                </div>
                {submitted ? (
                    <div className="flex flex-col items-center py-12">
                        <svg width="48" height="48" fill="none" stroke="green" strokeWidth="2" className="mb-4">
                            <circle cx="24" cy="24" r="22" stroke="green" />
                            <path d="M15 25l6 6 12-14" stroke="green" strokeWidth="2" fill="none" />
                        </svg>
                        <div className="text-lg font-semibold text-green-700 mb-2">Thank you!</div>
                        <div className="text-gray-600 text-sm text-center">
                            Your feedback has been submitted successfully.
                        </div>
                    </div>
                ) : (
                    <form onSubmit={onSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    First Name
                                </label>
                                <input
                                    value={first}
                                    onChange={(e) => setFirst(e.target.value)}
                                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 transition ${
                                        errors.first ? "border-red-400" : "border-gray-300"
                                    }`}
                                    placeholder="John"
                                    autoFocus
                                />
                                {errors.first && (
                                    <div className="text-red-500 text-xs mt-1">
                                        {errors.first}
                                    </div>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Last Name
                                </label>
                                <input
                                    value={last}
                                    onChange={(e) => setLast(e.target.value)}
                                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 transition ${
                                        errors.last ? "border-red-400" : "border-gray-300"
                                    }`}
                                    placeholder="Doe"
                                />
                                {errors.last && (
                                    <div className="text-red-500 text-xs mt-1">
                                        {errors.last}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>
                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 transition ${
                                        errors.email ? "border-red-400" : "border-gray-300"
                                    }`}
                                    placeholder="example@sample.com"
                                    type="email"
                                />
                                {errors.email && (
                                    <div className="text-red-500 text-xs mt-1">
                                        {errors.email}
                                    </div>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Phone
                                </label>
                                <input
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 transition ${
                                        errors.phone ? "border-red-400" : "border-gray-300"
                                    }`}
                                    placeholder="+911234567890"
                                    type="tel"
                                />
                                {errors.phone && (
                                    <div className="text-red-500 text-xs mt-1">
                                        {errors.phone}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Address
                            </label>
                            <textarea
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 transition ${
                                    errors.address ? "border-red-400" : "border-gray-300"
                                }`}
                                rows={3}
                                placeholder="123 Main St, City"
                            />
                            {errors.address && (
                                <div className="text-red-500 text-xs mt-1">
                                    {errors.address}
                                </div>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Country
                            </label>
                            <input
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 transition ${
                                    errors.country ? "border-red-400" : "border-gray-300"
                                }`}
                                placeholder="Country"
                            />
                            {errors.country && (
                                <div className="text-red-500 text-xs mt-1">
                                    {errors.country}
                                </div>
                            )}
                        </div>
                        <div className="flex justify-end gap-3 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-5 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 hover:bg-gray-100 transition focus:outline-none focus:ring-1 focus:ring-green-500"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-5 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-semibold shadow hover:from-green-600 hover:to-green-700 transition focus:outline-none focus:ring-1 focus:ring-green-500"
                            >
                                Submit Feedback
                            </button>
                        </div>
                    </form>
                )}
            </div>
            <style>
                {`
                .animate-fadeIn {
                    animation: fadeInModal 0.25s cubic-bezier(.4,0,.2,1);
                }
                @keyframes fadeInModal {
                    from { opacity: 0; transform: translateY(40px) scale(0.98);}
                    to { opacity: 1; transform: translateY(0) scale(1);}
                }
                `}
            </style>
        </div>
    );
};
