'use server';

import { signIn } from '@/auth';
import { registerSchema } from '@/validations/users';
import bcryptjs from 'bcryptjs';
import { redirect } from 'next/navigation';
import { ZodError } from 'zod';
import { prisma } from '../prisma';

type ActionState = {
  success: boolean;
  errors: Record<string, string[]>;
};

function handleValidationError(error: ZodError): ActionState {
  const { fieldErrors, formErrors } = error.flatten();
  // zodの仕様でパスワード一致確認のエラーは formErrorsで渡ってくる
  // formErrorsがある場合は、confirmPasswordフィールドにエラーを追加
  if (formErrors.length > 0) {
    return { success: false, errors: { ...fieldErrors, confirmPassword: formErrors } };
  }
  return { success: false, errors: fieldErrors as Record<string, string[]> };
}

function handleError(customErrors: Record<string, string[]>): ActionState {
  return { success: false, errors: customErrors };
}

export async function createUser(prevState: ActionState, formData: FormData): Promise<ActionState> {
  const rawFormData = Object.fromEntries(
    ['name', 'email', 'password', 'confirmPassword'].map((field) => [field, formData.get(field) as string]),
  ) as Record<string, string>;

  const validationResult = registerSchema.safeParse(rawFormData);
  if (!validationResult.success) {
    return handleValidationError(validationResult.error);
  }
  const existingUser = await prisma.user.findUnique({
    where: {
      email: rawFormData.email,
    },
  });
  if (existingUser) {
    return handleError({ email: ['このメールアドレスは既に使用されています。'] });
  }

  const hashedPassword = await bcryptjs.hash(rawFormData.password, 12);
  await prisma.user.create({
    data: {
      name: rawFormData.name,
      email: rawFormData.email,
      password: hashedPassword,
    },
  });

  await signIn('credentials', { ...Object.fromEntries(formData.entries()), redirect: false });
  redirect('/dashboard');
}
