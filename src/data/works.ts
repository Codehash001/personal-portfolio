export interface Work {
    id: number;
    slug: string;
    title: string;
    category: string;
    description: string;
    tags: string[];
    image: string;
    // Case study fields
    overview: string;
    challenge: string;
    solution: string;
    features: string[];
    technologies: string[];
    results?: string;
    liveUrl?: string;
    sourceUrl?: string; // Link to GitHub/Source code (optional)
    gallery?: string[];
}

export const works: Work[] = [
    {
        id: 1,
        slug: "nooma",
        title: "Nooma",
        category: "SaaS / Health",
        description: "Health and longevity tracker built for the Brazil-based community to manage personal health records.",
        tags: ["SaaS", "Health Tech", "Analytics", "Full Stack"],
        image: "/projects/nooma.png",
        overview: "Nooma is a comprehensive health tracking platform built specifically for the Brazil-based community. The platform enables users to track their health through test results, medications, and family history. Users can monitor their health journey over time with powerful comparison tools and share records securely with healthcare providers.",
        challenge: "Users in Brazil needed a localized solution to consolidate their health data, track test results over time, and understand patterns in their health metrics. Existing solutions lacked the ability to compare multiple test results visually and didn't support the specific needs of the Brazilian healthcare context.",
        solution: "Built a full-stack application with Supabase backend that allows users to track tests, medications, and family history. Implemented a unique compare mode feature that lets users overlay multiple test results on the same chart to visualize trends and changes over time.",
        features: [
            "Track health tests with detailed metadata",
            "Medication tracking and reminders",
            "Family health history management",
            "Compare mode - overlay multiple test results on the same chart",
            "Password-protected record sharing",
            "Admin panel to add/edit default exam types with metadata",
            "Customizable health records with related records linking",
            "Multi-language support (English & Dutch)"
        ],
        technologies: ["Next.js", "Supabase Auth", "Supabase Database", "TypeScript", "Tailwind CSS", "Recharts", "i18n", "Stripe"],
        results: "Empowering the Brazilian community to take control of their health data with intuitive tracking and powerful visualization tools."
    },
    {
        id: 2,
        slug: "gpt-pdf-translator",
        title: "GPT PDF Translator",
        category: "AI Tool",
        description: "A powerful application that translates PDF documents to various languages while preserving the original layout, formatting, and background colors using OpenAI API.",
        tags: ["AI", "OpenAI", "Python", "FastAPI", "Open Source"],
        image: "/projects/pdf.png",
        sourceUrl: "https://github.com/Codehash001/gpt-pdf-translator",
        overview: "GPT PDF Translator is a web application that translates PDF documents into any language while preserving the original layout, formatting, and background colors. It extracts text blocks with their positions, font styles, and sizes, detects background colors, translates using OpenAI's API, and recreates the PDF with translated text in matching styles — all with real-time WebSocket progress tracking.",
        challenge: "Translating PDF documents typically destroys the original layout, formatting, and design elements. Existing tools produce messy outputs that lose the structure, background colors, and font styles of the source document, making translated PDFs look unprofessional and hard to read.",
        solution: "Built a FastAPI application that intelligently extracts text blocks while preserving their positions, detects background colors by rendering and analyzing text block areas, translates via OpenAI's API, and recreates the PDF by overlaying translated text with matching font styles and intelligent text wrapping — all with real-time WebSocket progress updates.",
        features: [
            "Exact layout preservation — maintains original PDF text positioning, images, and graphics",
            "Background color detection — preserves the background color of each text block",
            "Font style retention — maintains bold, italic, and other text formatting",
            "Real-time WebSocket progress tracking during translation",
            "Multiple language support via OpenAI models",
            "Intelligent text wrapping for longer translated text",
            "User-friendly web interface for uploading and translating PDFs"
        ],
        technologies: ["Python", "FastAPI", "OpenAI API", "WebSocket", "PyMuPDF"],
        results: "Open-source tool that enables seamless PDF translation while maintaining professional document quality."
    },
    {
        id: 3,
        slug: "dsg-ai-agents",
        title: "DSG AI Agents",
        category: "AI Solution",
        description: "Multi-agent AI solution powering the Dental School Guide student dashboard.",
        tags: ["AI Agents", "EduTech", "RAG", "Full Stack"],
        image: "/projects/dsg.png",
        liveUrl: "https://www.dentalschoolguide.com/",
        overview: "DSG AI Agents is a suite of specialized AI agents built for the Dental School Guide platform, integrated directly into the student dashboard for enrolled course members. The system provides intelligent assistance across multiple aspects of the dental school application journey.",
        challenge: "Students enrolled in the Dental School Guide course needed quick, intelligent access to course content, personalized essay feedback, volunteer opportunity suggestions, real-time school information, and interview preparation - all in one place without overwhelming them.",
        solution: "Built a multi-agent architecture using Voltagent AI framework where each agent specializes in a specific task: RAG-based course content retrieval, AI essay feedback system, volunteer idea matching based on user interests, real-time school info from spreadsheets, and an AI-powered interview practice guide.",
        features: [
            "RAG system for course content retrieval",
            "AI feedback system for essay review and improvement",
            "Volunteer ideas finder based on user interests",
            "School info retrieval agent from real-time spreadsheets",
            "AI interview practice guide with realistic scenarios"
        ],
        technologies: ["Next.js", "Voltagent AI Framework", "Supabase Auth", "Supabase Database", "Gemini API", "TypeScript"],
        results: "Enhancing the learning experience for dental school applicants with instant AI-powered assistance across their application journey."
    },
    {
        id: 4,
        slug: "virtu-network",
        title: "Virtu Network",
        category: "Frontend Development",
        description: "Frontend for GPU/TPU cloud rental platform with pixel-perfect Figma implementation.",
        tags: ["Frontend", "Cloud Computing", "UI/UX"],
        image: "/projects/virtu.png",
        overview: "Virtu Network is a GPU and TPU rental platform that enables users to access high-performance computing resources on demand. The project involved building a modern, responsive frontend interface based on detailed Figma designs provided by the client.",
        challenge: "The client provided comprehensive Figma designs for their cloud computing rental platform and needed a pixel-perfect implementation. The previous UI looked dull and suffered from poor performance, failing to convey the cutting-edge nature of the GPU/TPU rental service.",
        solution: "Rebuilt the entire frontend from scratch using Next.js and TypeScript, achieving 99% accuracy to the original Figma designs. Focused on performance optimization and creating a sleek, modern interface that matches the high-tech nature of the platform.",
        features: [
            "99% pixel-perfect Figma design implementation",
            "GPU and TPU rental interface",
            "Responsive design across all devices",
            "Optimized performance vs old UI",
            "Modern, sleek visual design"
        ],
        technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
        results: "Delivered a pixel-perfect implementation that transformed the platform's appearance from dull to cutting-edge, with significantly improved performance."
    },
    {
        id: 5,
        slug: "headshot",
        title: "Headshot",
        category: "Full Stack / E-Sports",
        description: "Player registration platform for Headshot E-sports inter-university competition.",
        tags: ["Full Stack", "E-Sports", "University", "Registration"],
        image: "/projects/headshot.png",
        overview: "Headshot is an E-sports competition organized by the Technology Subcommittee of the Faculty of Technology, University of Sri Jayewardenepura. In 2025, it expanded to become an inter-university competition requiring a robust platform to handle registrations from multiple universities.",
        challenge: "The 2025 edition of Headshot became an inter-university competition, requiring a platform that could register players from different universities and faculties. Organizers needed to collect detailed player information and export all data to Excel for tournament management.",
        solution: "Built a streamlined registration platform that captures university, faculty, and player details. Implemented an admin dashboard with Excel export functionality to give organizers easy access to all participant data for tournament coordination.",
        features: [
            "Player registration with university/faculty details",
            "Multi-university support for inter-university competition",
            "Detailed player information collection",
            "Excel export for tournament organizers",
            "Admin dashboard for managing registrations"
        ],
        technologies: ["Next.js", "Neon PostgreSQL", "TypeScript"],
        results: "Successfully powered the inter-university Headshot 2025 E-sports competition with seamless player registration across multiple universities."
    },
    {
        id: 6,
        slug: "documaty",
        title: "Documaty",
        category: "AI Product",
        description: "AI agent that transforms complex documentation into clear, step-by-step guidance.",
        tags: ["AI", "Full Stack", "RAG", "Vector DB"],
        image: "/projects/documaty.png",
        overview: "Documaty is an AI-powered documentation assistant that makes technical documentation accessible to everyone. It converts complex manuals, API docs, and guides into conversational, step-by-step instructions tailored to the user's needs.",
        challenge: "Technical documentation is often overwhelming, poorly structured, and assumes prior knowledge. Users spend excessive time searching through docs for simple answers.",
        solution: "Created an AI agent powered by OpenAI that ingests documentation, builds a semantic understanding of the content, and provides conversational access with context-aware responses and guided tutorials. Uses TiDB Serverless for efficient data storage and retrieval.",
        features: [
            "Natural language documentation queries",
            "Step-by-step guided tutorials",
            "Code snippet generation",
            "Multi-format doc ingestion",
            "Contextual follow-up questions"
        ],
        technologies: ["Next.js", "TypeScript", "TiDB Serverless", "OpenAI API"],
        results: "Reduced documentation lookup time by 75% and improved developer onboarding speed."
    },
    {
        id: 7,
        slug: "beni-minting-dapp",
        title: "Beni Minting Dapp",
        category: "Blockchain",
        description: "Minting engine and decentralized application for the Beni Web3 project.",
        tags: ["Solidity", "DApp", "Web3", "Smart Contracts"],
        image: "/projects/beni.png",
        overview: "Beni Minting Dapp is a full-stack minting engine and decentralized application built for the Beni Web3 project. The platform features custom smart contracts, a user-friendly minting interface, and comprehensive tools for managing the NFT collection.",
        challenge: "The Beni Web3 project needed a custom minting solution that could handle their specific requirements while providing a smooth user experience for collectors. Standard minting platforms didn't offer the flexibility needed.",
        solution: "Developed a complete minting engine with gas-optimized smart contracts using Solidity and Hardhat. Built the frontend with Web3.js for seamless blockchain interaction and wallet connectivity.",
        features: [
            "Custom minting engine",
            "Gas-optimized smart contracts",
            "Wallet connection and minting flow",
            "Collection management tools",
            "Real-time blockchain state updates"
        ],
        technologies: ["Web3.js", "Solidity", "Hardhat", "React", "IPFS"],
        results: "Successfully launched the Beni NFT collection with a smooth minting experience for collectors."
    },
    {
        id: 8,
        slug: "fitness",
        title: "Fitness",
        category: "Frontend / E-Commerce",
        description: "Frontend for a fitness equipment selling website with dynamic animations.",
        tags: ["Frontend", "E-Commerce", "Animations"],
        image: "/projects/fitness.png",
        overview: "A modern, high-performance frontend for a fitness equipment e-commerce website. The site features stunning visuals, smooth Framer Motion animations, and an engaging shopping experience designed to showcase fitness equipment in the best light.",
        challenge: "The client needed an e-commerce frontend that could showcase their fitness equipment with energy and dynamism. The website needed to feel as active and engaging as the fitness lifestyle it promotes.",
        solution: "Built a highly animated frontend using Framer Motion for smooth, performance-optimized animations. Created an engaging product showcase with scroll-driven effects and interactive elements that bring the fitness equipment to life.",
        features: [
            "Smooth Framer Motion animations",
            "Product showcase with dynamic effects",
            "Responsive e-commerce layout",
            "Interactive product galleries",
            "Fast page transitions"
        ],
        technologies: ["Next.js", "Framer Motion", "Tailwind CSS", "TypeScript"],
        results: "Created an engaging e-commerce experience that showcases fitness equipment with energy and style."
    },
];
