"use client";


export default function Footer() {
    return (
        <footer className="relative w-full py-16 border-t border-white/10 bg-black overflow-hidden">
            
            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center gap-6">
                <img 
                    src="/images/H-Logo.png" 
                    alt="Logo" 
                    className="h-40 w-auto"
                />
                <p className="text-neutral-500 text-sm">
                    © {new Date().getFullYear()} Hashintha Nishsanka. Crafted with passion.
                </p>
            </div>
        </footer>
    );
}
