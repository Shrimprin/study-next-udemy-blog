'use server';

import { prisma } from '@/lib/prisma';
import { saveImage } from '@/utils/image';
import { postSchema } from '@/validations/post';
import { redirect } from 'next/navigation';

type ActionState = {
  success: boolean;
  errors: Record<string, string[]>;
};

export async function updatePost(prevState: ActionState, formData: FormData): Promise<ActionState> {
  // フォームデータを取得
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const topImageInput = formData.get('topImage') as File;
  const topImage = topImageInput instanceof File ? topImageInput : null; // 何もアップロードされていないと変なファイルが生成されるため、この条件は見直す必要あり
  const postId = formData.get('id') as string;
  const published = formData.get('published') === 'true';
  const oldImageUrl = formData.get('oldImageUrl') as string;

  // バリデーション
  const validationResult = postSchema.safeParse({ title, content, topImage });
  if (!validationResult.success) {
    return { success: false, errors: validationResult.error.flatten().fieldErrors };
  }

  // 画像保存
  let imageUrl = oldImageUrl;
  if (topImage instanceof File && topImage.size > 0 && topImage.name !== 'undefined') {
    const newImageUrl = await saveImage(topImage as File);
    if (!newImageUrl) {
      return { success: false, errors: { topImage: ['画像の保存に失敗しました'] } };
    }
    imageUrl = newImageUrl;
  }

  // DB更新
  await prisma.post.update({
    where: { id: postId },
    data: {
      title,
      content,
      published,
      topImage: imageUrl,
    },
  });
  redirect('/dashboard');
}
