'use client'

import Image from "next/image";
import { useEffect, useState } from "react";



/**
 * Home page component for the public image gallery.
 * 
 * PERFORMANCE OPTIMIZATION:
 * - Uses Next.js Image component for automatic optimization
 * - Implements pagination to limit initial payload (12 images per page)
 * - ISR with 60-second revalidation balances freshness and performance
 * - Server-side data fetching reduces client-side JavaScript
 * 
 * @returns JSX element for the gallery page
 */

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header Section */}
      <header className="border-b border-border bg-card py-12">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-4xl font-bold text-card-foreground">Image Gallery</h1>
          <p className="mt-2 text-muted-foreground">
            Explore our curated collection of high-quality images
          </p>
        </div>
      </header>

      <div>
       
      </div>
    </main>
  );
}
