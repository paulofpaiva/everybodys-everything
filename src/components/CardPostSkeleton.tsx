import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface CardPostSkeletonProps {
  count?: number;
}

export function CardPostSkeleton({ count = 1 }: CardPostSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index} className="h-48 flex flex-col animate-pulse">
          <CardContent className="p-4 flex-1 flex flex-col justify-center min-h-0">
            <div className="max-h-32 overflow-hidden">
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex-shrink-0">
            <div className="flex justify-between items-end w-full">
              <div className="flex flex-col gap-1">
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
              </div>
              <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </CardFooter>
        </Card>
      ))}
    </>
  );
}
