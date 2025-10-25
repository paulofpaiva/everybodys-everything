"use client";

import { useState } from "react";
import { usePosts } from "@/features/posts/hooks/use-posts";

export function useDrawingPost(sortBy: string, searchQuery: string) {
  const [isDrawModalOpen, setIsDrawModalOpen] = useState(false);
  const [drawingData, setDrawingData] = useState<any>(null);
  
  const { form, data, mutation, loader, isFetchingNextPage, isLoading, isPending } = usePosts(sortBy, searchQuery);

  const handleDrawingSave = (drawingData: any) => {
    setDrawingData(drawingData);
    setIsDrawModalOpen(false);
  };

  const handleRemoveDrawing = () => {
    setDrawingData(null);
  };

  const handleSubmit = (data: any) => {
    const content = data.content?.trim() || "";
    
    let type = "text";
    if (drawingData && content) {
      type = "mixed";
    } else if (drawingData) {
      type = "drawing";
    }

    const postData = {
      type,
      content: content || null,
      drawing_data: drawingData,
    };

    form.setValue("type", type as any);
    
    mutation.mutate(postData, {
      onSuccess: (result) => {
        setDrawingData(null);
        form.reset();
      },
      onError: (error) => {
        console.error("Error creating post:", error);
      }
    });
  };

  const isPostEnabled = () => {
    return !!drawingData || !!form.watch("content")?.trim();
  };

  return {
    form,
    data,
    mutation,
    loader,
    isFetchingNextPage,
    isLoading,
    isPending,
    isDrawModalOpen,
    setIsDrawModalOpen,
    drawingData,
    handleDrawingSave,
    handleRemoveDrawing,
    handleSubmit,
    isPostEnabled,
  };
}
