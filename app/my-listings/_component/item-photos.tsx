"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import ImageDropzone from "@/components/imageDropzone";
import { useMyListingStore } from "../my-listing-store";

function ItemPhoto({ onPrev }: { onPrev?: () => void }) {
  const item = useMyListingStore();

  const handleFileAdd = async (filesToUpload: string[]) => {
    item.updateState({
      photos: [...(item.data.photos ?? []), ...filesToUpload],
    });
  };

  const handleFileDelete = async (url: string) => {
    const updatedPhotos =
      item.data.photos?.filter((photo) => photo !== url) ?? [];
    item.updateState({ photos: updatedPhotos });
  };

  return (
    <div className="grid w-full gap-2">
      <h2 className="text-xl sm:text-2xl py-4 font-semibold">Item Photos : </h2>

      <ImageDropzone
        onFilesAdded={handleFileAdd}
        onFileDelete={handleFileDelete}
      />

      <div className="flex justify-between items-center py-4">
        <Button type="button" onClick={onPrev}>
          Prev
        </Button>
      </div>
    </div>
  );
}

export default ItemPhoto;
