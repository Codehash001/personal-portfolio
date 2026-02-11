"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { motion } from "framer-motion";

// ── Types ──────────────────────────────────────────────────────────────────
interface GraphNode extends d3.SimulationNodeDatum {
    id: string;
    label: string;
    type: string;
    size: number;
    color?: string;
}

interface GraphLink {
    source: string;
    target: string;
    label?: string;
}

// ── Color Map ──────────────────────────────────────────────────────────────
const typeColors: Record<string, string> = {
    me: "#CCFF00",
    passion: "#FF5722",
    frontend: "#CCFF00",
    backend: "#00D4FF",
    ai: "#A855F7",
    devops: "#F59E0B",
    web3: "#EC4899",
};

const typeLabels: Record<string, string> = {
    me: "Me",
    passion: "Passions",
    frontend: "Frontend",
    backend: "Backend",
    ai: "AI & ML",
    devops: "DevOps",
    web3: "Web3",
};

// ── Node Icon URLs (using Simple Icons CDN + custom) ────────────────────────
const nodeIconUrls: Record<string, string> = {
    // Passions
    "p-ai": `data:image/svg+xml,${encodeURIComponent('<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" fill="#FF5722"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>ai-solid</title> <g id="Layer_2" data-name="Layer 2"> <g id="invisible_box" data-name="invisible box"> <rect width="48" height="48" fill="none"></rect> </g> <g id="Q3_icons" data-name="Q3 icons"> <g> <path d="M17.9,2h-.4L7.6,6.6a1,1,0,0,0-.6.9v7.4l-.6.5-4,3.3a.8.8,0,0,0-.4.8v9a.9.9,0,0,0,.4.8l4,3.3.6.5v7.4a1,1,0,0,0,.6.9l9.9,4.5h.4l.6-.2,4-2.7V25.5H21a1.5,1.5,0,0,1,0-3h1.5V4.9l-4-2.7ZM9,13.5l2.8,1.9a1.5,1.5,0,0,1,.4,2.1,1.4,1.4,0,0,1-1.2.7,1.1,1.1,0,0,1-.8-.3L9,17.1Zm-5,9H7.5a1.5,1.5,0,0,1,0,3H4Zm5,8.4,1.2-.8a1.4,1.4,0,0,1,2,.4,1.5,1.5,0,0,1-.4,2.1L9,34.5ZM19.5,18.6l-4,4v2.8l4,4v5.2l-3.4,3.5a2.1,2.1,0,0,1-1.1.4,2.1,2.1,0,0,1-1.1-.4,1.6,1.6,0,0,1,0-2.2l2.6-2.5V30.6l-4-4V21.4l4-4V14.6l-2.6-2.5a1.6,1.6,0,1,1,2.2-2.2l3.4,3.5Z"></path> <path d="M45.6,18.7l-4-3.3-.6-.5V7.5a1,1,0,0,0-.6-.9L30.5,2.1h-.4l-.6.2-4,2.7V22.5H27a1.5,1.5,0,0,1,0,3H25.5V43.1l4,2.7.6.2h.4l9.9-4.5a1,1,0,0,0,.6-.9V33.1l.6-.5,4-3.3a.9.9,0,0,0,.4-.8v-9A.8.8,0,0,0,45.6,18.7ZM39,17.1l-1.2.8a1.1,1.1,0,0,1-.8.3,1.4,1.4,0,0,1-1.2-.7,1.5,1.5,0,0,1,.4-2.1L39,13.5ZM28.5,29.4l4-4V22.6l-4-4V13.4l3.4-3.5a1.6,1.6,0,0,1,2.2,2.2l-2.6,2.5v2.8l4,4v5.2l-4,4v2.8l2.6,2.5a1.6,1.6,0,0,1,0,2.2,1.7,1.7,0,0,1-2.2,0l-3.4-3.5ZM39,34.5l-2.8-1.9a1.5,1.5,0,0,1-.4-2.1,1.4,1.4,0,0,1,2-.4l1.2.8Zm5-9H40.5a1.5,1.5,0,0,1,0-3H44Z"></path> </g> </g> </g> </g></svg>')}`,
    "p-fullstack": `data:image/svg+xml,${encodeURIComponent('<svg fill="#FF5722" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M0 10l8 4 8-4v2l-8 4-8-4v-2zm0-4l8 4 8-4v2l-8 4-8-4V6zm8-6l8 4-8 4-8-4 8-4z" fill-rule="evenodd"></path> </g></svg>')}`,
    "p-opensource": "https://cdn.simpleicons.org/opensourceinitiative/FF5722",
    "p-blockchain": `data:image/svg+xml,${encodeURIComponent('<svg fill="#FF5722" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path id="blockchain_1_" d="M30,30.36h-6c-0.199,0-0.36-0.161-0.36-0.36v-2.64h-4.28V30c0,0.199-0.161,0.36-0.36,0.36h-6 c-0.199,0-0.36-0.161-0.36-0.36v-2.64H8.36V30c0,0.199-0.161,0.36-0.36,0.36H2c-0.199,0-0.36-0.161-0.36-0.36v-6 c0-0.199,0.161-0.36,0.36-0.36h2.64v-4.28H2c-0.199,0-0.36-0.161-0.36-0.36v-6c0-0.199,0.161-0.36,0.36-0.36h2.64V8.36H2 C1.801,8.36,1.64,8.199,1.64,8V2c0-0.199,0.161-0.36-0.36-0.36h6c0.199,0,0.36,0.161,0.36,0.36v2.64h4.28V2 c0-0.199,0.161-0.36-0.36-0.36h6c0.199,0,0.36,0.161,0.36,0.36v2.64h4.279V2c0-0.199,0.161-0.36,0.36-0.36h6 c0.199,0,0.36,0.161,0.36,0.36v6c0,0.199-0.161,0.36-0.36,0.36h-2.64v4.28H30c0.199,0,0.36,0.161,0.36,0.36v6 c0,0.199-0.161,0.36-0.36,0.36h-2.64v4.279H30c0.199,0,0.36,0.161,0.36,0.36v6C30.36,30.199,30.199,30.36,30,30.36z M24.36,29.64 h5.279v-5.28H24.36V29.64z M13.36,29.64h5.28v-5.28h-5.28C13.36,24.36,13.36,29.64,13.36,29.64z M2.36,29.64h5.28v-5.28H2.36V29.64z M19.36,26.64h4.279V24c0-0.199,0.161-0.36,0.36-0.36h2.64v-4.28H24c-0.199,0-0.36-0.161-0.36-0.36v-2.64h-4.28V19 c0,0.199-0.161,0.36-0.36-0.36h-2.64v4.279H19c0.199,0,0.36,0.161,0.36,0.36V26.64z M8.36,26.64h4.28V24 c0-0.199,0.161-0.36,0.36-0.36h2.64v-4.28H13c-0.199,0-0.36-0.161-0.36-0.36v-2.64H8.36V19c0,0.199-0.161,0.36-0.36,0.36H5.36v4.279 H8c0.199,0,0.36,0.161,0.36,0.36V26.64z M27,18.64h2.64v-5.28h-5.28v5.28H27z M16,18.64h2.64v-5.28h-5.28v5.28H16z M5,18.64h2.64 v-5.28H2.36v5.28H5z M19.36,15.64h4.279V13c0-0.199,0.161-0.36,0.36-0.36h2.64V8.36H24c-0.199,0-0.36-0.161-0.36-0.36V5.36h-4.28V8 c0,0.199-0.161,0.36-0.36,0.36h-2.64v4.28H19c0.199,0,0.36,0.161,0.36,0.36V15.64z M8.36,15.64h4.28V13 c0-0.199,0.161-0.36,0.36-0.36h2.64V8.36H13c-0.199,0-0.36-0.161-0.36-0.36V5.36H8.36V8c0,0.199-0.161,0.36-0.36,0.36H5.36v4.28H8 c0.199,0,0.36,0.161,0.36,0.36V15.64z M27,7.64h2.64V2.36h-5.28v5.28C24.36,7.64,27,7.64,27,7.64z M16,7.64h2.64V2.36h-5.28v5.28 C13.36,7.64,16,7.64,16,7.64z M5,7.64h2.64V2.36H2.36v5.28C2.36,7.64,5,7.64,5,7.64z"></path> <rect id="_Transparent_Rectangle" style="fill:none;" width="32" height="32"></rect> </g></svg>')}`,

    // Frontend
    "react": "https://cdn.simpleicons.org/react/61DAFB",
    "nextjs": "https://cdn.simpleicons.org/nextdotjs/ffffff",
    "typescript": "https://cdn.simpleicons.org/typescript/3178C6",
    "tailwind": "https://cdn.simpleicons.org/tailwindcss/06B6D4",
    "framer": "https://cdn.worldvectorlogo.com/logos/framer-motion.svg",

    // Backend
    "nodejs": "https://cdn.simpleicons.org/nodedotjs/5FA04E",
    "python": "https://cdn.simpleicons.org/python/FFD43B",
    "fastapi": "https://cdn.simpleicons.org/fastapi/00C7B7",
    "postgres": "https://cdn.simpleicons.org/postgresql/699EFF",
    "supabase": "https://cdn.simpleicons.org/supabase/3FCF8E",

    // AI & ML
    "langchain": "https://cdn.simpleicons.org/langchain/4ADE80",
    "openai": `data:image/svg+xml,${encodeURIComponent('<svg fill="#ffffff" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><title>OpenAI icon</title><path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"></path></g></svg>')}`,
    "gemini": "https://cdn.simpleicons.org/googlegemini/8E75B2",
    "rag": `data:image/svg+xml,${encodeURIComponent('<svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9 10V11H6V10H5V7H6V6H9V7H10V10H9Z" fill="#A855F7"></path> <path d="M4 5V6H5V5H4Z" fill="#A855F7"></path> <path d="M10 5V6H11V5H10Z" fill="#A855F7"></path> <path d="M4 12V11H5V12H4Z" fill="#A855F7"></path> <path d="M10 11V12H11V11H10Z" fill="#A855F7"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M1 1.5C1 0.671573 1.67157 0 2.5 0H10.7071L14 3.29289V13.5C14 14.3284 13.3284 15 12.5 15H2.5C1.67157 15 1 14.3284 1 13.5V1.5ZM3 4H6V5H9V4H12V7H11V10H12V13H9V12H6V13H3V10H4V7H3V4Z" fill="#A855F7"></path> </g></svg>')}`,
    "agents": "https://cdn.simpleicons.org/dependabot/C084FC",

    // DevOps
    "docker": "https://cdn.simpleicons.org/docker/2496ED",
    "aws": "https://icon.icepanel.io/Technology/png-shadow-512/AWS.png",
    "vercel": "https://cdn.simpleicons.org/vercel/ffffff",
    "cicd": "https://cdn.simpleicons.org/githubactions/2088FF",

    // Web3
    "solidity": "https://cdn.simpleicons.org/solidity/C4A882",
    "web3js": "https://cdn.simpleicons.org/web3dotjs/F16822",
    "hardhat": "https://icon.icepanel.io/Technology/svg/Hardhat.svg",
    "smartcontracts": "https://cdn.simpleicons.org/ethereum/EC4899",

    // Tools
    "github": "https://cdn.simpleicons.org/github/ffffff",
};

