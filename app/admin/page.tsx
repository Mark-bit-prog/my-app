"use client";

import Link from "next/link";
import { useState } from "react";

export default function AdminPage() {
  const [authToken] = useState(true);

  const adminLinks = [
    { name: "Pages Settings", href: "/admin/settings" },
    { name: "Manage Products", href: "/admin/products" },
    { name: "View Orders", href: "/admin/orders" },
    { name: "Analytics Dashboard", href: "/admin/analytics" },
    { name: "Customer Support", href: "/admin/support" },
  ];

  return authToken ? (
    <div className="max-w-6xl mx-auto px-8 py-12">
      <h1 className="text-3xl font-bold">Admin Page</h1>

      <div>
        <p className="mt-4 text-gray-600">
          Welcome to the admin page! Here you can manage your products, view
          orders, and update your store settings.
        </p>

        <p className="mt-1 text-gray-600">
          Use the navigation menu to access different sections of the admin
          dashboard.
        </p>

        <p className="mt-1 text-gray-600">
          If you have any questions or need assistance, please contact support.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mt-8 mb-4">Admin Actions</h2>

        <ul className=" text-gray-600 text-xl">
          {adminLinks.map((link) => (
            <li key={link.name} className="my-2">
              <Link href={link.href} className="text-blue-500 hover:underline">
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  ) : null;
}
