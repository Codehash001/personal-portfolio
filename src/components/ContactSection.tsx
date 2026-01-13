"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Volume2, VolumeX, Loader2, Mic, MicOff, Github, Linkedin, Mail, Twitter } from "lucide-react";
import FlowingMenu from "./FlowingMenu";

// Web Speech API types
interface SpeechRecognitionEvent extends Event {
    results: SpeechRecognitionResultList;
}

interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    onresult: ((event: SpeechRecognitionEvent) => void) | null;
    onend: (() => void) | null;
    onerror: (() => void) | null;
    start: () => void;
    stop: () => void;
}

declare global {
    interface Window {
        SpeechRecognition: new () => SpeechRecognition;
        webkitSpeechRecognition: new () => SpeechRecognition;
    }
}

// Helper to create WAV header for PCM audio data
function createWavHeader(dataLength: number, sampleRate: number, channels: number, bitsPerSample: number): ArrayBuffer {
    const header = new ArrayBuffer(44);
    const view = new DataView(header);
    const byteRate = sampleRate * channels * (bitsPerSample / 8);
    const blockAlign = channels * (bitsPerSample / 8);

    // "RIFF" chunk
    view.setUint32(0, 0x52494646, false); // "RIFF"
    view.setUint32(4, 36 + dataLength, true); // File size - 8
    view.setUint32(8, 0x57415645, false); // "WAVE"

    // "fmt " sub-chunk
    view.setUint32(12, 0x666d7420, false); // "fmt "
    view.setUint32(16, 16, true); // Sub-chunk size (16 for PCM)
    view.setUint16(20, 1, true); // Audio format (1 = PCM)
    view.setUint16(22, channels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, byteRate, true);
    view.setUint16(32, blockAlign, true);
    view.setUint16(34, bitsPerSample, true);

    // "data" sub-chunk
    view.setUint32(36, 0x64617461, false); // "data"
    view.setUint32(40, dataLength, true);

    return header;
}

