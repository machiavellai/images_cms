'use client';

import { create } from 'zustand';


/**
 * ARCHITECTURAL RATIONALE: 
 * Zustand is selected for this application because it provides:
 * 1. Minimal boilerplate compared to Context API or Redux - important for App Router where we want to avoid excessive context nesting
 * 2. Excellent performance for transient UI state (modal visibility, form loading) - does not require re-rendering entire component trees
 * 3. Simplicity and small bundle size (3KB) - suitable for an MVP focused on performance
 * 4. No provider wrapper needed in layout - keeps App Router composition clean
 * 
 * This store manages ONLY client-side UI state, not domain data. Domain data mutations happen via Server Actions,
 * which ensures security boundaries are properly maintained and authorization checks happen server-side.
 */


interface UIState {
    // Modal state management for image details display
    selectedImageId: string | null;
    isModalOpen: boolean;

    // Admin form state management
    isUploadFormLoading: boolean;
    uploadFormError: string | null;

    // Pagination state
    currentPage: number;
}

interface UIActions {
    // Modal actions
    openModal: (imageId: string) => void;
    closeModal: () => void;

    // Upload form actions
    setUploadLoading: (loading: boolean) => void;
    setUploadError: (error: string | null) => void;

    // Pagination actions
    setCurrentPage: (page: number) => void;
}

/**
 * Zustand store hook for managing transient UI state across the application.
 * This store is intentionally shallow and doesn't persist data - it's purely for UI interactions.
 * 
 * @returns {UIState & UIActions} The current state and action functions
 */
export const useUIStore = create<UIState & UIActions>((set) => ({
    // Initial state
    selectedImageId: null,
    isModalOpen: false,
    isUploadFormLoading: false,
    uploadFormError: null,
    currentPage: 1,

    // Modal actions
    openModal: (imageId: string) => set({ selectedImageId: imageId, isModalOpen: true }),
    closeModal: () => set({ isModalOpen: false, selectedImageId: null }),

    // Upload form actions
    setUploadLoading: (loading: boolean) => set({ isUploadFormLoading: loading }),
    setUploadError: (error: string | null) => set({ uploadFormError: error }),

    // Pagination actions
    setCurrentPage: (page: number) => set({ currentPage: page }),
}));