import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PostCardProps } from '@/types/post';
import { formatDistanceToNow } from 'date-fns';
import { ja } from 'date-fns/locale';
import Image from 'next/image';
import Link from 'next/link';

export default function PostCard({ post }: PostCardProps) {
  return (
    <Card
      className="
        overflow-hidden pt-0 transition-shadow duration-300
        hover:shadow-lg
      "
    >
      <Link href={`/posts/${post.id}`}>
        {post.topImage && (
          <div className="relative h-48 w-full">
            <Image
              src={post.topImage}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="rounded-t-md object-cover"
              priority
            />
          </div>
        )}
        <CardHeader>
          <CardTitle className="mt-6 line-clamp-2">{post.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-2 line-clamp-2 text-sm text-gray-500">{post.content}</p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>{post.author.name}</span>
            <time>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true, locale: ja })}</time>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
