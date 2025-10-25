"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { CardPost } from "@/components/CardPost";
import { CardPostSkeleton } from "@/components/CardPostSkeleton";
import { ResponsiveDropdown } from "@/components/ResponsiveDropdown";
import { BackToTop } from "@/components/BackToTop";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Search, Image, PenTool } from "lucide-react";
import { DrawingPostModal } from "@/components/DrawingPostModal";
import { DrawingPreview } from "@/components/DrawingPreview";
import { useDrawingPost } from "@/hooks/use-drawing-post";

export default function Home() {
  const [sortBy, setSortBy] = useState("latest");
  const [searchQuery, setSearchQuery] = useState("");
  const { 
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
  } = useDrawingPost(sortBy, searchQuery);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">everybody's everything</h1>
        <ThemeToggle />
      </div>

      <div className="space-y-6">
        <form onSubmit={form.handleSubmit(handleSubmit)} className="md:max-w-md">
          <div className="space-y-2">
            <div className="flex flex-col gap-2">
              <Textarea
                {...form.register("content")}
                placeholder="Say something..."
                className="min-h-[100px] resize-none w-full"
                maxLength={250}
              />
              {!drawingData ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-9 w-9"
                      title="Desenhar"
                      onClick={() => setIsDrawModalOpen(true)}
                    >
                      <PenTool className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-9 w-9"
                      title="Adicionar imagem"
                      disabled={true}
                    >
                      <Image className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button 
                    type="submit" 
                    disabled={mutation.isPending || !isPostEnabled()}
                    className="px-6"
                  >
                    Post
                  </Button>
                </div>
              ) : (
                <div className="flex justify-end">
                  <Button 
                    type="submit" 
                    disabled={mutation.isPending || !isPostEnabled()}
                    className="px-6"
                  >
                    Post
                  </Button>
                </div>
              )}
            </div>
            
            {drawingData && (
              <DrawingPreview 
                drawingData={drawingData} 
                onRemove={handleRemoveDrawing} 
              />
            )}
            
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>
                {form.formState.errors.content && (
                  <span className="text-red-500">
                    {form.formState.errors.content.message}
                  </span>
                )}
              </span>
              <span>
                {form.watch("content")?.length || 0}/250
              </span>
            </div>
          </div>
        </form>

        <div className="flex flex-col md:flex-row gap-2">
          <div className="relative w-full md:w-auto md:min-w-[300px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="search"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white dark:bg-black border-gray-300 dark:border-gray-700"
            />
          </div>
          <div className="w-full md:w-auto">
            <ResponsiveDropdown
              value={sortBy}
              onValueChange={setSortBy}
              options={[
                { value: "latest", label: "Latest" },
                { value: "oldest", label: "Oldest" }
              ]}
              placeholder="Filter by..."
            />
          </div>
        </div>

        {isLoading || isPending ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <CardPostSkeleton count={8} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {data?.pages.flat().map((p: any) => (
              <CardPost 
                key={p.id} 
                id={p.id} 
                type={p.type}
                content={p.content} 
                drawing_data={p.drawing_data}
                createdAt={p.createdAt} 
              />
            ))}
          </div>
        )}

        <div ref={loader} className="h-10">
          {isFetchingNextPage && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <CardPostSkeleton count={4} />
            </div>
          )}
        </div>

        <BackToTop />
      </div>

      <DrawingPostModal
        isOpen={isDrawModalOpen}
        onClose={() => setIsDrawModalOpen(false)}
        onSave={handleDrawingSave}
      />
    </main>
  );
}