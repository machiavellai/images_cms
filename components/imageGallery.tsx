/**
 * IMAGE GALLERY COMPONENT - CLIENT COMPONENT
 * 
 * This component requires 'use client' because it:
 * 1. Handles pagination state changes and click events
 * 2. Integrates with Zustand store to open modal on image click
 * 3. Manages pagination controls interactivity
 * 
 * The actual image data is passed from parent Server Component,
 * maintaining server-side authorization boundaries.
 */

'use client'
import { ImageModel } from '@/app/lib/data/model';
import { useUIStore } from '@/app/lib/store';
import { ImageCard } from './imageCard';
import Button from './ui/Button';


interface ImageGalleryProps {
  /**
   * Array of images to display in the gallery grid.
   * Should come from fetchImages() DAL function via parent Server Component.
   */
  images: ImageModel[];

  /**
   * Total count of available images for pagination calculations.
   * Used to determine if pagination controls should be shown.
   */
  totalImages: number;

  /**
   * Current page number (1-indexed).
   * Used to display pagination state and enable/disable prev/next buttons.
   */
  currentPage: number;

  /**
   * Number of images per page (typically 12 for gallery grid).
   * Used to calculate pagination controls and determine if next page exists.
   */
  pageSize: number;

  /**
   * Callback function invoked when user clicks page navigation.
   * Should trigger data refetch and scroll to top of gallery.
   * 
   * @param newPage - The page number to navigate to
   */
  onPageChange?: (newPage: number) => void;
}


export function imageGallery({
  images,
  totalImages,
  currentPage,
  pageSize,
  onPageChange
}: ImageGalleryProps) {

  // Get modal actions from Zustand store
  const openModal = useUIStore((state) => state.openModal);

  // Calculate pagination info
  const totalPages = Math.ceil(totalImages / pageSize);
  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;


  // PERFORMANCE: useCallback-like behavior via Zustand - the openModal function
  // reference remains stable across renders, preventing child re-renders
  const handleImageClick = (imageId: string) => {
    openModal(imageId);
  };
  return (
    <div className='w-full space-y-8'>


      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {images.map((image) => (
          <ImageCard
            key={image.id}
            image={image}
            onClick={handleImageClick}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              disabled={!hasPrevPage}
              onClick={() => onPageChange?.(currentPage - 1)}
            >
              Previous
            </Button>

            {/* Page number indicators */}
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => onPageChange?.(page)}
                  className={`h-8 w-8 rounded ${page === currentPage
                      ? 'bg-primary text-primary-foreground'
                      : 'border border-border hover:bg-muted'
                    }`}
                  aria-current={page === currentPage ? 'page' : undefined}
                >
                  {page}
                </button>
              ))}
            </div>

            <Button
              variant="outline"
              disabled={!hasNextPage}
              onClick={() => onPageChange?.(currentPage + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}

    </div>
  )
}

