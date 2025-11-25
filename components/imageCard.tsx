/**
 * IMAGE CARD COMPONENT
 * 
 * This component demonstrates Next.js Image optimization best practices.
 * It's used in the public gallery to display images efficiently.
 * 
 * RENDERING STRATEGY: This is a Server Component by default (no 'use client'),
 * which allows it to be hydrated with data from the server without client-side JavaScript overhead.
 */

import { ImageModel } from '@/app/lib/data/model';
import Image from 'next/image';

interface ImageCardProps {
    /**
     * The image data to display.
     * Should be populated from the Data Access Layer via Server Components.
     */
    image: ImageModel;

    /**
     * Optional callback when card is clicked.
     * Client-side interactivity can be added via a wrapper component using 'use client'.
     */
    onClick?: (imageId: string) => void;
}

/**
 * Renders an optimized image card with Next.js Image component.
 * 
 * PERFORMANCE BENEFITS:
 * - Next/image automatically serves WebP and AVIF formats to modern browsers
 * - Native lazy loading defers off-screen images until needed
 * - Automatic responsive image sizing based on device
 * - Blur placeholder prevents layout shift (CLS improvement)
 * - Responsive srcset generation eliminates serving oversized images
 * 
 * @param props - Component props including image data and optional click handler
 * @returns JSX element representing an optimized image card
 */
export function ImageCard({ image, onClick }: ImageCardProps) {
    return (
        <div
            onClick={() => onClick?.(image.id)}
            className="group cursor-pointer overflow-hidden rounded-lg bg-card shadow-md transition-shadow hover:shadow-lg"
        >
            {/* Image container with responsive aspect ratio */}
            <div className="relative h-64 w-full overflow-hidden bg-muted">
                <Image
                    // Core image properties
                    src={image.url || "/placeholder.svg"}
                    alt={image.title}

                    // PERFORMANCE: Fill container and maintain aspect ratio
                    fill
                    className="object-cover transition-transform group-hover:scale-105"

                    // PERFORMANCE: Blur placeholder prevents Cumulative Layout Shift (CLS)
                    // This base64-encoded SVG shows a low-quality placeholder while image loads
                    placeholder="blur"
                    blurDataURL={image.placeholderDataUrl}

                    // PERFORMANCE: Sizes attribute tells Next.js what viewport widths to optimize for
                    // This prevents serving a 1200px image to a 300px mobile viewport
                    // Format: (media query) rendered-size, (media query) rendered-size, default-size
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"

                    // PERFORMANCE: Priority loading for above-the-fold images (optional)
                    // Only set for first few images to avoid eager loading all at once
                    priority={false}

                    // PERFORMANCE: Enable native lazy loading by browser
                    loading="lazy"
                />
            </div>

            {/* Text content overlay */}
            <div className="p-4">
                <h3 className="truncate font-semibold text-card-foreground group-hover:text-primary">
                    {image.title}
                </h3>
                <p className="line-clamp-2 text-sm text-muted-foreground">
                    {image.description}
                </p>
            </div>
        </div>
    );
}