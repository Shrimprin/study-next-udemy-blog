'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createPost } from '@/lib/actions/createPost';
import 'highlight.js/styles/github.css'; // コードハイライト用のスタイル
import { useActionState, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import TextareaAutosize from 'react-textarea-autosize';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';

export default function CreatePage() {
  const [content, setContent] = useState(''); // 記事の文章
  const [contentLength, setContentLength] = useState(0); // 文字数
  const [preview, setPreview] = useState(false); // プレビュー

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setContent(value);
    setContentLength(value.length);
  };
  const [state, formAction] = useActionState(createPost, { success: false, errors: {} });

  return (
    <div className="container mx-auto mt-10">
      <h1 className="mb-4 text-2xl font-bold">記事作成</h1>
      <form action={formAction} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">タイトル</Label>
          <Input type="text" name="title" id="title" placeholder="タイトル" required />
          {state.errors.title && <p className="mt-1 text-sm text-red-500">{state.errors.title.join(', ')}</p>}
        </div>
        <div>
          <Label htmlFor="topImage">トップ画像</Label>
          <Input type="file" id="topImage" accept="image/*" name="topImage" />
          {state.errors.topImage && <p className="mt-1 text-sm text-red-500">{state.errors.topImage.join(', ')}</p>}
        </div>
        <div>
          <Label htmlFor="content">内容(Markdown)</Label>
          <TextareaAutosize
            id="content"
            value={content}
            name="content"
            onChange={handleContentChange}
            className="w-full border p-2"
            minRows={8}
            placeholder="Markdown形式で入力してください"
          />
        </div>
        <div className="mt-1 text-right text-sm text-gray-500">
          文字数: {contentLength}
          {state.errors.content && <p className="mt-1 text-sm text-red-500">{state.errors.content.join(', ')}</p>}
        </div>
        <div>
          <Button type="button" onClick={() => setPreview(!preview)}>
            {preview ? '編集' : 'プレビュー'}
          </Button>
          {preview && (
            <div className="prose max-w-none border bg-gray-50 p-4">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                skipHtml={false}
                unwrapDisallowed={true}
              >
                {content}
              </ReactMarkdown>
            </div>
          )}
          <Button type="submit" className="rounded-md bg-blue-500 px-4 py-2 text-white">
            作成
          </Button>
        </div>
      </form>
    </div>
  );
}
