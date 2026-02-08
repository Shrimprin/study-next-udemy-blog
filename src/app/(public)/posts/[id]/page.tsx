import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getPost } from '@/lib/post';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import Image from 'next/image';
import { notFound } from 'next/navigation';

type Params = { params: Promise<{ id: string }> }; // urlの情報はparamsで渡ってくる

export default async function PostPage({ params }: Params) {
  const { id } = await params; // paramsはPromise型で定義しつつawaitで非同期処理
  const post = await getPost(id); // DBからid指定して情報取得

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mx-auto max-w-3xl pt-0">
        {post.topImage && (
          <div
            className="
              relative h-64 w-full
              lg:h-96
            "
          >
            <Image
              src={post.topImage}
              alt={post.title}
              fill
              sizes="100vw"
              className="rounded-t-md object-cover"
              priority
            />
          </div>
        )}
        <CardHeader>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-gray-500">{post.author.name}</p>
            <time className="text-sm text-gray-500">
              {format(new Date(post.createdAt), 'yyyy/MM/dd HH:mm', { locale: ja })}
            </time>
          </div>
          <CardTitle className="text-3xl font-bold">{post.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{post.content}</p>
        </CardContent>
      </Card>
    </div>
  );
}
