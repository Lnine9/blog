import React, { cache } from "react";
import { getAllPost, getPost as getOnePost } from "@/libs/postUtil";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkFootnotes from "remark-footnotes";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrismPlus from "rehype-prism-plus";
import { compileMDX } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import usedComponents from "@/app/post/[slug]/usedComponents";

export const dynamicParams = true;

const getPost = cache(async (slug: string) => {
  console.log("generate post: ", slug);
  const post = getOnePost(slug);
  if (!post) {
    return undefined;
  }
  const source = await compileMDX({
    source: post.content,
    options: {
      scope: post.data,
      mdxOptions: {
        remarkPlugins: [
          remarkGfm,
          remarkMath,
          [remarkFootnotes, { inlineNotes: true }],
        ], // posts 支持的插件
        rehypePlugins: [
          rehypeSlug,
          rehypeAutolinkHeadings,
          [rehypePrismPlus, { ignoreMissing: true }],
        ], // posts 支持的插件
        format: "mdx",
      },
    },
    components: usedComponents,
  });
  return { source, data: post.data };
});

const Tags = ({ tags }: { tags: string }) => {
  if (!tags) {
    return <></>;
  }
  const arr = tags.split("|");
  return (
    <div className="flex gap-2">
      {arr.map((tag) => (
        <div className="bg-neutral-300 rounded-lg text-sm text-black border border-black bg-opacity-80 py-0 px-2">
          {tag}
        </div>
      ))}
    </div>
  );
};

const PostPage = async ({ params }: any) => {
  const post = await getPost(params.slug);
  if (!post) {
    notFound();
  }

  return (
    <div className="px-6 md:px-16 py-8 w-full bg-white min-h-[calc(100vh-theme(height.navh))]">
      <article className="prose p-4">
        <h1>{post.data.title}</h1>
        <div className="text-neutral-500 flex gap-4 mb-4">
          <div>date: {post.data.date}</div>
          <Tags tags={post.data.tags} />
        </div>

        {post.source.content}
      </article>
    </div>
  );
};

export function generateStaticParams() {
  return getAllPost().map((item) => ({ slug: item.data.slug }));
}

export default PostPage;
