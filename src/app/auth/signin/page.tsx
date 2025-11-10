import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { movatif } from "@/app/fonts";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function SignupCard() {
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
                        <Link href="#" className="underline hover:text-white">
                            privacy policy
                        </Link>.
                    </p>
                </CardHeader>

                <CardContent className="w-full max-w-sm flex flex-col items-center justify-center gap-3">
                    <Button className="flex items-center justify-center gap-2 bg-white font-semibold text-black w-full" size="lg">
                        <Image
                            src="/Icons/Google Color.svg"
                            width={20}
                            height={20}
                            alt="Google logo"
                        />
                        Continue with Google
                    </Button>

                    <Button className="flex items-center justify-center gap-2 bg-white font-semibold text-black w-full" size="lg">
                        <Image
                            src="/Icons/Github.svg"
                            width={20}
                            height={20}
                            alt="Github logo"
                        />
                        Continue with Github
                    </Button>

                    <Separator className="my-1.5" />

                    <Input
                        type="email"
                        placeholder="Enter your email"
                        className="bg-neutral-800 border-none text-white placeholder:text-neutral-500"
                    />

                    <Button size={"lg"} className="bg-[#34E8B0] hover:bg-[#32D9A5]text-black font-semibold w-full">
                        Continue with email
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
