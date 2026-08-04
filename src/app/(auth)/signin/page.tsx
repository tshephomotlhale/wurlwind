"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { movatif } from "@/app/fonts";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

function isValidEmail(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default function SignInPage() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    function handleEmailContinue() {
        if (!email.trim()) {
            setError("Please enter your email address.");
            return;
        }
        if (!isValidEmail(email.trim())) {
            setError("Please enter a valid email address.");
            return;
        }
        setError("");
        router.push(`/verify-email?email=${encodeURIComponent(email.trim())}`);
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <Card className="w-full max-w-md bg-transparent border-none shadow-none text-center flex flex-col items-center justify-center">
                <CardHeader className="flex flex-col w-full items-center text-center">
                    <Image
                        src="/Icons/Icon-Regular.svg"
                        width={30}
                        height={30}
                        alt="Wurlwind logo"
                    />
                    <CardTitle
                        className={`text-3xl font-normal text-white ${movatif.className}`}
                    >
                        Sign up below to unlock the full potential of Wurlwind
                    </CardTitle>
                    <p className="text-md font-semibold">
                        By continuing, you agree to our{" "}
                        <Link href="#" className="underline hover:text-white transition-colors">
                            privacy policy
                        </Link>.
                    </p>
                </CardHeader>

                <CardContent className="w-full max-w-sm flex flex-col items-center justify-center gap-3">
                    <Button
                        className="flex items-center justify-center gap-2 bg-white hover:bg-neutral-200 font-semibold text-black w-full transition-colors cursor-pointer"
                        size="lg"
                        onClick={() => router.push("/dashboard")}
                    >
                        <Image
                            src="/Icons/Google Color.svg"
                            width={20}
                            height={20}
                            alt="Google logo"
                        />
                        Continue with Google
                    </Button>

                    <Button
                        className="flex items-center justify-center gap-2 bg-white hover:bg-neutral-200 font-semibold text-black w-full transition-colors cursor-pointer"
                        size="lg"
                        onClick={() => router.push("/dashboard")}
                    >
                        <Image
                            src="/Icons/Github.svg"
                            width={20}
                            height={20}
                            alt="Github logo"
                        />
                        Continue with Github
                    </Button>

                    <Separator className="my-1.5" />

                    <div className="w-full flex flex-col gap-1.5">
                        <Input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            required
                            onChange={(e) => {
                                setEmail(e.target.value);
                                if (error) setError("");
                            }}
                            onKeyDown={(e) => e.key === "Enter" && handleEmailContinue()}
                            className={`bg-neutral-800 border-none text-white placeholder:text-neutral-500 ${error ? "ring-1 ring-red-500" : ""}`}
                        />
                        {error && (
                            <p className="text-xs text-red-400 text-left px-1">{error}</p>
                        )}
                    </div>

                    <Button
                        size="lg"
                        className="flex items-center justify-center gap-2 bg-[#34E8B0] hover:bg-[#32D9A5] text-black font-semibold w-full transition-colors cursor-pointer"
                        onClick={handleEmailContinue}
                    >
                        <Image
                            src="/Icons/Letter.svg"
                            width={20}
                            height={20}
                            alt="Email icon"
                            className="invert"
                        />
                        Continue with email
                    </Button>
                </CardContent>
                <CardFooter>
                    <p className="text-sm text-neutral-400">
                        Using a school or work account?{" "}
                        <Link href="/signup-org" className="underline hover:text-white transition-colors">
                            Sign in with your organisation
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
