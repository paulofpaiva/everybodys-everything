"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import { isOnlyLink } from "@/lib/url-utils";
import { ShareDropdown } from "@/components/ShareDropdown";
import { PostContent } from "@/components/PostContent";

interface CardPostProps {
  id: string;
  type: string;
  content?: string | null;
  drawing_data?: any;
  createdAt: string;
}

export function CardPost({ id, type, content, drawing_data, createdAt }: CardPostProps) {
  const isLinkOnly = content ? isOnlyLink(content) : false;
  
  return (
    <Link href={`/post/${id}`} className="block">
      <Card className="hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer group h-48 flex flex-col">
        <CardContent className="p-4 flex-1 flex flex-col justify-center min-h-0">
          <div className="max-h-32 overflow-hidden">
            <PostContent
              type={type}
              content={content}
              drawing_data={drawing_data}
              isLinkOnly={isLinkOnly}
              className="group-hover:text-primary transition-colors"
              isThumbnail={true}
            />
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex-shrink-0">
          <div className="flex justify-between items-end w-full">
            <div className="flex flex-col gap-1">
              <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                by Anonymous
              </span>
              <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                {new Date(createdAt).toLocaleString()}
              </span>
            </div>
            <div>
              <ShareDropdown postId={id} />
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
