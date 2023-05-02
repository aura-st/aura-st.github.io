import Image from 'next/image';
import Link from 'next/link';

const PostCard = ({ post }) => {
    return (
        <Link className="group rounded-xl overflow-hidden" href={`/posts/${post.slug}`}>
            <div className="sm:flex">
                <div className="flex-shrink-0 relative rounded-xl overflow-hidden w-full sm:w-56 h-44">
                    <Image
                        className="group-hover:scale-105 transition-transform duration-500 ease-in-out w-full h-full absolute top-0 left-0 object-cover rounded-xl"
                        src={`/${post.frontMatter.image}`}
                        width={1200}
                        height={700}
                        alt={post.frontMatter.title}
                    />
                </div>

                <div className="grow mt-4 sm:mt-0 sm:ml-6 px-4 sm:px-0">
                    <h3 className="text-xl font-semibold text-gray-800 group-hover:text-gray-600 dark:text-gray-300 dark:group-hover:text-white">
                        {post.frontMatter.title}
                    </h3>
                    <p className="mt-3 text-gray-600 dark:text-gray-400">
                        {post.frontMatter.description}
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default PostCard;