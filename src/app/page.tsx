"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { usePosts } from "@/features/posts/hooks/use-posts";
import { CardPost } from "@/components/CardPost";
import { CardPostSkeleton } from "@/components/CardPostSkeleton";
import { ResponsiveDropdown } from "@/components/ResponsiveDropdown";
import { BackToTop } from "@/components/BackToTop";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Home() {
  const [sortBy, setSortBy] = useState("latest");
  const { form, data, onSubmit, mutation, loader, isFetchingNextPage } = usePosts(sortBy);

  return (
    <main className="container mx-auto px-4 py-8 max-w-lg">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">everybody's everything</h1>
        <ThemeToggle />
      </div>

      <div className="space-y-6">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Textarea
              {...form.register("content")}
              placeholder="Say something..."
              className="min-h-[100px] resize-none"
              maxLength={250}
            />
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
          <Button 
            type="submit" 
            disabled={mutation.isPending || !form.watch("content")?.trim()}
            className="w-full"
          >
            {mutation.isPending ? "Posting..." : "Post"}
          </Button>
        </form>

        <div className="flex gap-2">
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

        <div className="space-y-3">
          {data?.pages.flat().map((p: any) => (
            <CardPost 
              key={p.id} 
              id={p.id} 
              content={p.content} 
              createdAt={p.createdAt} 
            />
          ))}
        </div>

        <div ref={loader} className="h-10">
          {isFetchingNextPage && (
            <div className="space-y-3">
              <CardPostSkeleton count={3} />
            </div>
          )}
        </div>

        <BackToTop />
      </div>
    </main>
  );
}