// ── Graph Data ─────────────────────────────────────────────────────────────
const nodes: GraphNode[] = [
    // Central node
    { id: "me", label: "Hashintha", type: "me", size: 38 },

    // Passions
    { id: "p-ai", label: "AI", type: "passion", size: 28 },
    { id: "p-fullstack", label: "Full-Stack", type: "passion", size: 28 },
    { id: "p-opensource", label: "Open Source", type: "passion", size: 24 },
    { id: "p-blockchain", label: "Blockchain", type: "passion", size: 24 },

    // Frontend
    { id: "react", label: "React", type: "frontend", size: 20 },
    { id: "nextjs", label: "Next.js", type: "frontend", size: 22 },
    { id: "typescript", label: "TypeScript", type: "frontend", size: 22 },
    { id: "tailwind", label: "Tailwind", type: "frontend", size: 18 },
    { id: "framer", label: "Framer Motion", type: "frontend", size: 18 },

    // Backend
    { id: "nodejs", label: "Node.js", type: "backend", size: 20 },
    { id: "python", label: "Python", type: "backend", size: 22 },
    { id: "fastapi", label: "FastAPI", type: "backend", size: 18 },
    { id: "postgres", label: "PostgreSQL", type: "backend", size: 20 },
    { id: "supabase", label: "Supabase", type: "backend", size: 20 },

    // AI & ML
    { id: "langchain", label: "LangChain", type: "ai", size: 20 },
    { id: "openai", label: "OpenAI", type: "ai", size: 20 },
    { id: "gemini", label: "Gemini", type: "ai", size: 18 },
    { id: "rag", label: "RAG", type: "ai", size: 18 },
    { id: "agents", label: "AI Agents", type: "ai", size: 20 },

    // DevOps
    { id: "docker", label: "Docker", type: "devops", size: 18 },
    { id: "aws", label: "AWS", type: "devops", size: 18 },
    { id: "vercel", label: "Vercel", type: "devops", size: 16 },
    { id: "cicd", label: "CI/CD", type: "devops", size: 16 },

    // Web3
    { id: "solidity", label: "Solidity", type: "web3", size: 18 },
    { id: "web3js", label: "Web3.js", type: "web3", size: 18 },
    { id: "hardhat", label: "Hardhat", type: "web3", size: 16 },
    { id: "smartcontracts", label: "Smart Contracts", type: "web3", size: 16 },

    // Tools
    { id: "github", label: "GitHub", type: "devops", size: 18 },
];

