import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/features/posts/services/api-client";
import { useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertPostSchema, type PostFormData } from "@/db/schema";
import { useToast } from "@/hooks/use-toast";

export const usePosts = (sortBy: string = "latest") => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  
  const form = useForm<PostFormData>({
    resolver: zodResolver(insertPostSchema),
    defaultValues: {
      content: "",
    },
  });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["posts", sortBy],
    queryFn: async ({ pageParam = 0 }) => {
      const res = await api.get(`/posts?page=${pageParam}&sortBy=${sortBy}`);
      return res.data;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length < 5 ? undefined : allPages.length,
  });

  const mutation = useMutation({
    mutationFn: (newPost: PostFormData) => api.post("/posts", newPost),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      form.reset();
      showToast("Post created successfully", "success");
    },
    onError: (error: any) => {
      showToast("Error creating post. Please try again.", "error");
    },
  });

  const onSubmit = (data: PostFormData) => {
    mutation.mutate(data);
  };

  const loader = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });
    if (loader.current) observer.observe(loader.current);
    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

  return {
    form,
    data,
    onSubmit,
    mutation,
    loader,
    isFetchingNextPage,
  };
};
