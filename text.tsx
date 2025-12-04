// fn learn::reference($doc) = $doc->{name};

// *[_type == "event"]{
//   "headline": learn::reference(headline),
//   "venue": learn::reference(venue)
// }

/**
 * MODAL COMPONENT - CLIENT COMPONENT
 * 
 * This component requires 'use client' because it:
 * 1. Uses Zustand store hooks for state management (client-side only)
 * 2. Handles user interactions (click handlers, keyboard events)
 * 3. Manages animation state for smooth open/close transitions
 * 
 * It receives image data from server and connects it to client-side state management.
 */

'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { ImageModel } from '@/app/lib/data/model';
import { useUIStore } from '@/app/lib/store';
import Button from './components/ui/Button';


interface ModalComponentProps {
  /**
   * The image to display in the modal.
   * Passed as a prop from parent Server Component.
   */
  image: ImageModel | null;
}

/**
 * Modal component for displaying full-size image details.
 * 
 * Uses Zustand store for visibility state to demonstrate integration
 * between server-side data and client-side state management.
 * 
 * ARCHITECTURAL NOTE: While this component is a client component due to interactivity,
 * the image data itself comes from the server, maintaining the security boundary
 * where authorization checks happen server-side.
 * 
 * @param props - Component props
 * @returns JSX element representing the modal or null
 */
export function ModalComponent({ image }: ModalComponentProps) {
  // Retrieve modal visibility and actions from Zustand store
  const { isModalOpen, closeModal } = useUIStore();

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isModalOpen, closeModal]);

  // Don't render if modal is closed or no image is selected
  if (!isModalOpen || !image) {
    return null;
  }

  return (
    <>
      {/* Backdrop - semi-transparent overlay behind modal */}
      <div
        className="fixed inset-0 z-40 bg-black/50 transition-opacity"
        onClick={closeModal}
        role="presentation"
        aria-hidden="true"
      />

      {/* Modal container */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center md:p-4 p-4 overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="w-full max-w-2xl rounded-lg bg-card shadow-lg max-h-[calc(100vh-4rem)] overflow-y-auto mx-4">
          {/* Close button */}
          <div className="flex items-center justify-between border-b border-border p-4 sticky top-0 bg-card z-10">
            <h2 id="modal-title" className="text-xl font-semibold text-card-foreground">
              {image.title}
            </h2>
            <button
              onClick={closeModal}
              className="rounded-md p-1 hover:bg-muted transition-colors"
              aria-label="Close modal"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Modal content */}
          <div className="p-6">
            {/* Image display */}
            <div className="relative mb-4 h-[min(60vh,24rem)] w-full overflow-hidden rounded-md bg-muted">
              <Image
                src={image.url || "/placeholder.svg"}
                alt={image.title}
                fill
                className="object-cover"
                placeholder="blur"
                blurDataURL={image.placeholderDataUrl}
                sizes="(max-width: 640px) 100vw, 80vw"
              />
            </div>

            {/* Image metadata */}
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-card-foreground">Description</h3>
                <p className="text-sm text-muted-foreground">{image.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-semibold text-card-foreground">Dimensions</p>
                  <p className="text-muted-foreground">
                    {image.width} × {image.height}px
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-card-foreground">File Size</p>
                  <p className="text-muted-foreground">
                    {(image.fileSize / 1024).toFixed(2)} KB
                  </p>
                </div>
              </div>

              <div>
                <p className="font-semibold text-card-foreground">Uploaded</p>
                <p className="text-sm text-muted-foreground">
                  {image.createdAt.toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Modal footer with close button */}
            <div className="mt-6 flex justify-end gap-2">
              <Button variant="outline" onClick={closeModal}>
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}