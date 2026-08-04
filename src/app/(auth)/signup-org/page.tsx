"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { movatif } from "@/app/fonts";
import { Building2, GraduationCap, ShieldCheck } from "lucide-react";

function isValidEmail(v: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

// Simulated org registry — in prod this would be a DB/API lookup
const ORG_REGISTRY: Record<string, { name: string; type: "university" | "company" | "school"; logo?: string }> = {
    "mit.edu": { name: "Massachusetts Institute of Technology", type: "university" },
    "oxford.ac.uk": { name: "University of Oxford", type: "university" },
    "stanford.edu": { name: "Stanford University", type: "university" },
    "google.com": { name: "Google", type: "company" },
    "microsoft.com": { name: "Microsoft", type: "company" },
    "acme.edu": { name: "Acme University", type: "university" },
    "wits.ac.za": { name: "University of the Witwatersrand", type: "university" },
    "uct.ac.za": { name: "University of Cape Town", type: "university" },
};

function detectOrg(email: string) {
    const domain = email.split("@")[1]?.toLowerCase();
    if (!domain) return null;
    return ORG_REGISTRY[domain] ? { domain, ...ORG_REGISTRY[domain] } : null;
}

export default function OrgSignInPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [detected, setDetected] = useState<ReturnType<typeof detectOrg>>(null);
    const [step, setStep] = useState<"email" | "confirm">("email");

    function handleLookup() {
        if (!email.trim()) { setError("Please enter your email address."); return; }
        if (!isValidEmail(email.trim())) { setError("Please enter a valid email address."); return; }
        setError("");

        const org = detectOrg(email.trim());
        if (org) {
            setDetected(org);
            setStep("confirm");
        } else {
            setError("No organisation found for this email domain. Ask your admin if your organisation is on Wurlwind.");
        }
    }

    function handleConfirm() {
        router.push("/dashboard");
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <Card className="w-full max-w-md bg-transparent border-none shadow-none text-center flex flex-col items-center justify-center">
                <Button
                    variant="ghost"
                    className="w-full flex items-center justify-start gap-2 text-neutral-400 hover:text-white hover:bg-transparent transition-colors cursor-pointer px-0"
                    onClick={() => router.push("/signin")}
                >
                    <Image src="/Icons/Left.svg" width={25} height={25} alt="Back" />
                </Button>
                <CardHeader className="flex flex-col w-full items-center text-center gap-2">
                    <Image src="/Icons/Icon-Regular.svg" width={30} height={30} alt="Wurlwind logo" />
                    <CardTitle className={`text-3xl font-normal text-white ${movatif.className}`}>
                        {step === "email" ? "Sign in with your organisation" : "We found your organisation"}
                    </CardTitle>
                    <p className="text-md font-semibold">
                        {step === "email"
                            ? "Enter your work or university email and we'll find your organisation."
                            : "Confirm this is where you belong and we'll sign you in."}
                    </p>
                </CardHeader>

                <CardContent className="w-full max-w-sm flex flex-col items-center justify-center gap-3">

                    {/* Step 1 — email lookup */}
                    {step === "email" && (
                        <>
                            <div className="flex flex-col gap-1.5 w-full">
                                <Input
                                    type="email"
                                    placeholder="you@university.edu"
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value); setError(""); }}
                                    onKeyDown={(e) => e.key === "Enter" && handleLookup()}
                                    className={`bg-neutral-800 border-none text-white placeholder:text-neutral-500 ${error ? "ring-1 ring-red-500" : ""}`}
                                />
                                {error && <p className="text-xs text-red-400 text-left px-1">{error}</p>}
                            </div>

                            <Button
                                size="lg"
                                className="w-full bg-[#34E8B0] hover:bg-[#32D9A5] text-black font-semibold cursor-pointer"
                                onClick={handleLookup}
                            >
                                Find my organisation
                            </Button>

                            <Separator />

                            <p className="text-sm text-neutral-400">
                                Your domain is used to match you to your organisation. We never share it.
                            </p>
                        </>
                    )}

                    {/* Step 2 — confirm org */}
                    {step === "confirm" && detected && (
                        <>
                            {/* Org card */}
                            <div className="flex flex-col items-center gap-3 p-5 rounded-2xl border border-[#34E8B0]/20 bg-[#34E8B0]/5">
                                <div className="w-14 h-14 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center">
                                    {detected.type === "university" || detected.type === "school"
                                        ? <GraduationCap className="h-6 w-6 text-[#34E8B0]" />
                                        : <Building2 className="h-6 w-6 text-[#34E8B0]" />
                                    }
                                </div>
                                <div className="flex flex-col items-center gap-1">
                                    <p className="text-white font-semibold text-base">{detected.name}</p>
                                    <Badge variant="outline" className="border-neutral-700 text-neutral-400 font-normal text-xs">
                                        @{detected.domain}
                                    </Badge>
                                </div>
                                <div className="flex items-center gap-1.5 text-xs text-[#34E8B0]/80">
                                    <ShieldCheck className="h-3.5 w-3.5" />
                                    Verified organisation on Wurlwind
                                </div>
                            </div>

                            <p className="text-sm text-neutral-400 text-center">
                                You're signing in as{" "}
                                <span className="text-white font-medium">{email}</span>{" "}
                                through <span className="text-white font-medium">{detected.name}</span>.
                            </p>

                            <Button
                                size="lg"
                                className="w-full bg-[#34E8B0] hover:bg-[#32D9A5] text-black font-semibold cursor-pointer"
                                onClick={handleConfirm}
                            >
                                Yes, sign me in
                            </Button>

                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-neutral-500 hover:text-white cursor-pointer gap-1.5"
                                onClick={() => { setStep("email"); setDetected(null); }}
                            >
                                Use a different email
                            </Button>
                        </>
                    )}

                </CardContent>
            </Card>
        </div>
    );
}
