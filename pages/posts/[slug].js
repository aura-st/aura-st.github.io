import fs from 'fs';
import matter from 'gray-matter';

import Image from 'next/image';
import Link from 'next/link';

import { NextSeo } from 'next-seo';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import remarkToc from 'remark-toc';
import rehypeSlug from 'rehype-slug';
import remarkPrism from 'remark-prism';

import { createElement, Fragment, useEffect, useState } from 'react';
import rehypeParse from 'rehype-parse';
import rehypeReact from 'rehype-react';

export async function getStaticProps({ params }) {
    const file = fs.readFileSync(`posts/${params.slug}.md`, 'utf-8');
    const { data, content } = matter(file);

    const result = await unified()
        .use(remarkParse)
        .use(remarkPrism, {
            plugins: ['line-numbers']
        })
        .use(remarkToc, {
            heading: '目次',
        })
        .use(remarkRehype)
        .use(rehypeSlug)
        .use(rehypeStringify)
        .process(content);

    return { props: { frontMatter: data, content: result.toString(), slug: params.slug } };
}

export async function getStaticPaths() {
    const files = fs.readdirSync('posts');
    const paths = files.map((fileName) => ({
        params: {
            slug: fileName.replace(/\.md$/, ''),
        },
    }));
    return {
        paths,
        fallback: false,
    };
}

const MyLink = ({ children, href }) => {
    if (href === '') href = '/';
    return href.startsWith('/') || href.startsWith('#') ? (
        <Link href={href}>
            {children}
        </Link>
    ) : (
        <a href={href} target="_blank" rel="noopener noreferrer">
            {children}
        </a>
    );
};

const MyImage = ({ src, alt }) => {
    return <Image src={src} alt={alt} width="1200" height="700" />;
};

const toReactNode = (content) => {
    return unified()
        .use(rehypeParse, {
            fragment: true,
        })
        .use(rehypeReact, {
            createElement,
            Fragment,
            components: {
                a: MyLink,
                img: MyImage,
            },
        })
        .processSync(content).result;
};

const Post = ({ frontMatter, content, slug }) => {
    return (
        <>
            <NextSeo
                title={frontMatter.title}
                description={frontMatter.description}
                openGraph={{
                    url: `https://aura-st.github.io/posts/${slug}`,
                    title: frontMatter.title,
                    description: frontMatter.description,
                    images: [
                        {
                            url: `https://aura-st.github.io/${frontMatter.image}`,
                            width: 1200,
                            height: 700,
                            alt: frontMatter.title,
                        },
                    ],
                }}
            />

            <div className="prose prose-lg max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
                <div className="border rounded-lg shadow-md">
                    <Image
                        className='m-0'
                        src={`/${frontMatter.image}`}
                        width={1200}
                        height={700}
                        alt={frontMatter.title}
                    />
                </div>
                <h1 className="mt-12">{frontMatter.title}</h1>
                <span>{frontMatter.date}</span>
                <div className="space-x-2">
                    {frontMatter.categories.map((category) => (
                        <span key={category}>
                            <Link href={`/categories/${category}`}>
                                {category}
                            </Link>
                        </span>
                    ))}
                </div>
                {toReactNode(content)}
            </div>
        </>
    );
};

export default Post;