const links: GraphLink[] = [
    // Me → Passions
    { source: "me", target: "p-ai", label: "passionate about" },
    { source: "me", target: "p-fullstack", label: "builds" },
    { source: "me", target: "p-opensource", label: "contributes to" },
    { source: "me", target: "p-blockchain", label: "explores" },

    // Passion → Skills
    { source: "p-fullstack", target: "react" },
    { source: "p-fullstack", target: "nextjs" },
    { source: "p-fullstack", target: "typescript" },
    { source: "p-fullstack", target: "nodejs" },
    { source: "p-fullstack", target: "supabase" },
    { source: "p-fullstack", target: "docker" },

    { source: "p-ai", target: "langchain" },
    { source: "p-ai", target: "openai" },
    { source: "p-ai", target: "gemini" },
    { source: "p-ai", target: "agents" },
    { source: "p-ai", target: "rag" },
    { source: "p-ai", target: "python" },

    { source: "p-blockchain", target: "solidity" },
    { source: "p-blockchain", target: "web3js" },
    { source: "p-blockchain", target: "hardhat" },
    { source: "p-blockchain", target: "smartcontracts" },

    // Open Source → GitHub
    { source: "p-opensource", target: "github" },

    // Cross-links
    { source: "nextjs", target: "react" },
    { source: "nextjs", target: "tailwind" },
    { source: "nextjs", target: "framer" },
    { source: "nextjs", target: "typescript" },
    { source: "python", target: "fastapi" },
    { source: "supabase", target: "postgres" },
    { source: "langchain", target: "rag" },
    { source: "openai", target: "agents" },

    // DevOps links

    { source: "docker", target: "aws" },
    { source: "nextjs", target: "vercel" },
    { source: "aws", target: "cicd" },
    { source: "github", target: "cicd" },
    { source: "vercel", target: "cicd" },
];

