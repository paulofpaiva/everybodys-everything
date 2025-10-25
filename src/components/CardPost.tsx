import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import { formatTextWithLinksAndHashtags, isOnlyLink } from "@/lib/url-utils";
import { ShareDropdown } from "@/components/ShareDropdown";

interface CardPostProps {
  id: string;
  content: string;
  createdAt: string;
}

export function CardPost({ id, content, createdAt }: CardPostProps) {
  const textParts = formatTextWithLinksAndHashtags(content);
  const isLinkOnly = isOnlyLink(content);
  
  return (
    <Link href={`/post/${id}`} className="block">
      <Card className="hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer group">
        <CardContent className="p-4">
          <p className={`${isLinkOnly ? 'break-all' : 'truncate'} group-hover:text-primary transition-colors`}>
            {textParts.map((part, index) => 
              part.isLink ? (
                <span key={index} className="text-blue-600 dark:text-blue-400 underline">
                  {part.text}
                </span>
              ) : part.isHashtag ? (
                <span key={index} className="text-blue-600 dark:text-blue-400 font-medium">
                  {part.text}
                </span>
              ) : (
                <span key={index}>{part.text}</span>
              )
            )}
          </p>
        </CardContent>
        <CardFooter className="p-4 pt-0">
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
