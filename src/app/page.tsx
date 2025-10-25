"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { usePosts } from "@/features/posts/hooks/use-posts";
import { CardPost } from "@/components/CardPost";
import { CardPostSkeleton } from "@/components/CardPostSkeleton";
import { ResponsiveDropdown } from "@/components/ResponsiveDropdown";
import { BackToTop } from "@/components/BackToTop";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Search } from "lucide-react";

export default function Home() {
  const [sortBy, setSortBy] = useState("latest");
  const [searchQuery, setSearchQuery] = useState("");
  const { form, data, onSubmit, mutation, loader, isFetchingNextPage } = usePosts(sortBy, searchQuery);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">everybody's everything</h1>
        <ThemeToggle />
      </div>

      <div className="space-y-6">
        <form onSubmit={form.handleSubmit(onSubmit)} className="md:max-w-md">
          <div className="space-y-2">
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <Textarea
                {...form.register("content")}
                placeholder="Say something..."
                className="min-h-[100px] resize-none w-full"
                maxLength={250}
              />
              <Button 
                type="submit" 
                disabled={mutation.isPending || !form.watch("content")?.trim()}
                className="w-full md:w-auto"
              >
                Post
              </Button>
            </div>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <CardPostSkeleton count={4} />
            </div>
          )}
        </div>

        <BackToTop />
      </div>
    </main>
  );
}