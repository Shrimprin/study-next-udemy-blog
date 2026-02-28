'use server';

import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

type ActionState = {
  success: boolean;
  errors: Record<string, string[]>;
};

export async function deletePost(postId: string): Promise<ActionState> {
  try {
    await prisma.post.delete({ where: { id: postId } });
  } catch (error) {
    console.error(error);
    return { success: false, errors: { post: ['記事の削除に失敗しました'] } };
  }

  redirect('/dashboard');
}
