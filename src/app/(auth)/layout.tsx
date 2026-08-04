export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-[#191a1a]">
            {children}
        </div>
    );
}
