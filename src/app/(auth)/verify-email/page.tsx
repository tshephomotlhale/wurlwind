"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { movatif } from "@/app/fonts";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";

function VerifyEmailContent() {
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get("email") ?? "";

    function handleContinue() {
        if (otp.length < 6) {
            setError("Please enter the full 6-digit code.");
            return;
        }
        setError("");
        router.push("/dashboard");
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <Card className="w-full max-w-sm bg-transparent border-none shadow-none text-center flex flex-col items-center justify-center">
                <Button
                    variant="ghost"
                    className="w-full flex items-center justify-start gap-2 text-neutral-400 hover:text-white hover:bg-transparent transition-colors cursor-pointer px-0"
                    onClick={() => router.back()}
                >
                    <Image src="/Icons/Left.svg" width={25} height={25} alt="Back" />
                </Button>
                <CardHeader className="flex flex-col w-full items-center text-center">
                    <Image
                        src="/Icons/Letter.svg"
                        width={36}
                        height={36}
                        alt="Email logo"
                    />
                    <CardTitle
                        className={`text-3xl font-normal text-white ${movatif.className}`}
                    >
                        Verify your email
                    </CardTitle>
                    <p className="text-md font-semibold text-neutral-200">
                        We&apos;ve sent a 6-digit verification code to{" "}
                        <span className="text-white underline">{email}</span>
                    </p>
                </CardHeader>

                <CardContent className="w-full flex flex-col items-center justify-center gap-4">
                    {/* OTP Input */}
                    <div className="flex flex-col items-center gap-1.5">
                        <InputOTP
                            maxLength={6}
                            value={otp}
                            onChange={(val) => {
                                setOtp(val);
                                if (error) setError("");
                            }}
                            pattern={REGEXP_ONLY_DIGITS}
                        >
                            <InputOTPGroup>
                                <InputOTPSlot index={0} className={`w-12 h-12 text-2xl ${error ? "border-red-500" : ""}`} />
                                <InputOTPSlot index={1} className={`w-12 h-12 text-2xl ${error ? "border-red-500" : ""}`} />
                                <InputOTPSlot index={2} className={`w-12 h-12 text-2xl ${error ? "border-red-500" : ""}`} />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup>
                                <InputOTPSlot index={3} className={`w-12 h-12 text-2xl ${error ? "border-red-500" : ""}`} />
                                <InputOTPSlot index={4} className={`w-12 h-12 text-2xl ${error ? "border-red-500" : ""}`} />
                                <InputOTPSlot index={5} className={`w-12 h-12 text-2xl ${error ? "border-red-500" : ""}`} />
                            </InputOTPGroup>
                        </InputOTP>
                        {error && (
                            <p className="text-xs text-red-400">{error}</p>
                        )}
                    </div>

                    <Button
                        size="lg"
                        className="bg-[#34E8B0] hover:bg-[#32D9A5] text-black font-semibold w-full cursor-pointer transition-colors"
                        onClick={handleContinue}
                    >
                        Continue
                    </Button>

                    <p className="text-sm text-neutral-400">
                        Didn&apos;t receive it?{" "}
                        <Link href="#" className="underline hover:text-[#34E8B0] transition-colors">
                            Resend code
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}

export default function VerifyEmailPage() {
    return (
        <Suspense>
            <VerifyEmailContent />
        </Suspense>
    );
}
