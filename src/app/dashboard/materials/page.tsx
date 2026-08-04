import Image from "next/image";

export default function MaterialsPage() {
    return (
        <div className="flex flex-col items-center justify-center h-full gap-4 text-white py-24">
            <Image src="/Icons/Server Minimalistic.svg" width={40} height={40} alt="Materials" className="opacity-40" />
            <h1 className="text-2xl font-semibold">Materials</h1>
            <p className="text-sm text-neutral-500">Coming soon</p>
        </div>
    );
}
