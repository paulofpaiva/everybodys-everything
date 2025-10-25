import { formatTextWithLinksAndHashtags, isOnlyLink } from "@/lib/url-utils";
import { PostContentClient } from "./PostContentClient";

interface PostContentProps {
  type: string;
  content?: string | null;
  drawing_data?: any;
  isLinkOnly?: boolean;
  className?: string;
  isDetailView?: boolean;
  isThumbnail?: boolean;
}

export function PostContent({ 
  type, 
  content, 
  drawing_data, 
  isLinkOnly = false,
  className = "",
  isDetailView = false,
  isThumbnail = false
}: PostContentProps) {
  if (type === "text" && content) {
    const textParts = formatTextWithLinksAndHashtags(content);
    return (
      <p className={`${isLinkOnly ? 'break-all' : 'truncate'} ${className}`}>
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
    );
  }

  return (
    <PostContentClient
      type={type}
      content={content}
      drawing_data={drawing_data}
      isLinkOnly={isLinkOnly}
      className={className}
      isDetailView={isDetailView}
      isThumbnail={isThumbnail}
    />
  );
}