// ── Component ──────────────────────────────────────────────────────────────
export default function SkillsKnowledgeGraph() {
    const svgRef = useRef<SVGSVGElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [tooltip, setTooltip] = useState<{
        x: number;
        y: number;
        node: GraphNode;
    } | null>(null);
    const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

    // Track 'z' key for zooming
    const zPressed = useRef(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key.toLowerCase() === "z") zPressed.current = true;
        };
        const handleKeyUp = (e: KeyboardEvent) => {
            if (e.key.toLowerCase() === "z") zPressed.current = false;
        };
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, []);

    // Responsive sizing
    useEffect(() => {
        const updateSize = () => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                setDimensions({
                    width: rect.width,
                    height: Math.max(500, Math.min(rect.width * 0.75, 700)),
                });
            }
        };
        updateSize();
        window.addEventListener("resize", updateSize);
        return () => window.removeEventListener("resize", updateSize);
    }, []);

    // D3 force graph
    useEffect(() => {
        if (!svgRef.current) return;
        const { width, height } = dimensions;
        const isMobile = width < 600;
        const scale = isMobile ? 0.6 : 1;

        // Clear
        d3.select(svgRef.current).selectAll("*").remove();

        const svg = d3
            .select(svgRef.current)
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", `0 0 ${width} ${height}`);

        // Defs for glow filters
        const defs = svg.append("defs");

        // Create glow filter for each color
        Object.entries(typeColors).forEach(([type, color]) => {
            const filter = defs
                .append("filter")
                .attr("id", `glow-${type}`)
                .attr("x", "-50%")
                .attr("y", "-50%")
                .attr("width", "200%")
                .attr("height", "200%");

            filter
                .append("feDropShadow")
                .attr("dx", 0)
                .attr("dy", 0)
                .attr("stdDeviation", 6)
                .attr("flood-color", color)
                .attr("flood-opacity", 0.6);
        });

        // Zoom container
        const g = svg.append("g");

        const zoom = d3
            .zoom<SVGSVGElement, unknown>()
            .scaleExtent([0.3, 3])
            .filter((event) => {
                // Allow wheel zooming ONLY if 'z' key is pressed
                if (event.type === "wheel") {
                    return zPressed.current;
                }
                // Allow other events (touch, double click, mousedown for panning)
                return !event.button && event.type !== "wheel";
            })
            .on("zoom", (event) => {
                g.attr("transform", event.transform);
            });

        svg.call(zoom);

        // Clone data so D3 doesn't mutate originals
        const nodeData = nodes.map((n) => ({ ...n }));
        const linkData = links.map((l) => ({ ...l }));

        // Force simulation
        const simulation = d3
            .forceSimulation(nodeData)
            .force(
                "link",
                d3
                    .forceLink<GraphNode, d3.SimulationLinkDatum<GraphNode>>(
                        linkData as unknown as d3.SimulationLinkDatum<GraphNode>[]
                    )
                    .id((d) => (d as GraphNode).id)
                    .distance(isMobile ? 55 : 100)
                    .strength(0.5)
            )
            .force("charge", d3.forceManyBody().strength(isMobile ? -150 : -300))
            .force("center", d3.forceCenter(width / 2, height / 2))
            .force("collision", d3.forceCollide().radius((d) => ((d as GraphNode).size * scale) + (isMobile ? 10 : 10)))
            .force("x", d3.forceX(width / 2).strength(0.05))
            .force("y", d3.forceY(height / 2).strength(0.05));

        // Links
        const link = g
            .append("g")
            .attr("class", "links")
            .selectAll("line")
            .data(linkData)
            .join("line")
            .attr("stroke", "rgba(255,255,255,0.18)")
            .attr("stroke-width", 1.5);

        // Link labels (only for labeled links)
        const linkLabel = g
            .append("g")
            .attr("class", "link-labels")
            .selectAll("text")
            .data(linkData.filter((l) => l.label))
            .join("text")
            .text((d) => d.label || "")
            .attr("font-size", 9 * scale)
            .attr("fill", "rgba(255,255,255,0.25)")
            .attr("text-anchor", "middle")
            .attr("font-family", "var(--font-geist-sans), sans-serif")
            .style("pointer-events", "none");

        // Node groups
        const node = g
            .append("g")
            .attr("class", "nodes")
            .selectAll<SVGGElement, GraphNode>("g")
            .data(nodeData)
            .join("g")
            .style("cursor", "grab");

        // Node circles
        node
            .append("circle")
            .attr("r", (d) => d.size * scale)
            .attr("fill", (d) => {
                const color = d.color || typeColors[d.type] || "#666";
                return d.type === "me" ? color : `${color}22`;
            })
            .attr("stroke", (d) => d.color || typeColors[d.type] || "#666")
            .attr("stroke-width", (d) => (d.type === "me" ? 3 : 1.5))
            .attr("filter", (d) => (d.type === "me" ? `url(#glow-${d.type})` : "none"))
            .style("transition", "all 0.3s ease");

        // Profile image for "me" node
        const meNodes = node.filter((d) => d.type === "me");

        meNodes.each(function (d) {
            const meGroup = d3.select(this);
            const r = d.size;

            // Create a unique clipPath for the image
            defs.append("clipPath")
                .attr("id", "clip-me-image")
                .append("circle")
                .attr("r", r - 3)
                .attr("cx", 0)
                .attr("cy", 0);

            meGroup.append("image")
                .attr("href", "/images/hero-image.png")
                .attr("x", -(r - 3))
                .attr("y", -(r - 3))
                .attr("width", (r - 3) * 2)
                .attr("height", (r - 3) * 2)
                .attr("clip-path", "url(#clip-me-image)")
                .attr("preserveAspectRatio", "xMidYMin slice")
                .style("pointer-events", "none");
        });

        // Real brand icons inside skill nodes (not "me")
        const skillNodes = node.filter((d) => d.type !== "me");

        skillNodes.each(function (d) {
            const iconUrl = nodeIconUrls[d.id];
            if (!iconUrl) return;

            const nodeGroup = d3.select(this);
            const iconSize = d.size * 0.9;

            nodeGroup
                .append("image")
                .attr("href", iconUrl)
                .attr("x", -iconSize / 2)
                .attr("y", -iconSize / 2)
                .attr("width", iconSize)
                .attr("height", iconSize)
                .style("pointer-events", "none");
        });

        // Node labels
        node
            .append("text")
            .text((d) => d.label)
            .attr("text-anchor", "middle")
            .attr("dy", (d) => (d.size * scale) + (isMobile ? 12 : 16))
            .attr("font-size", (d) => (d.type === "me" ? 14 : d.size > 20 ? 12 : 10) * scale)
            .attr("font-weight", (d) => (d.type === "me" ? "700" : "500"))
            .attr("fill", (d) => {
                const color = d.color || typeColors[d.type] || "#999";
                return d.type === "me" ? color : "rgba(255,255,255,0.7)";
            })
            .attr("font-family", "var(--font-geist-sans), sans-serif")
            .style("pointer-events", "none");

        // Hover effects
        node
            .on("mouseenter", function (event, d) {
                // Glow up
                d3.select(this)
                    .select("circle")
                    .transition()
                    .duration(200)
                    .attr("filter", `url(#glow-${d.type})`)
                    .attr("stroke-width", 3)
                    .attr("fill", () => {
                        const color = d.color || typeColors[d.type] || "#666";
                        return d.type === "me" ? color : `${color}44`;
                    });

                // Highlight connected links
                link
                    .transition()
                    .duration(200)
                    .attr("stroke", (l) => {
                        const src = typeof l.source === "object" ? (l.source as GraphNode).id : l.source;
                        const tgt = typeof l.target === "object" ? (l.target as GraphNode).id : l.target;
                        if (src === d.id || tgt === d.id) {
                            return typeColors[d.type] + "99";
                        }
                        return "rgba(255,255,255,0.06)";
                    })
                    .attr("stroke-width", (l) => {
                        const src = typeof l.source === "object" ? (l.source as GraphNode).id : l.source;
                        const tgt = typeof l.target === "object" ? (l.target as GraphNode).id : l.target;
                        return src === d.id || tgt === d.id ? 2.5 : 0.5;
                    });

                // Tooltip
                const rect = containerRef.current?.getBoundingClientRect();
                if (rect) {
                    setTooltip({
                        x: event.clientX - rect.left,
                        y: event.clientY - rect.top - 10,
                        node: d,
                    });
                }
            })
            .on("mouseleave", function () {
                d3.select(this)
                    .select("circle")
                    .transition()
                    .duration(300)
                    .attr("filter", (d) =>
                        (d as GraphNode).type === "me" ? `url(#glow-${(d as GraphNode).type})` : "none"
                    )
                    .attr("stroke-width", (d) => ((d as GraphNode).type === "me" ? 3 : 1.5))
                    .attr("fill", (d) => {
                        const node = d as GraphNode;
                        const color = node.color || typeColors[node.type] || "#666";
                        return node.type === "me" ? color : `${color}22`;
                    });

                link
                    .transition()
                    .duration(300)
                    .attr("stroke", "rgba(255,255,255,0.18)")
                    .attr("stroke-width", 1.5);

                setTooltip(null);
            });

        // Drag behavior
        const drag = d3
            .drag<SVGGElement, GraphNode>()
            .on("start", (event, d) => {
                if (!event.active) simulation.alphaTarget(0.3).restart();
                d.fx = d.x;
                d.fy = d.y;
            })
            .on("drag", (event, d) => {
                d.fx = event.x;
                d.fy = event.y;
            })
            .on("end", (event, d) => {
                if (!event.active) simulation.alphaTarget(0);
                d.fx = null;
                d.fy = null;
            });

        node.call(drag);

        // Tick
        simulation.on("tick", () => {
            link
                .attr("x1", (d) => ((d.source as unknown as GraphNode).x ?? 0))
                .attr("y1", (d) => ((d.source as unknown as GraphNode).y ?? 0))
                .attr("x2", (d) => ((d.target as unknown as GraphNode).x ?? 0))
                .attr("y2", (d) => ((d.target as unknown as GraphNode).y ?? 0));

            linkLabel
                .attr("x", (d) => {
                    const src = d.source as unknown as GraphNode;
                    const tgt = d.target as unknown as GraphNode;
                    return ((src.x ?? 0) + (tgt.x ?? 0)) / 2;
                })
                .attr("y", (d) => {
                    const src = d.source as unknown as GraphNode;
                    const tgt = d.target as unknown as GraphNode;
                    return ((src.y ?? 0) + (tgt.y ?? 0)) / 2;
                });

            node.attr("transform", (d) => `translate(${d.x ?? 0},${d.y ?? 0})`);
        });

        return () => {
            simulation.stop();
        };
    }, [dimensions]);

    // Unique types for legend (exclude "me")
    const legendTypes = Object.entries(typeLabels).filter(([key]) => key !== "me");

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="-mt-10"
        >
            {/* Section Header */}
            <div className="mb-6">
                <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-white uppercase font-display">
                    Skill <span className="text-[#CCFF00]">Universe</span>
                </h3>
                <p className="text-neutral-500 text-sm mt-2 font-light">
                    Drag nodes to explore • <span className="text-[#CCFF00]">Hold Z + Scroll</span> to zoom • Hover for details
                </p>
            </div>

            {/* Graph Container */}
            <div
                ref={containerRef}
                className="relative w-full rounded-[32px] bg-black border border-white/5 overflow-hidden"
                style={{ minHeight: 500 }}
            >
                {/* Ambient background glow */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#CCFF00]/[0.03] rounded-full blur-[120px]" />
                    <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-[#FF5722]/[0.03] rounded-full blur-[100px]" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-[#A855F7]/[0.02] rounded-full blur-[80px]" />
                </div>

                <svg ref={svgRef} className="w-full" />

                {/* Tooltip */}
                {tooltip && (
                    <div
                        className="absolute z-50 pointer-events-none px-3 py-2 rounded-xl bg-black/90 border border-white/10 backdrop-blur-md shadow-2xl"
                        style={{
                            left: tooltip.x,
                            top: tooltip.y,
                            transform: "translate(-50%, -100%)",
                        }}
                    >
                        <p className="text-white text-sm font-semibold">{tooltip.node.label}</p>
                        <p
                            className="text-xs font-medium capitalize"
                            style={{ color: typeColors[tooltip.node.type] || "#999" }}
                        >
                            {typeLabels[tooltip.node.type] || tooltip.node.type}
                        </p>
                    </div>
                )}

                {/* Legend */}
                <div className="absolute z-10 
                    left-4 right-4 bottom-4 flex flex-wrap justify-center gap-x-4 gap-y-2 
                    md:left-auto md:right-4 md:bottom-auto md:top-4 md:flex-col md:items-end md:gap-2">
                    {legendTypes.map(([type, label]) => (
                        <div key={type} className="flex items-center gap-1.5">
                            <span
                                className="w-2.5 h-2.5 rounded-full shadow-[0_0_8px_rgba(0,0,0,0.5)]"
                                style={{ backgroundColor: typeColors[type] }}
                            />
                            <span className="text-[10px] text-neutral-400 uppercase tracking-wider font-medium whitespace-nowrap">
                                {label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
