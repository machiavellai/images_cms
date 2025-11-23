/**
 * DATA ACCESS LAYER (DAL)
 * 
 * The DAL is a server-only abstraction that handles all data fetching and mutations.
 * This separation ensures:
 * - Security boundaries are clearly defined
 * - Mock data can easily be replaced with real database calls
 * - Data transformation logic is centralized
 * - Authorization checks can be enforced consistently
 * 
 * RENDERING STRATEGY: These functions are intended to be called from Server Components
 * and Server Actions only. They must never be exposed to client-side code.
 */

import { ImageModel } from "./model";


/**
 * MOCK DATA: In production, this would query a real database with proper connection pooling.
 * For this MVP, we use in-memory mock data to demonstrate the architecture.
 */
const MOCK_IMAGES: ImageModel[] = [
    {
        id: '1',
        slug: 'mountain-sunset',
        title: 'Mountain Sunset',
        description: 'A beautiful golden hour landscape over mountain peaks',
        url: '/majestic-mountain-sunset.png',
        placeholderDataUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2QxYzRlOSIvPjwvc3ZnPg==',
        width: 1200,
        height: 800,
        fileSize: 245000,
        uploadedBy: 'admin-user-1',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15'),
        isPublished: true,
    },
    {
        id: '2',
        slug: 'forest-path',
        title: 'Forest Path',
        description: 'Winding path through a dense green forest',
        url: '/forest-path.png',
        placeholderDataUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzJkNTAxNiIvPjwvc3ZnPg==',
        width: 1200,
        height: 800,
        fileSize: 312000,
        uploadedBy: 'admin-user-1',
        createdAt: new Date('2024-01-10'),
        updatedAt: new Date('2024-01-10'),
        isPublished: true,
    },
    {
        id: '3',
        slug: 'ocean-waves',
        title: 'Ocean Waves',
        description: 'Dramatic ocean waves crashing against rocks',
        url: '/ocean-waves.png',
        placeholderDataUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzA0N2VmZiIvPjwvc3ZnPg==',
        width: 1200,
        height: 800,
        fileSize: 289000,
        uploadedBy: 'admin-user-1',
        createdAt: new Date('2024-01-05'),
        updatedAt: new Date('2024-01-05'),
        isPublished: true,
    },
    {
        id: '4',
        slug: 'city-lights',
        title: 'City Lights',
        description: 'Glowing cityscape at night with colorful light trails',
        url: '/city-lights-night.png',
        placeholderDataUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzEyMTMxZiIvPjwvc3ZnPg==',
        width: 1200,
        height: 800,
        fileSize: 356000,
        uploadedBy: 'admin-user-1',
        createdAt: new Date('2023-12-28'),
        updatedAt: new Date('2023-12-28'),
        isPublished: true,
    },
    {
        id: '5',
        slug: 'desert-dunes',
        title: 'Desert Dunes',
        description: 'Golden sand dunes stretching to the horizon',
        url: '/desert-sand-dunes.png',
        placeholderDataUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2M0OTMyYiIvPjwvc3ZnPg==',
        width: 1200,
        height: 800,
        fileSize: 278000,
        uploadedBy: 'admin-user-1',
        createdAt: new Date('2023-12-20'),
        updatedAt: new Date('2023-12-20'),
        isPublished: true,
    },
    {
        id: '6',
        slug: 'autumn-leaves',
        title: 'Autumn Leaves',
        description: 'Vibrant fall foliage in a park setting',
        url: '/autumn-fall-leaves.jpg',
        placeholderDataUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2ZhNjc0YyIvPjwvc3ZnPg==',
        width: 1200,
        height: 800,
        fileSize: 301000,
        uploadedBy: 'admin-user-1',
        createdAt: new Date('2023-12-15'),
        updatedAt: new Date('2023-12-15'),
        isPublished: true,
    },
    // Add 6 more images for 12-item pagination
    {
        id: '7',
        slug: 'northern-lights',
        title: 'Northern Lights',
        description: 'Aurora Borealis dancing across the arctic sky',
        url: '/northern-lights-aurora.png',
        placeholderDataUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzAwMjE0YiIvPjwvc3ZnPg==',
        width: 1200,
        height: 800,
        fileSize: 334000,
        uploadedBy: 'admin-user-1',
        createdAt: new Date('2023-12-10'),
        updatedAt: new Date('2023-12-10'),
        isPublished: true,
    },
    {
        id: '8',
        slug: 'waterfall',
        title: 'Waterfall',
        description: 'Cascading waterfall in a lush valley',
        url: '/waterfall-cascade.png',
        placeholderDataUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzE3Yzc0YiIvPjwvc3ZnPg==',
        width: 1200,
        height: 800,
        fileSize: 267000,
        uploadedBy: 'admin-user-1',
        createdAt: new Date('2023-12-05'),
        updatedAt: new Date('2023-12-05'),
        isPublished: true,
    },
    {
        id: '9',
        slug: 'snowy-mountains',
        title: 'Snowy Mountains',
        description: 'Snow-capped peaks against a clear blue sky',
        url: '/snowy-mountains-peaks.jpg',
        placeholderDataUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y4ZjlmYSIvPjwvc3ZnPg==',
        width: 1200,
        height: 800,
        fileSize: 298000,
        uploadedBy: 'admin-user-1',
        createdAt: new Date('2023-11-30'),
        updatedAt: new Date('2023-11-30'),
        isPublished: true,
    },
    {
        id: '10',
        slug: 'wildflower-field',
        title: 'Wildflower Field',
        description: 'Colorful wildflowers blooming in an open meadow',
        url: '/wildflower-field-meadow.jpg',
        placeholderDataUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2ZmZjBmNiIvPjwvc3ZnPg==',
        width: 1200,
        height: 800,
        fileSize: 312000,
        uploadedBy: 'admin-user-1',
        createdAt: new Date('2023-11-25'),
        updatedAt: new Date('2023-11-25'),
        isPublished: true,
    },
    {
        id: '11',
        slug: 'starry-night',
        title: 'Starry Night',
        description: 'Milky way and countless stars visible in the night sky',
        url: '/starry-night-milkyway.jpg',
        placeholderDataUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzA0MDQxMiIvPjwvc3ZnPg==',
        width: 1200,
        height: 800,
        fileSize: 276000,
        uploadedBy: 'admin-user-1',
        createdAt: new Date('2023-11-20'),
        updatedAt: new Date('2023-11-20'),
        isPublished: true,
    },
    {
        id: '12',
        slug: 'tropical-beach',
        title: 'Tropical Beach',
        description: 'White sand beach with crystal clear turquoise water',
        url: '/tropical-beach-paradise.png',
        placeholderDataUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzAwZjBmZiIvPjwvc3ZnPg==',
        width: 1200,
        height: 800,
        fileSize: 344000,
        uploadedBy: 'admin-user-1',
        createdAt: new Date('2023-11-15'),
        updatedAt: new Date('2023-11-15'),
        isPublished: true,
    },
];

