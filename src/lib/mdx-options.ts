import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";

export const remarkPlugins = [remarkGfm] as never[];

export const rehypePlugins = [
  [
    rehypePrettyCode,
    {
      theme: {
        dark: "github-dark",
        light: "github-light",
      },
      keepBackground: false,
    },
  ],
] as never[];
