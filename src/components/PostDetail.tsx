import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { ArrowLeft, Hash } from "lucide-react";
import { formatTextWithLinks } from "@/lib/url-utils";

interface PostDetailProps {
  post: {
    id: string;
    content: string;
    createdAt: Date | string;
  };
}

export function PostDetail({ post }: PostDetailProps) {
  const textParts = formatTextWithLinks(post.content);
  
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
              <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-200">
                {textParts.map((part, index) => 
                  part.isLink ? (
                    <a 
                      key={index} 
                      href={part.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                    >
                      {part.text}
                    </a>
                  ) : (
                    <span key={index}>{part.text}</span>
                  )
                )}
              </p>
            </div>

            <Separator />

            <div className="text-sm text-muted-foreground flex flex-col gap-1">
              <span>posted by Anonymous</span>
              <span>
                {new Date(post.createdAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                }).replace(/(\d{2}) (\w{3}) (\d{4})/, "$1 $2 $3")}
                <span className="mx-1">·</span>
                {new Date(post.createdAt).toLocaleTimeString("en-GB", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
