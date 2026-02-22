'use server';

import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { saveImage } from '@/utils/image';
import { postSchema } from '@/validations/post';
import { redirect } from 'next/navigation';

type ActionState = {
  success: boolean;
  errors: Record<string, string[]>;
};

export async function createPost(prevState: ActionState, formData: FormData): Promise<ActionState> {
  // フォームデータを取得
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const topImageInput = formData.get('topImage') as File;
  const topImage = topImageInput instanceof File ? topImageInput : null; // 何もアップロードされていないと変なファイルが生成されるため、この条件は見直す必要あり
  const rawFormData = { title, content, topImage };

  // バリデーション
  const validationResult = postSchema.safeParse(rawFormData);
  if (!validationResult.success) {
    return { success: false, errors: validationResult.error.flatten().fieldErrors };
  }

  // 画像保存
  const imageUrl = rawFormData.topImage ? await saveImage(rawFormData.topImage as File) : null;
  if (topImage && !imageUrl) {
    return { success: false, errors: { topImage: ['画像の保存に失敗しました'] } };
  }

  // DB保存
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    throw new Error('ログインしてください');
  }

  await prisma.post.create({
    data: {
      title: rawFormData.title,
      content: rawFormData.content,
      topImage: imageUrl,
      published: true,
      authorId: userId,
    },
  });
  redirect('/dashboard');
}
