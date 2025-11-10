"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

export default function VerifyEmailCard() {
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <Card className="w-full max-w-sm bg-transparent border-none shadow-none text-center flex flex-col items-center justify-center">
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
                        We’ve sent a 6-digit verification code to {" "}
                        <Link href="#" className="underline hover:text-white">
                            tbxmotlhale@gmail.com
                        </Link>
                    </p>
                </CardHeader>

                <CardContent className="w-full flex flex-col items-center justify-center gap-4">
                    {/* OTP Input */}
                    <InputOTP maxLength={6}>
                        <InputOTPGroup>
                            <InputOTPSlot index={0} className="w-12 h-12 text-2xl"/>
                            <InputOTPSlot index={1} className="w-12 h-12 text-2xl"/>
                            <InputOTPSlot index={2} className="w-12 h-12 text-2xl"/>
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                            <InputOTPSlot index={3} className="w-12 h-12 text-2xl"/>
                            <InputOTPSlot index={4} className="w-12 h-12 text-2xl"/>
                            <InputOTPSlot index={5} className="w-12 h-12 text-2xl"/>
                        </InputOTPGroup>
                    </InputOTP>

                    <Button
                        size="lg"
                        className="bg-[#34E8B0] hover:bg-[#32D9A5] text-black font-semibold w-full"
                    >
                        Continue
                    </Button>

                    <p className="text-sm text-neutral-400">
                        Didn’t receive it?{" "}
                        <Link href="#" className="underline hover:text-[#34E8B0]">
                            Resend code
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
