import { auth } from '@/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getOwnPost } from '@/lib/ownPost';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import 'highlight.js/styles/github.css';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';

type Params = { params: Promise<{ id: string }> };

export default async function ShowPage({ params }: Params) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    throw new Error('ログインしてください');
  }

  const { id } = await params;
  const post = await getOwnPost(userId, id);

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
          <div className="prose max-w-none border p-4">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              skipHtml={false}
              unwrapDisallowed={true}
            >
              {post.content}
            </ReactMarkdown>
          </div>{' '}
        </CardContent>
      </Card>
    </div>
  );
}
