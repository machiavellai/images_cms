import { useUIStore } from '@/app/lib/store';
import React, { useState } from 'react'
/**
 * IMAGE UPLOAD FORM - CLIENT COMPONENT
 * 
 * This component requires 'use client' because it:
 * - Handles form submissions with events (onChange, onSubmit)
 * - Uses Zustand store for loading state
 * - Manages local form state with useState
 * 
 * SECURITY NOTE: While the form is client-side, the actual upload is handled
 * by a Server Action (uploadNewImage) which performs authorization and validation.
 */
'use client'


interface ImageUploadFormProps {
    /**
     * Callback invoked when upload succeeds.
     * Should trigger parent component to refresh image list.
     */
    onSuccess?: () => void;
}


/**
 * Form component for uploading new images to the gallery.
 * 
 * FORM FLOW:
 * 1. User fills in title, slug, and description
 * 2. Form submission triggers Server Action (uploadNewImage)
 * 3. Server Action validates authorization and input
 * 4. On success, form resets and callback is invoked
 * 5. On error, user sees error message
 * 
 * @param props - Component props
 * @returns JSX element representing the upload form
 */

function imageUploadForm({ onSuccess }: ImageUploadFormProps) {

    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        description: '',
    });


    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    // Get loading state from Zustand store
    const isLoading = useUIStore((state) => state.isUploadFormLoading);
    const setLoading = useUIStore((state) => state.setUploadLoading);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setError(null); // Clear error on user input
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
    }

    return (
        <div>
            <h1>imageUploadForm</h1>
        </div>
    )
}

export default imageUploadForm