/**
 * Fetches all published images with pagination support.
 * 
 * PERFORMANCE STRATEGY: This function is called with ISR (Incremental Static Regeneration)
 * to cache results for 60 seconds. This ensures the public gallery remains fast while still
 * allowing admin updates to propagate within a minute.
 * 
 * @param page - The page number for pagination (1-indexed)
 * @param pageSize - Number of items per page (defaults to 12)
 * @returns Promise resolving to array of published images
 */
export async function fetchImages(page: number = 1, pageSize: number = 12): Promise<ImageModel[]> {
    // Simulate network delay for realism
    await new Promise((resolve) => setTimeout(resolve, 100));

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    return MOCK_IMAGES.filter((img) => img.isPublished).slice(startIndex, endIndex);
}

/**
 * Fetches a single image by slug.
 * 
 * @param slug - The image slug identifier
 * @returns Promise resolving to the image or null if not found
 */
export async function fetchImageBySlug(slug: string): Promise<ImageModel | null> {
    await new Promise((resolve) => setTimeout(resolve, 50));
    return MOCK_IMAGES.find((img) => img.slug === slug && img.isPublished) || null;
}

/**
 * Gets total count of published images for pagination calculations.
 * 
 * @returns Promise resolving to the count of published images
 */
export async function getImageCount(): Promise<number> {
    await new Promise((resolve) => setTimeout(resolve, 50));
    return MOCK_IMAGES.filter((img) => img.isPublished).length;
}

/**
 * Server-side function to add a new image (called from Server Action).
 * 
 * NOTE: In production, this would interact with a real database and include
 * parameterized queries to prevent SQL injection.
 * 
 * @param imageData - The image metadata to store
 * @returns Promise resolving to the created image
 */
export async function createImage(imageData: Partial<ImageModel>): Promise<ImageModel> {
    await new Promise((resolve) => setTimeout(resolve, 200));

    const newImage: ImageModel = {
        id: String(MOCK_IMAGES.length + 1),
        slug: imageData.slug || `image-${Date.now()}`,
        title: imageData.title || 'Untitled',
        description: imageData.description || '',
        url: imageData.url || '',
        placeholderDataUrl: imageData.placeholderDataUrl || '',
        width: imageData.width || 1200,
        height: imageData.height || 800,
        fileSize: imageData.fileSize || 0,
        uploadedBy: imageData.uploadedBy || 'unknown',
        createdAt: new Date(),
        updatedAt: new Date(),
        isPublished: imageData.isPublished ?? false,
    };

    MOCK_IMAGES.push(newImage);
    return newImage;
}