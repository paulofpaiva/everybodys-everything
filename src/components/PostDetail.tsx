import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { ArrowLeft, Hash } from "lucide-react";
import { ShareDropdown } from "@/components/ShareDropdown";
import { PostContent } from "@/components/PostContent";
import { LottieAnimations } from "@/components/LottieAnimations";

interface PostDetailProps {
  post: {
    id: string;
    type: string;
    content?: string | null;
    drawing_data?: any;
    animation?: string | null;
    createdAt: Date | string;
  };
}

export function PostDetail({ post }: PostDetailProps) {
  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <Link href="/">
          <Button variant="outline" className="mb-6 hover:bg-gray-100 dark:hover:bg-gray-800">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>
      </div>

      <div className="space-y-6">
        <Card className="shadow-xl border-0 bg-white/80 dark:bg-black/80 backdrop-blur-sm">
          <CardContent className="space-y-6">
            <div className="pt-5">
              <PostContent
                type={post.type}
                content={post.content}
                drawing_data={post.drawing_data}
                className="text-lg leading-relaxed text-gray-700 dark:text-gray-200"
                isDetailView={true}
              />
            </div>

            <LottieAnimations animation={post.animation} width={300} height={300}>
              <div></div>
            </LottieAnimations>

            <Separator />

            <div className="text-sm text-muted-foreground flex justify-between items-start">
              <div className="flex flex-col gap-1">
                <span>posted by Anonymous</span>
                <span>
                  {new Date(post.createdAt).toLocaleDateString()}
                  <span className="mx-1">·</span>
                  {new Date(post.createdAt).toLocaleTimeString()}
                </span>
              </div>
              <ShareDropdown postId={post.id} />
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
