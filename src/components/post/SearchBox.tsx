'use client';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SearchBox() {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const router = useRouter();

  // デバウンス (高頻度に呼び出されるのを防ぐ 500ms後に実行
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  // debouncedSearch が更新されたときに検索を実行
  // スペースだけを入力した場合は/にリダイレクト、trimで不要なスペースを削除
  useEffect(() => {
    if (debouncedSearch.trim()) {
      router.push(`/?search=${debouncedSearch.trim()}`);
    } else {
      router.push('/');
    }
  }, [debouncedSearch, router]);

  return (
    <>
      <Input
        placeholder="記事を検索..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="
          w-[200px] bg-white
          lg:w-[300px]
        "
      />
    </>
  );
}
