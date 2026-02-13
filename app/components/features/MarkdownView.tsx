"use client";
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import remarkGfm from 'remark-gfm';
import dynamic from 'next/dynamic';
import { ComponentPropsWithoutRef } from 'react';

const MermaidRenderer = dynamic(() => import('./MermaidRenderer'), { ssr: false });

export default function MarkdownView({ content }: { content: string }) {
  return (
    <article className="prose prose-invert prose-lg max-w-none
                        prose-a:text-blue-400
                        prose-strong:text-slate-100
                        prose-li:marker:text-slate-100
                        prose-blockquote:text-slate-100
                        hover:prose-a:text-blue-300
                        prose-code:text-slate-100
                        prose-img:rounded-xl prose-img:shadow-lg">
      <ReactMarkdown
        remarkPlugins = {[remarkMath, remarkGfm]}
        rehypePlugins = {[rehypeKatex]}
        components={{
          a: ({ node, ...props }) => <a {...props} target="_blank" rel="noopener noreferrer" />,
          code({ inline, className, children, ...props }: ComponentPropsWithoutRef<'code'> & { inline?: boolean }) {
            const match = /language-mermaid/.exec(className || '');
            const chartData = String(children).replace(/\n$/, '');

            if (!inline && match) {
              return <MermaidRenderer chart={chartData} />;
            }

            return <code className={className} {...props}>{children}</code>;
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}