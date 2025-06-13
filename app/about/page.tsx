import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "WhatBytes - About Us",
    description:
        "Learn more about WhatBytes and our mission to provide quality products",
};

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    About WhatBytes
                </h1>
                <p className="text-xl text-gray-600">
                    Your trusted online shopping destination
                </p>
            </div>

            <div className="prose prose-lg mx-auto">
                <div className="bg-white rounded-lg shadow-md p-8 mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                        Our Story
                    </h2>
                    <p className="text-gray-600 mb-6">
                        WhatBytes was founded with a simple mission: to make
                        online shopping easy, reliable, and enjoyable for
                        everyone. We believe that everyone deserves access to
                        quality products at affordable prices.
                    </p>

                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                        What We Offer
                    </h2>
                    <ul className="text-gray-600 mb-6 space-y-2">
                        <li>• Wide selection of electronics and gadgets</li>
                        <li>• Premium jewelry collections</li>
                        <li>• Fashion-forward clothing for men and women</li>
                        <li>• Competitive prices and regular discounts</li>
                        <li>• Fast and reliable shipping</li>
                    </ul>

                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                        Our Commitment
                    </h2>
                    <p className="text-gray-600">
                        We are committed to providing excellent customer service
                        and ensuring your satisfaction with every purchase. Our
                        team works tirelessly to bring you the latest products
                        and the best shopping experience possible.
                    </p>
                </div>
            </div>
        </div>
    );
}
