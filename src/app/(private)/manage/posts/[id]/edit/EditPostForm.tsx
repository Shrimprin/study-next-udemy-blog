'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { updatePost } from '@/lib/actions/updatePost';
import 'highlight.js/styles/github.css'; // コードハイライト用のスタイル
import Image from 'next/image';
import React, { useActionState, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import TextareaAutosize from 'react-textarea-autosize';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';

type EditPostFormProps = {
  post: {
    id: string;
    title: string;
    content: string;
    topImage: string | null;
    published: boolean;
  };
};

export default function EditPostForm({ post }: EditPostFormProps) {
  const [content, setContent] = useState(post.content); // 記事の文章
  const [contentLength, setContentLength] = useState(0); // 文字数
  const [preview, setPreview] = useState(false); // プレビュー
  const [title, setTitle] = useState(post.title);
  const [published, setPublished] = useState(post.published);
  const [imagePreview, setImagePreview] = useState(post.topImage);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setContent(value);
    setContentLength(value.length);
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview !== post.topImage) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview, post.topImage]);

  const [state, formAction] = useActionState(updatePost, { success: false, errors: {} });

  return (
    <div className="container mx-auto mt-10">
      <h1 className="mb-4 text-2xl font-bold">記事作成</h1>
      <form action={formAction} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">タイトル</Label>
          <Input
            type="text"
            name="title"
            id="title"
            placeholder="タイトル"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          {state.errors.title && <p className="mt-1 text-sm text-red-500">{state.errors.title.join(', ')}</p>}
        </div>
        <div>
          <Label htmlFor="topImage">トップ画像</Label>
          <Input type="file" id="topImage" accept="image/*" name="topImage" onChange={handleImageChange} />
          {imagePreview && (
            <div className="mt-2">
              <Image
                src={imagePreview}
                alt={post.title}
                width={0}
                height={0}
                sizes="200px"
                className="w-[200px]"
                priority
              />
            </div>
          )}
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
        <div className="space-y-3">
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
          <RadioGroup
            value={published.toString()}
            name="published"
            onValueChange={(value) => setPublished(value === 'true')}
          >
            <div className="flex items-center gap-3">
              <RadioGroupItem value="true" id="published-true" />
              <Label htmlFor="published-true">表示</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="false" id="published-false" />
              <Label htmlFor="published-false">非表示</Label>
            </div>
          </RadioGroup>
          <Button type="submit" className="rounded-md bg-blue-500 px-4 py-2 text-white">
            更新
          </Button>
        </div>
        <input type="hidden" name="id" value={post.id} />
        <input type="hidden" name="oldImageUrl" value={post.topImage || ''} />
      </form>
    </div>
  );
}
