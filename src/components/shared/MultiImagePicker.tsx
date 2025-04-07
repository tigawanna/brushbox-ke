"use client"

import { X } from "lucide-react"
import { useState, useEffect } from "react"
import { motion } from "motion/react"

interface MultiImagePickerProps {
  images?: (string | Blob)[]
  setImages?: (images: (string | Blob)[]) => void
  setImageBlobs?: (blobs: File[]) => void
  maxImages?: number
  className?: string
  accept?: React.InputHTMLAttributes<HTMLInputElement>["accept"]
  multiple?: boolean
}

export function MultiImagePicker({
  images = [],
  setImages,
  setImageBlobs,
  maxImages = 5,
  className = "",
  accept = "image/*",
  multiple = true,
}: MultiImagePickerProps) {
  const [dragActive, setDragActive] = useState<boolean>(false)
  const [fileObjects, setFileObjects] = useState<File[]>([])
  const [previewUrls, setPreviewUrls] = useState<string[]>([])
  
  // Generate preview URLs from images (which can be strings or Blobs)
  useEffect(() => {
    // Cleanup previous object URLs to prevent memory leaks
    const cleanup = () => {
      previewUrls.forEach(url => {
        // Only revoke URLs that were created by createObjectURL (they start with "blob:")
        if (url.startsWith('blob:')) {
          URL.revokeObjectURL(url)
        }
      })
    }
    
    const generatePreviews = async (): Promise<void> => {
      const newPreviewUrls = await Promise.all(
        images.map(image => {
          if (typeof image === 'string') {
            return image // Already a URL, just use it
          } else if (image instanceof Blob) {
            return URL.createObjectURL(image) // Create a URL for the Blob
          }
          return '' // Fallback for invalid inputs
        })
      )
      
      setPreviewUrls(newPreviewUrls.filter(url => url !== ''))
    }
    
    generatePreviews()
    
    // Cleanup function to prevent memory leaks
    return cleanup
  }, [images])
  
  function handleDragOver(e: React.DragEvent<HTMLDivElement>): void {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(true)
  }
  
  function handleDragLeave(e: React.DragEvent<HTMLDivElement>): void {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
  }
  
  function handleDrop(e: React.DragEvent<HTMLDivElement>): void {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files)
    }
  }
  
  function handleFileChange(fileList: FileList): void {
    const remainingSlots = maxImages - (images?.length || 0)
    if (remainingSlots <= 0) return
    
    const files = Array.from(fileList).slice(0, remainingSlots)
    
    // Update both the image objects and blob references
    if (setImages) {
      setImages([...images, ...files])
    }
    
    // Update the file objects for upload separately
    const updatedFileObjects = [...fileObjects, ...files]
    setFileObjects(updatedFileObjects)
    setImageBlobs?.(updatedFileObjects)
  }
  
  function removeImage(indexToRemove: number): void {
    // Get the URL that's being removed
    const urlToRemove = previewUrls[indexToRemove]
    
    // If it's a blob URL, revoke it to prevent memory leaks
    if (urlToRemove && urlToRemove.startsWith('blob:')) {
      URL.revokeObjectURL(urlToRemove)
    }
    
    // Update the images array by removing the specific image
    if (setImages) {
      const updatedImages = [...images]
      updatedImages.splice(indexToRemove, 1)
      setImages(updatedImages)
    }
    
    // Update file blobs array if needed
    if (setImageBlobs) {
      const updatedFileObjects = [...fileObjects]
      updatedFileObjects.splice(indexToRemove, 1)
      setFileObjects(updatedFileObjects)
      setImageBlobs(updatedFileObjects)
    }
  }
  
  const canAddMoreImages = !images || images.length < maxImages

  return (
    <div className={`w-full flex flex-col items-center justify-center gap-4 ${className}`}>
      {canAddMoreImages && (
        <div
          className={`border-2 border-dashed rounded-lg p-6 w-full transition-colors duration-200 ${
            dragActive ? "border-primary bg-primary/10" : "border-base-300"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center text-center">
            <p className="text-sm text-base-content/70 mb-2">
              Drag and drop images here, or click to select
            </p>
            <p className="text-xs text-base-content/50 mb-4">
              {images?.length || 0} of {maxImages} images
            </p>
            <label className="btn btn-primary btn-sm">
              <input
                type="file"
                accept={accept}
                multiple={multiple}
                onChange={(e) => e.target.files && handleFileChange(e.target.files)}
                className="hidden"
              />
              Upload Images
            </label>
          </div>
        </div>
      )}

      {previewUrls.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full">
          {previewUrls.map((url, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative group aspect-square"
            >
              <img
                src={url}
                alt={`Uploaded Image ${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 bg-base-300/80 hover:bg-error text-base-content hover:text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Remove image"
              >
                <X size={16} />
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

