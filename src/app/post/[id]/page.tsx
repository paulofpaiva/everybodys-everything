import { db } from "@/server/db";
import { posts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import { Empty } from "@/components/ui/empty";
import { PostDetail } from "@/components/PostDetail";
import { PostDetailSkeleton } from "@/components/PostDetailSkeleton";
import Link from "next/link";
import { ArrowLeft, FileX } from "lucide-react";
import { Suspense } from "react";

interface PostPageProps {
  params: {
    id: string;
  };
}

async function getPost(id: string) {
  try {
    const post = await db
      .select()
      .from(posts)
      .where(eq(posts.id, id))
      .limit(1);

    return post[0] || null;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

async function PostContent({ id }: { id: string }) {
  const post = await getPost(id);

  if (!post) {
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

        <Empty
          icon={<FileX className="h-12 w-12" />}
          title="Post not found"
          description="The post you're looking for doesn't exist or has been removed."
          action={
            <Link href="/">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Posts
              </Button>
            </Link>
          }
        />
      </main>
    );
  }

  return <PostDetail post={post} />;
}

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params;

  return (
    <Suspense fallback={<PostDetailSkeleton />}>
      <PostContent id={id} />
    </Suspense>
  );
}