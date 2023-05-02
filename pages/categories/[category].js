import fs from 'fs';
import matter from 'gray-matter';
import PostCard from '../../components/PostCard';

export const getStaticProps = ({ params }) => {
  const files = fs.readdirSync('posts');
  const posts = files.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fileContent = fs.readFileSync(`posts/${fileName}`, 'utf-8');
    const { data } = matter(fileContent);
    return {
      frontMatter: data,
      slug,
    };
  });

  const category = params.category;

  const filteredPosts = posts.filter((post) => {
    return post.frontMatter.categories.includes(category);
  });

  const sortedPosts = filteredPosts.sort((postA, postB) =>
    new Date(postA.frontMatter.date) > new Date(postB.frontMatter.date) ? -1 : 1
  );

  return {
    props: {
      posts: sortedPosts,
      category: category,
    },
  };
};

export const getStaticPaths = () => {
  const categories = ['react', 'nextjs'];
  const paths = categories.map((category) => ({ params: { category } }));

  return {
    paths,
    fallback: false,
  };
};

const Category = ({ posts, category }) => {
  return (
    <>
      <div className="max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <h1>カテゴリー : {category}</h1>
        <div className="grid lg:grid-cols-2 lg:gap-y-16 gap-10">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Category;