import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Check} from "lucide-react";
import Link from "next/link";
import {Badge} from "@/components/ui/badge";
import {movatif} from "@/app/fonts";


export default function PricingModelPage() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center">
            <h1
                className={`text-3xl font-normal text-white ${movatif.className}`}
            >
                Choose Your Plan
            </h1>
            <div className="flex flex-nowrap justify-center gap-2 overflow-x-auto mt-2">
                {/* Free Plan */}
                <Card
                    className="w-full max-w-[300px] h-[450px] bg-neutral-900 border border-neutral-800 flex flex-col text-center">
                    <CardHeader className="flex flex-col items-start text-left space-y-1">
                        <CardTitle className="text-sm">Free</CardTitle>
                        <div>
                            <p className="text-sm font-semibold">
                                $0.00 <span className="font-normal">USD / month</span>
                            </p>
                            <p className="text-xs font-semibold text-neutral-400">
                                Perfect to get started
                            </p>
                        </div>
                        <p className="text-xs font-normal">
                            Upgrade productivity and learning with basic access.
                        </p>
                    </CardHeader>
                    <CardContent>
                        <Button
                            size="lg"
                            variant={'outline'}
                            className="bg-[#34E8B0] hover:bg-[#32D9A5] font-semibold w-full"
                        >
                            Continue
                        </Button>
                    </CardContent>
                    <CardContent className="space-y-1 text-xs text-neutral-500">
                        <ul className="space-y-0.25 text-left list-none">
                            <li className="flex items-start">
                                <span className="mr-1"><Check className="w-4 h-5 text-neutral-500"/></span>
                                Personalized AI study plan
                            </li>
                            <li className="flex items-start">
                                <span className="mr-1"><Check className="w-4 h-5 text-neutral-500"/></span>
                                Interactive flashcards with AI hints
                            </li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <p className="text-xs text-neutral-500">
                            Existing subscriber?{" "}
                            <Link href="#" className="underline hover:text-white">
                                See billing help
                            </Link>
                        </p>
                    </CardFooter>
                </Card>

                {/* Pro Plan */}
                <Card
                    className="w-full max-w-[300px] h-[450px] bg-neutral-900 border border-neutral-800 flex flex-col text-center">
                    <CardHeader className="flex flex-col items-start text-left space-y-1">
                        <div className="flex justify-between gap-33">
                            <CardTitle className="text-sm">Pro</CardTitle>
                            <Badge  className="bg-[#34E8B0] text-black text-xs">
                                Popular
                            </Badge>
                        </div>
                        <div>
                            <p className="text-sm font-semibold">
                                $29.99 <span className="font-normal">USD / month</span>
                            </p>
                            <p className="text-xs font-semibold">
                                $24.99 <span className="font-normal text-neutral-400">billed annually</span>
                            </p>
                        </div>
                        <p className="text-xs font-normal">
                            Boost your learning with advanced AI tools and analytics.
                        </p>
                    </CardHeader>
                    <CardContent>
                        <Button
                            size="lg"
                            className="bg-[#34E8B0] hover:bg-[#32D9A5] text-black font-semibold w-full"
                        >
                            Get Pro
                        </Button>
                    </CardContent>
                    <CardContent className="space-y-1 text-xs text-neutral-500">
                        <ul className="space-y-0.25 text-left list-none">
                            <li className="flex items-start">
                                <span className="mr-1"><Check className="w-4 h-5 text-neutral-500"/></span>
                                All Free plan features
                            </li>
                            <li className="flex items-start">
                                <span className="mr-1"><Check className="w-4 h-5 text-neutral-500"/></span>
                                Smart progress tracking & analytics
                            </li>
                            <li className="flex items-start">
                                <span className="mr-1"><Check className="w-4 h-5 text-neutral-500"/></span>
                                AI-powered quiz generator
                            </li>
                            <li className="flex items-start">
                                <span className="mr-1"><Check className="w-4 h-5 text-neutral-500"/></span>
                                Peer collaboration & study groups
                            </li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <p className="text-xs text-neutral-500">
                            Existing subscriber?{" "}
                            <Link href="#" className="underline hover:text-white">
                                See billing help
                            </Link>
                        </p>
                    </CardFooter>
                </Card>

                {/* Max Plan */}
                <Card
                    className="w-full max-w-[300px] h-[450px] bg-neutral-900 border border-neutral-800 flex flex-col text-center">
                    <CardHeader className="flex flex-col items-start text-left space-y-1">
                        <CardTitle className="text-sm">Max</CardTitle>
                        <div>
                            <p className="text-sm font-semibold">
                                $59.99 <span className="font-normal">USD / month</span>
                            </p>
                            <p className="text-xs font-semibold">
                                $49.99 <span className="font-normal text-neutral-400">billed annually</span>
                            </p>
                        </div>
                        <p className="text-xs font-normal">
                            Unlock all premium AI tools and integrations for ultimate productivity.
                        </p>
                    </CardHeader>
                    <CardContent>
                        <Button
                            size="lg"
                            className="bg-[#34E8B0] hover:bg-[#32D9A5] text-black font-semibold w-full"
                        >
                            Get Max
                        </Button>
                    </CardContent>
                    <CardContent className="space-y-1 text-xs text-neutral-500">
                        <ul className="space-y-0.25 text-left list-none">
                            <li className="flex items-start">
                                <span className="mr-1"><Check className="w-4 h-5 text-neutral-500"/></span>
                                All Pro plan features
                            </li>
                            <li className="flex items-start">
                                <span className="mr-1"><Check className="w-4 h-5 text-neutral-500"/></span>
                                Weekly performance insights via email
                            </li>
                            <li className="flex items-start">
                                <span className="mr-1"><Check className="w-4 h-5 text-neutral-500"/></span>
                                Integration with Notion, Google Calendar & Slack
                            </li>
                            <li className="flex items-start">
                                <span className="mr-1"><Check className="w-4 h-5 text-neutral-500"/></span>
                                Priority AI support & feature requests
                            </li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <p className="text-xs text-neutral-500">
                            Existing subscriber?{" "}
                            <Link href="#" className="underline hover:text-white">
                                See billing help
                            </Link>
                        </p>
                    </CardFooter>
                </Card>
            </div>
            <Button
                size="sm"
                variant="ghost"
                className="font-semibold w-full mt-2 w-xs"
            >
                Close
            </Button>

        </main>
    );
}
