'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { authenticate } from '@/lib/actions/authenticate'; // ServerAction
import { useActionState } from 'react';

export default function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined);

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle>ログイン</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">メールアドレス</Label>
            <Input type="email" name="email" id="email" placeholder="メールアドレス" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">パスワード</Label>
            <Input type="password" name="password" id="password" placeholder="パスワード" required />
          </div>
          <Button type="submit" disabled={isPending}>
            {isPending ? 'ログイン中...' : 'ログイン'}
          </Button>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </form>
      </CardContent>
    </Card>
  );
}
