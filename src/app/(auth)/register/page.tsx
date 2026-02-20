'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createUser } from '@/lib/actions/createUsers';
import { useActionState } from 'react';

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(createUser, { success: false, errors: {} });
  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle>ユーザー登録</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">名前</Label>
            <Input type="text" name="name" id="name" required />
            {state.errors.name && <p className="mt-1 text-sm text-red-500">{state.errors.name.join(', ')}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">メールアドレス</Label>
            <Input type="email" name="email" id="email" required />
            {state.errors.email && <p className="mt-1 text-sm text-red-500">{state.errors.email.join(', ')}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">パスワード</Label>
            <Input type="password" name="password" id="password" placeholder="パスワード" />
            {state.errors.password && <p className="mt-1 text-sm text-red-500">{state.errors.password.join(', ')}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">確認用パスワード</Label>
            <Input type="password" name="confirmPassword" id="confirmPassword" placeholder="確認用パスワード" />
            {state.errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">{state.errors.confirmPassword.join(', ')}</p>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? '登録中...' : '登録'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
