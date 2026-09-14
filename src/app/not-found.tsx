import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="pill-badge mb-4">
        <span className="badge-dot" />
        404 Not Found
      </div>
      <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 mb-4 tracking-tight">
        Page Not Found
      </h1>
      <p className="text-lg text-gray-600 max-w-md mb-8">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link href="/" className="btn-primary">
        <ArrowLeft size={18} />
        <span>Return to Home</span>
      </Link>
    </div>
  );
}
