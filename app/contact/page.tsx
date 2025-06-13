import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
    title: "WhatBytes - Contact Us",
    description: "Get in touch with WhatBytes customer support team",
};

export default function ContactPage() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Contact Us
                </h1>
                <p className="text-xl text-gray-600">
                    We&apos;d love to hear from you
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Contact Information */}
                <div className="bg-white rounded-lg shadow-md p-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                        Get in Touch
                    </h2>

                    <div className="space-y-6">
                        <div className="flex items-center space-x-4">
                            <div className="bg-blue-100 p-3 rounded-full">
                                <Mail className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-800">
                                    Email
                                </h3>
                                <p className="text-gray-600">
                                    support@whatbytes.com
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="bg-blue-100 p-3 rounded-full">
                                <Phone className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-800">
                                    Phone
                                </h3>
                                <p className="text-gray-600">
                                    (+91) 99999-99999
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="bg-blue-100 p-3 rounded-full">
                                <MapPin className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-800">
                                    Address
                                </h3>
                                <p className="text-gray-600">
                                    village of the hidden leaf
                                    <br />
                                    konoha
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="bg-blue-100 p-3 rounded-full">
                                <Clock className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-800">
                                    Business Hours
                                </h3>
                                <p className="text-gray-600">
                                    Monday - Friday: 9:00 AM - 6:00 PM
                                    <br />
                                    Saturday: 10:00 AM - 4:00 PM
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="bg-white rounded-lg shadow-md p-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                        Send us a Message
                    </h2>

                    <form className="space-y-4">
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Your name"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="your@email.com"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="subject"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Subject
                            </label>
                            <input
                                type="text"
                                id="subject"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="How can we help?"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="message"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Message
                            </label>
                            <textarea
                                id="message"
                                rows={4}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Your message..."
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#1565c0] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#0d47a1] transition-colors"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
