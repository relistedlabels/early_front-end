


"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { Upload, X } from "lucide-react";
import { Paragraph3, Paragraph1 } from "@/common/ui/Text";
import { Attachment, useProductDraftStore } from "@/store/useProductDraftStore";
import { useUploader } from "@/context/UploaderContext";

type Slot = {
  id: string;
  label: string;
};

const SLOTS: Slot[] = [
  { id: "main", label: "Main Photo" },
  { id: "photo1", label: "Photo 1" },
  { id: "photo2", label: "Photo 2" },
  { id: "photo3", label: "Photo 3" },
  { id: "video", label: "Video 1" },
];

export const ItemImageUploader: React.FC = () => {
  const { data, setField } = useProductDraftStore();
  const uploader = useUploader();

  const [tempPreviews, setTempPreviews] = useState<Record<string, string>>({});
  const attachments = Array.isArray(data.attachments) ? data.attachments : [];

  const handleUpload = useCallback((file: File, slotId: string) => {

    const previewUrl = URL.createObjectURL(file);
    setTempPreviews(prev => ({ ...prev, [slotId]: previewUrl }));


    const uploadItem = uploader.addUploads([file], slotId)[0];


    const checkUpload = setInterval(() => {
      const currentUpload = uploader.getUpload(uploadItem.id);

      if (currentUpload?.done) {
        clearInterval(checkUpload);

        // Add to attachments when done
        const newAttachment: Attachment = {
          id: currentUpload.id,
          slotId,
          url: currentUpload.url || previewUrl,
          name: file.name,
          type: file.type.startsWith("video") ? "video" : "image",
          progress: 100,
        };

        setField("attachments", [
          ...attachments.filter(att => att.slotId !== slotId),
          newAttachment
        ]);

        if (previewUrl.startsWith('blob:')) {
          URL.revokeObjectURL(previewUrl);
        }
        setTempPreviews(prev => {
          const copy = { ...prev };
          delete copy[slotId];
          return copy;
        });
      } else if (currentUpload?.error) {
        clearInterval(checkUpload);
        console.error(`Upload failed for ${slotId}:`, currentUpload.error);
      }
    }, 100);

    return () => clearInterval(checkUpload);
  }, [uploader, setField, attachments]);

  const handleRemove = useCallback((slotId: string, attachmentId: string) => {

    uploader.cancelUpload(attachmentId);


    const updatedAttachments = attachments.filter(att =>
      !(att.slotId === slotId && att.id === attachmentId)
    );
    setField("attachments", updatedAttachments);


    setTempPreviews(prev => {
      const copy = { ...prev };
      if (copy[slotId] && copy[slotId].startsWith('blob:')) {
        URL.revokeObjectURL(copy[slotId]);
      }
      delete copy[slotId];
      return copy;
    });
  }, [uploader, setField, attachments]);

  useEffect(() => {
    return () => {
      Object.values(tempPreviews).forEach(url => {
        if (url && url.startsWith('blob:')) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [tempPreviews]);

  return (
    <div className="w-full rounded-xl border border-gray-200 p-4">
      <div className="mb-4">
        <Paragraph3 className="text-sm font-semibold text-black">Item Image</Paragraph3>
        <Paragraph1 className="text-xs text-gray-500">
          Upload at least 5 high quality images and videos of your item
        </Paragraph1>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-4">
        {SLOTS.map((slot) => {
          const attachment = attachments.find((att) => att.slotId === slot.id);
          const previewSrc = attachment?.url ?? tempPreviews[slot.id] ?? null;

         
          const currentUpload = uploader.uploads.find(u => u.slotId === slot.id);
          const progress = currentUpload?.progress ?? attachment?.progress ?? 0;
          const isUploading = currentUpload && !currentUpload.done && !currentUpload.error;
          const hasError = currentUpload?.error;

          return (
            <label
              key={slot.id}
              className="relative flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-gray-300 p-2 text-center transition hover:border-gray-400"
            >
              {previewSrc ? (
                <>
                  {slot.id === "video" || previewSrc?.includes('.mp4') || previewSrc?.includes('.mov') || previewSrc?.includes('.avi') ? (
                    <div className="h-16 w-24 rounded bg-gray-100 flex items-center justify-center relative">
                      <video
                        src={previewSrc}
                        className="h-full w-full object-cover rounded"
                        muted
                      />
                      <div className="absolute bottom-1 right-1 bg-black bg-opacity-50 rounded p-1">
                        <span className="text-xs text-white">VIDEO</span>
                      </div>
                    </div>
                  ) : (
                    <img
                      src={previewSrc}
                      alt={attachment?.name || "Preview"}
                      className="h-16 w-24 object-cover rounded"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder-image.png";
                      }}
                    />

                  )}
                  {/* Progress Bar - Shows during upload */}
                  {isUploading && progress > 0 && (
                    <div className="absolute bottom-0 left-0 right-0 p-1">
                      <div className="w-full h-1 bg-gray-200 rounded-full">
                        <div
                          className="h-1 bg-green-500 rounded-full transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-600 mt-1">{progress}%</span>
                    </div>
                  )}


                  {/* Error Message */}
                  {hasError && (
                    <div className="absolute bottom-0 left-0 right-0 p-1">
                      <span className="text-xs text-red-600">Upload failed</span>
                    </div>
                  )}

                  <button
                    type="button"
                    className="absolute top-1 right-1 p-1 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors z-10"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (attachment) {
                        handleRemove(slot.id, attachment.id);
                      } else if (tempPreviews[slot.id]) {
                        // Cancel current upload if exists
                        const uploadToCancel = uploader.uploads.find(u => u.slotId === slot.id);
                        if (uploadToCancel) {
                          uploader.cancelUpload(uploadToCancel.id);
                        }

                        // Clean up temp preview
                        setTempPreviews(prev => {
                          const copy = { ...prev };
                          if (copy[slot.id] && copy[slot.id].startsWith('blob:')) {
                            URL.revokeObjectURL(copy[slot.id]);
                          }
                          delete copy[slot.id];
                          return copy;
                        });
                      }
                    }}
                  >
                    <X size={12} />
                  </button>
                </>
              ) : (
                <>
                  <Upload className="h-5 w-5 text-gray-500" />
                  <span className="text-xs text-gray-600">{slot.label}</span>
                </>
              )}

              <input
                type="file"
                accept={slot.id === "video" ? "video/*" : "image/*"}
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleUpload(file, slot.id);
                  e.target.value = ""; // Reset input
                }}
                disabled={!!attachment || isUploading}
              />
            </label>
          );
        })}
      </div>
    </div>
  );
};