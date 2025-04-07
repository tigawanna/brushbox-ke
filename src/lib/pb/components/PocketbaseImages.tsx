/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { motion } from "motion/react";
import { CollectionName, getFileURL } from "../utils";
import { CurrentImage } from "@/app/booking/__components/BookingSectionForm";

type ImageType = {
  name: string;
  action: "keep" | "delete";
};

interface PocketbaseImagesProps {
  /**
   * Record ID in PocketBase
   */
  recordId: string;
  /**
   * Collection name in PocketBase
   */
  collectionName: CollectionName;
  /**
   * Field name that contains the images in the record
   */
  fieldName: string;
  /**
   * Array of image filenames
   */
  //   imageNames: string[];
  //   setImageNames?: React.Dispatch<React.SetStateAction<string[]>>;
  imageNames?: CurrentImage[];
  setImageNames?: React.Dispatch<React.SetStateAction<CurrentImage[] | undefined>>;
/**
   * Optional CSS class names
   */
  className?: string;
}

export function PocketbaseImages({
  recordId,
  collectionName,
  imageNames,
  setImageNames,
  className = "",
}: PocketbaseImagesProps) {
 function handleRemoveImage(fileName: string): void {
    setImageNames?.((prev) => {
      if (!prev) return [{ name: fileName, action: "delete" }];
      return prev.map((item) => {
        if (item.name === fileName) {
          if (item.action === "delete") {
            return { name: fileName, action: "keep" };
          } else {
            return { name: fileName, action: "delete" };
          }
        }
        return item;
      });
    });
 
  }
  //   console.log({ imageNames, imagesToDelete });

  if (!imageNames || imageNames.length === 0) {
    return null;
  }

  return (
    <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full ${className}`}>
      {imageNames.map((imageName, index) => {
        const isMarkedForDeletion = imageName.action === "delete";
        return (
          <motion.div
            key={imageName.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: isMarkedForDeletion ? 0.5 : 1,
              scale: isMarkedForDeletion ? 0.95 : 1,
            }}
            className="relative group aspect-square">
            <img
              src={getFileURL({
                collection_id_or_name: collectionName,
                record_id: recordId,
                file_name: imageName.name,
              })}
              alt={`Image ${index + 1}`}
              className={`w-full h-full object-cover rounded-lg ${
                isMarkedForDeletion ? "opacity-50 grayscale" : ""
              }`}
            />
            <button
              type="button"
              onClick={() => handleRemoveImage(imageName.name)}
            //   disabled={isMarkedForDeletion}
              className={`absolute top-1 right-1 p-1 rounded-full transition-all
                ${
                  isMarkedForDeletion
                    ? "bg-error/70 text-base-100"
                    : "bg-base-300/80 hover:bg-error text-base-content hover:text-white opacity-0 group-hover:opacity-100"
                }`}
              aria-label={isMarkedForDeletion ? "Image marked for deletion" : "Remove image"}>
              <X size={16} />
            </button>
          </motion.div>
        );
      })}
    </div>
  );
}
