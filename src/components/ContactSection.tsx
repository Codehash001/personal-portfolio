"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Volume2, VolumeX } from "lucide-react";

export default function ContactSection() {
    const [messages, setMessages] = useState<{ role: "user" | "model"; text: string }[]>([
        { role: "model", text: "Hello! I am Karen, Hashintha's personal AI Assistant. How can I assist you today?" }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const synth = typeof window !== "undefined" ? window.speechSynthesis : null;

    const quickQuestions = [
        "What are your rates?",
        "Do you build AI agents?",
        "Can you do blockchain?",
        "How do I contact you?"
    ];

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

    const handleSendMessage = async (textOverride?: string) => {
        const textToSend = textOverride || input.trim();
        if (!textToSend || isLoading) return;

        setInput("");
        setIsLoading(true);

        const newMessages = [...messages, { role: "user" as const, text: textToSend }];
        setMessages(newMessages);

        try {
            // Filter out the initial static greeting (which is role: model) to satisfy Gemini API requirements
            // Also, typically 'history' for startChat should not include the *current* message we are about to send.
            // But let's just fix the "First content user" error first.
            const history = newMessages
                .filter((_, index) => index !== 0) // Remove the first hardcoded greeting
                .map((m) => ({
                    role: m.role,
                    parts: [{ text: m.text }],
                }));

            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: textToSend, history }),
            });

            const data = await res.json();
            const responseText = data.response || "I'm having trouble connecting right now.";

            setMessages(prev => [...prev, { role: "model", text: responseText }]);

            // Play Native Gemini Audio
            if (data.audioData) {
                // Determine MIME type (usually defaults to audio/wav or audio/mp3 from Gemini)
                // Gemini API typically returns base64.
                const audioSrc = `data:audio/wav;base64,${data.audioData}`;
                const audio = new Audio(audioSrc);

                audio.onplay = () => setIsSpeaking(true);
                audio.onended = () => setIsSpeaking(false);
                audio.onerror = () => setIsSpeaking(false);

                audio.play();
            } else {
                // Fallback if no audio (though we requested it)
                // speak(responseText); // Optional: keep fallback or just be silent
            }

        } catch {
            const errorText = "Network error. Please try again.";
            setMessages(prev => [...prev, { role: "model", text: errorText }]);
            // speak(errorText);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center py-20 px-4 overflow-hidden">

            {/* Background Ambience */}
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/10 via-black to-blue-900/10" />

            {/* Main Container */}
            <div className="relative z-10 w-full max-w-4xl flex flex-col items-center gap-8">

                {/* Karen Orb (Custom CSS) - Reduced Scale */}
                <div className="relative group scale-100 mb-4 transition-transform duration-500">
                    <div className={`orb-container ${isSpeaking ? "animate-pulse" : ""}`}>
                        <div className="orb">
                            <div className="orb-inner"></div>
                            <div className="orb-inner"></div>
                        </div>
                    </div>

                    {isSpeaking && (
                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-1 h-6">
                            {[...Array(5)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    animate={{
                                        height: [4, 16, 4],
                                        backgroundColor: "#a855f7"
                                    }}
                                    transition={{
                                        duration: 0.5,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: i * 0.1
                                    }}
                                    className="w-1 rounded-full bg-purple-500"
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Text Output Area OR Intro */}
                <div className="text-center space-y-4 min-h-[160px] flex flex-col justify-center max-w-2xl px-4">
                    <AnimatePresence mode="wait">
                        {messages.length <= 1 ? (
                            <motion.div
                                key="intro"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="space-y-2"
                            >
                                <h3 className="text-2xl font-light text-neutral-400">Hello!</h3>
                                <p className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-neutral-200 to-neutral-500 leading-tight">
                                    I am Karen, Hashintha&apos;s personal AI Assistant. How can I assist you today?
                                </p>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="qa"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="space-y-4"
                            >
                                {/* User Question */}
                                <p className="text-lg md:text-xl text-neutral-500 font-medium">
                                    &quot;{messages[messages.length - 2]?.text}&quot;
                                </p>

                                {/* AI Answer */}
                                <p className="text-2xl md:text-4xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-blue-300 leading-relaxed shadow-lg">
                                    {isLoading ? (
                                        <span className="animate-pulse">Thinking...</span>
                                    ) : (
                                        messages[messages.length - 1]?.text
                                    )}
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Quick Questions - Wider & Centered */}
                <div className="w-full">
                    <div className="flex items-center justify-center gap-3 overflow-x-auto pb-4 pt-2 px-4 scrollbar-hide mask-image-horizontal flex-wrap md:flex-nowrap">
                        {quickQuestions.map((q) => (
                            <button
                                key={q}
                                onClick={() => handleSendMessage(q)}
                                className="flex-shrink-0 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-xs md:text-sm whitespace-nowrap hover:bg-white/10 hover:border-purple-500/30 transition-all text-neutral-300 active:scale-95"
                            >
                                {q}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Input Bar */}
                <div className="w-full max-w-2xl relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full opacity-20 group-focus-within:opacity-100 transition-opacity duration-500 blur" />
                    <div className="relative flex items-center bg-black rounded-full px-2 py-2 border border-white/10">

                        {/* Mute Toggle */}
                        <button
                            onClick={() => {
                                setIsMuted(!isMuted);
                                if (!isMuted && synth) synth.cancel();
                            }}
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isMuted ? "bg-red-500/10 text-red-400" : "hover:bg-white/10 text-neutral-400"
                                }`}
                            title={isMuted ? "Unmute Voice" : "Mute Voice"}
                        >
                            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                        </button>

                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                            placeholder="Ask Karen..."
                            className="flex-1 bg-transparent border-none focus:outline-none text-white px-4 placeholder-neutral-600 text-sm md:text-base"
                        />

                        <button
                            onClick={() => handleSendMessage()}
                            disabled={!input.trim() || isLoading}
                            className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </div>
                </div>

            </div>
        </section>
    );
}
