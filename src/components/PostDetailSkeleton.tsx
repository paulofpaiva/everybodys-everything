import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "./ui/skeleton";

export function PostDetailSkeleton() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <Skeleton className="h-10 w-20 mb-6" />
      </div>

      <div className="space-y-6">
        <Card className="shadow-xl border-0 bg-white/80 dark:bg-black/80 backdrop-blur-sm">
          <CardContent className="space-y-6">
            <div className="pt-5">
              <div className="space-y-3">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-4/5" />
                <Skeleton className="h-6 w-3/4" />
              </div>
            </div>

            <Separator />

            <div className="text-sm">
              <Skeleton className="h-4 w-48" />
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