export default function ContactSection() {
    const [messages, setMessages] = useState<{ role: "user" | "model"; text: string }[]>([
        { role: "model", text: "Hello! I am Karen, Hashintha's personal AI Assistant. How can I assist you today?" }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const recognitionRef = useRef<SpeechRecognition | null>(null);

    const synth = typeof window !== "undefined" ? window.speechSynthesis : null;

    // Initialize speech recognition
    useEffect(() => {
        if (typeof window !== "undefined") {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (SpeechRecognition) {
                recognitionRef.current = new SpeechRecognition();
                recognitionRef.current.continuous = false;
                recognitionRef.current.interimResults = true;
                recognitionRef.current.lang = "en-US";

                recognitionRef.current.onresult = (event) => {
                    const transcript = Array.from(event.results)
                        .map(result => result[0].transcript)
                        .join("");
                    setInput(transcript);
                };

                recognitionRef.current.onend = () => setIsListening(false);
                recognitionRef.current.onerror = () => setIsListening(false);
            }
        }
    }, []);

    const toggleListening = () => {
        if (!recognitionRef.current) return;

        if (isListening) {
            recognitionRef.current.stop();
            setIsListening(false);
        } else {
            recognitionRef.current.start();
            setIsListening(true);
        }
    };

    const speak = (text: string) => {
        if (!synth || isMuted) return;
        synth.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1;
        utterance.pitch = 1;
        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);
        synth.speak(utterance);
    };

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
            if (data.audioData?.data) {
                try {
                    // Gemini returns PCM audio - convert to playable WAV
                    const pcmData = atob(data.audioData.data);
                    const pcmArray = new Uint8Array(pcmData.length);
                    for (let i = 0; i < pcmData.length; i++) {
                        pcmArray[i] = pcmData.charCodeAt(i);
                    }

                    // Create WAV header for PCM data (24kHz, 16-bit, mono)
                    const wavHeader = createWavHeader(pcmArray.length, 24000, 1, 16);
                    const wavBlob = new Blob([wavHeader, pcmArray], { type: 'audio/wav' });
                    const audioUrl = URL.createObjectURL(wavBlob);

                    const audio = new Audio(audioUrl);
                    audio.onplay = () => setIsSpeaking(true);
                    audio.onended = () => {
                        setIsSpeaking(false);
                        URL.revokeObjectURL(audioUrl);
                    };
                    audio.onerror = () => {
                        setIsSpeaking(false);
                        URL.revokeObjectURL(audioUrl);
                        speak(responseText);
                    };

                    await audio.play();
                } catch {
                    speak(responseText); // Fallback to browser TTS
                }
            } else {
                // Fallback to browser TTS if no audio data
                speak(responseText);
            }

        } catch {
            const errorText = "Network error. Please try again.";
            setMessages(prev => [...prev, { role: "model", text: errorText }]);
            speak(errorText);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section id="contact" className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center py-20 px-4">

            {/* Social Links Section */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative z-10 w-full max-w-4xl mb-32 px-4"
            >
                <div className="mb-16">
                    <h2 className="text-5xl md:text-8xl font-bold text-white leading-tight">
                        Let&apos;s
                    </h2>
                    <h2 className="text-5xl md:text-8xl font-bold text-neutral-600 italic leading-tight">
                        Connect.
                    </h2>
                </div>

                <FlowingMenu
                    items={[
                        { link: "https://github.com/Codehash001", text: "GitHub", icon: <Github /> },
                        { link: "https://linkedin.com/in/hashintha", text: "LinkedIn", icon: <Linkedin /> },
                        { link: "mailto:hashinthanishsanka@gmail.com", text: "Email", icon: <Mail /> },
                        { link: "https://x.com/hashintha", text: "X (Twitter)", icon: <Twitter /> },
                    ]}
                />
            </motion.div>

            {/* Background Ambience */}
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/10 via-black to-blue-900/10" />

            {/* Main Container - Fixed height layout */}
            <div className="relative z-10 w-full max-w-4xl flex flex-col items-center h-[90vh]">

                {/* Top section: Orb + Text (flexible) */}
                <div className="flex-1 flex flex-col items-center justify-center gap-6 w-full">
                    {/* Karen Orb (Custom CSS) - Reduced Scale */}
                    <div className="relative group scale-100 transition-transform duration-500">
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
                    <div className="text-center max-w-2xl px-4 w-full">
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
                                    className="space-y-3"
                                >
                                    {/* User Question - find last user message */}
                                    <p className="text-sm md:text-base text-neutral-500 font-medium">
                                        &quot;{[...messages].reverse().find(m => m.role === "user")?.text}&quot;
                                    </p>

                                    {/* AI Answer - find last model message (excluding initial) */}
                                    <p className="text-lg md:text-xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-blue-300 leading-relaxed">
                                        {isLoading ? (
                                            <span className="animate-pulse">Thinking...</span>
                                        ) : (
                                            [...messages].reverse().find(m => m.role === "model")?.text
                                        )}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Bottom section: Quick questions + Input (fixed position) */}
                <div className="w-full flex flex-col items-center gap-4 pb-4">
                    {/* Quick Questions */}
                    <div className="w-full">
                        <div className="flex items-center justify-center gap-3 overflow-x-auto pb-2 pt-2 px-4 scrollbar-hide flex-wrap md:flex-nowrap">
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

                            {/* Mic Button */}
                            <button
                                onClick={toggleListening}
                                disabled={isLoading}
                                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all mr-1${isListening
                                        ? "bg-red-500 text-white animate-pulse"
                                        : "hover:bg-white/10 text-neutral-400"
                                    }`}
                                title={isListening ? "Stop listening" : "Voice input"}
                            >
                                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                            </button>

                            <button
                                onClick={() => handleSendMessage()}
                                disabled={!input.trim() || isLoading}
                                className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <Send className="w-4 h-4" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

            </div>

        </section>
    );
}
