import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";

interface CardPostProps {
  id: string;
  content: string;
  createdAt: string;
}

export function CardPost({ id, content, createdAt }: CardPostProps) {
  return (
    <Link href={`/post/${id}`} className="block">
      <Card className="hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer group">
        <CardContent className="p-4">
          <p className="truncate group-hover:text-primary transition-colors">
            {content}
          </p>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
            {new Date(createdAt).toLocaleString()}
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}
