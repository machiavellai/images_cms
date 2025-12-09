'use client'

import { ImageModel } from '@/app/lib/data/model'
import { ImageGallery } from './imageGallery'
import { useUIStore } from '@/app/lib/store'
import ModalComponent from './modalComponent'

interface GalleryClientProps {
  images: ImageModel[]
}

export default function GalleryClient({ images }: GalleryClientProps) {
  const selectedImageId = useUIStore((s) => s.selectedImageId)
  const selectedImage = images.find((img) => img.id === selectedImageId) || null

  const handlePageChange = (newPage: number) => {
    // For now, pagination is handled by the server. Client can request new pages
    // in a future enhancement (client-side fetch or router navigation).
    console.log('page change', newPage)
  }

  return (
    <>
      <ImageGallery
        images={images}
        totalImages={images.length}
        currentPage={1}
        pageSize={12}
        onPageChange={handlePageChange}
      />

      <ModalComponent image={selectedImage} />
    </>
  )
}
