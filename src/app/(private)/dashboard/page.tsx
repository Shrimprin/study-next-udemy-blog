import { auth } from '@/auth';
import PostDropDownMenu from '@/components/post/PostDropDownMenu';
import { Button } from '@/components/ui/button';
import { getOwnPosts } from '@/lib/ownPost';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!session?.user?.email || !userId) {
    redirect('/login');
  }
  const posts = await getOwnPosts(userId);
  return (
    <div className="p-4">
      <div className="flex justify-between">
        <h1 className="mb-4 text-2xl font-bold">記事一覧</h1>
        <Button>記事作成</Button>
      </div>
      <table className="w-full table-auto border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-center">タイトル</th>
            <th className="border p-2 text-center">公開状態</th>
            <th className="border p-2 text-center">更新日時</th>
            <th className="border p-2 text-center">操作</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td className="border p-2 text-center">{post.title}</td>
              <td className="border p-2 text-center">{post.published ? '公開' : '非公開'}</td>
              <td className="border p-2 text-center">{post.updatedAt.toLocaleString()}</td>
              <td className="border p-2 text-center">
                <PostDropDownMenu postId={post.id}></PostDropDownMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
