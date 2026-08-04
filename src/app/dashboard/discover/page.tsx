import Image from "next/image";

export default function DiscoverPage() {
    return (
        <div className="flex flex-col items-center justify-center h-full gap-4 text-white py-24">
            <Image src="/Icons/Atom.svg" width={40} height={40} alt="Discover" className="opacity-40" />
            <h1 className="text-2xl font-semibold">Discover</h1>
            <p className="text-sm text-neutral-500">Coming soon</p>
        </div>
    );
}
