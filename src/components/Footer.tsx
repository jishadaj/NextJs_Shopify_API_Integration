import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 py-8">
            <div className="container mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Logo & About Section */}
                    <div>
                        <h2 className="text-2xl font-semibold text-white">Myshop</h2>
                        <p className="mt-2 text-sm text-gray-400">
                        Your one-stop destination for quality products and amazing deals.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-white">Quick Links</h3>
                        <ul className="mt-3 space-y-2">
                            <li><Link href="/" className="hover:text-gray-100">About Us</Link></li>
                            <li><Link href="/" className="hover:text-gray-100">Services</Link></li>
                            <li><Link href="/" className="hover:text-gray-100">Contact</Link></li>
                            <li><Link href="/" className="hover:text-gray-100">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Social Media Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-white">Follow Us</h3>
                        <div className="mt-3 flex space-x-4">
                            <Link href="#" className="hover:text-white"><FaFacebook size={20} /></Link>
                            <Link href="#" className="hover:text-white"><FaInstagram size={20} /></Link>
                            <Link href="#" className="hover:text-white"><FaTwitter size={20} /></Link>
                            <Link href="#" className="hover:text-white"><FaLinkedin size={20} /></Link>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
                    &copy; {new Date().getFullYear()} Myshop. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
