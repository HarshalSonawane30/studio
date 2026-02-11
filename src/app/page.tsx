import { posts } from "@/lib/data";
import { CreatePost } from '@/components/create-post';
import { PostCard } from '@/components/post-card';

export default function HomePage() {
  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto">
      <main className="space-y-6">
        <CreatePost />
        <div className="space-y-6">
            {posts.map((post) => (
                <PostCard key={post.id} post={post} />
            ))}
        </div>
      </main>
    </div>
  );
}
