import rehypePrettyCode from 'rehype-pretty-code';

export const rehypePlugins = [
  [
    rehypePrettyCode,
    {
      theme: {
        dark: 'github-dark',
        light: 'github-light',
      },
      keepBackground: false,
    },
  ],
] as never[];
