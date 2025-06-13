import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-[#002f6c] text-white py-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Left Column - Filters */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Filters</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="hover:underline">
                                    All
                                </Link>
                            </li>
                        </ul>
                        <div className="mt-8 text-sm">© 2025 American</div>
                    </div>

                    {/* Middle Column - About Us */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">About Us</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/about" className="hover:underline">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact"
                                    className="hover:underline"
                                >
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Right Column - Follow Us */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">
                            Follow Us
                        </h3>
                        <div className="flex space-x-3">
                            <a
                                href="#"
                                className="bg-[#1565c0] p-2 rounded-full hover:bg-blue-700 transition-colors"
                                aria-label="Facebook"
                            >
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a
                                href="https://x.com/_justShailesh"
                                className="bg-[#1565c0] p-2 rounded-full hover:bg-blue-700 transition-colors"
                                aria-label="Twitter"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a
                                href="https://www.instagram.com/_justt.shailesh/"
                                className="bg-[#1565c0] p-2 rounded-full hover:bg-blue-700 transition-colors"
                                aria-label="Instagram"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Instagram className="h-5 w-5" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
