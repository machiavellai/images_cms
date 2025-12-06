'use client'

import Image from "next/image";
import { useEffect, useState } from "react";
import { ImageModel } from "../lib/data/model";
import { ModalComponent } from "../../../text";
import { fetchImages, getImageCount } from "../lib/data";
import { useUIStore } from "../lib/store";
import { ImageGallery } from "../../../components/imageGallery";

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

  const [images, setImages] = useState<ImageModel[]>([])
  const [totalImages, setTotalImages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);


  // Get selected image from store for modal display
  const selectedImageId = useUIStore((state) => state.selectedImageId);
  const selectedImage = images.find((img) => img.id === selectedImageId) || null;


  // Fetch images on mount and page change

  useEffect(() => {

    const loadImages = async () => {
      setIsLoading(true);
      try {
        const [fetchedImages, count] = await Promise.all([
          fetchImages(currentPage, 12),
          getImageCount(),
        ]);
        setImages(fetchedImages);
        setTotalImages(count);
      } catch (error) {
        console.log("Failed to load images due to : ", error);
      }
      finally {
        setIsLoading(false);
      }
    }
    loadImages();
  }, [currentPage])

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


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

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-12" >
        {isLoading ? (
          <div className="flex h-96 items-center justify-center">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full border-4 border-muted border-t-primary h-8 w-8"></div>
              <p className="mt-4 text-muted-foreground">Loading images...</p>
            </div>
          </div>
        ) : (
          <ImageGallery
            images={images}
            totalImages={totalImages}
            currentPage={currentPage}
            pageSize={12}
            onPageChange={handlePageChange}
          />
        )}
      </div>
      <ModalComponent image={
        selectedImage
      }/>
    </main >
  );
}
