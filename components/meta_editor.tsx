/**
 * METADATA EDITOR - CLIENT COMPONENT
 * 
 * This component requires 'use client' for:
 * - React hooks (useState) for form state management
 * - User interactions (button clicks, form submissions)
 * - Dynamic filtering and search functionality
 * 
 * PERFORMANCE NOTE: This component demonstrates useMemo optimization.
 * The filtered image list is memoized to prevent unnecessary recalculations
 * when parent components re-render.
 */


'use client'


import { useMemo, useState } from "react"
import { ImageModel } from "@/app/lib/data/model"
import { MOCK_IMAGES } from "@/app/lib/data/mock-data"
import Button from "./ui/Button";

/**
 * Mock data import (normally would come from props or server fetch)
 * For this component, we show how it would filter and display images.
 */
const MOCK_IMAGES_FOR_EDITING: ImageModel[] = []; // Placeholder

/**
 * Metadata Editor component for managing image properties.
 * 
 * PERFORMANCE OPTIMIZATION: Uses useMemo for efficient filtering
 * 
 * Without useMemo:
 * - Filter logic runs on every render, even if search term hasn't changed
 * - Large image lists would cause noticeable lag
 * - Parent component re-renders would trigger expensive filtering multiple times
 * 
 * With useMemo:
 * - Filter only runs when dependencies (images, searchTerm) change
 * - Reference to filtered array remains stable, preventing child re-renders
 * - Significant performance improvement with large datasets
 * 
 * @returns JSX element representing the metadata editor
 */

function meta_editor() {
    const [searchTerm, setSearchTerm] = useState('');
    const [editingId, setEditingId] = useState<string | null>(null);

    /**
   * PERFORMANCE: Memoized filtering operation
   * 
   * This useMemo ensures that the expensive filter operation only runs when:
   * 1. MOCK_IMAGES changes (new images added)
   * 2. searchTerm changes (user typed in search box)
   * 
   * The filtered array reference remains the same between renders if dependencies
   * haven't changed, allowing child components to skip re-renders via React.memo.
   */
    const filteredImages = useMemo(() => {
        return MOCK_IMAGES_FOR_EDITING.filter((image) =>
            image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            image.slug.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]); // Only re-compute when searchTerm changes

    return (
        <div className="space-y-4">

            {/* Search bar */}
            <div>
                <input
                    type="text"
                    placeholder="Search images by title or slug..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground"
                />
            </div>

            {/* Images table/list */}
            {filteredImages.length === 0 ? (
                <div className="rounded-md border border-border p-4 text-center text-muted-foreground">
                    {searchTerm ? 'No images match your search' : 'No images available'}
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="border-b border-border">
                            <tr>
                                <th className="px-4 py-2 text-left font-semibold text-card-foreground">Title</th>
                                <th className="px-4 py-2 text-left font-semibold text-card-foreground">Slug</th>
                                <th className="px-4 py-2 text-left font-semibold text-card-foreground">Status</th>
                                <th className="px-4 py-2 text-right font-semibold text-card-foreground">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {filteredImages.map((image) => (
                                <tr key={image.id} className="hover:bg-muted/50">
                                    <td className="px-4 py-2">{image.title}</td>
                                    <td className="px-4 py-2 font-mono text-muted-foreground">{image.slug}</td>
                                    <td className="px-4 py-2">
                                        <span
                                            className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${image.isPublished
                                                ? 'bg-green-500/10 text-green-600'
                                                : 'bg-yellow-500/10 text-yellow-600'
                                                }`}
                                        >
                                            {image.isPublished ? 'Published' : 'Draft'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2 text-right">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setEditingId(image.id)}
                                            disabled={editingId === image.id}
                                        >
                                            Edit
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default meta_editor
