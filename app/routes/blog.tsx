import { LoaderArgs, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { gql } from "graphql-request";
import { hygraph } from "~/utils/hygraph.server";
import { Post, SEOProps } from "~/utils/interface";
import { HelmetProvider } from "react-helmet-async";
import {
  blogDescription,
  blogImageUrl,
  blogKeywords,
  blogTitle,
  siteAuthor,
  sitePublisher,
  siteUrl,
  twitterHandle,
} from "~/utils/seotags";
import SEO from "~/components/SeoTags";
import Breadcrumb from "~/components/Breadcrumb";

interface iAppProps {
  posts: Post;
}

export async function loader({}: LoaderArgs) {
  const query = gql`
    query MyPosts {
      posts(orderBy: publishedAt_DESC, first: 10) {
        id
        slug
        title
        overview
        createdAt
        updatedAt
      }
    }
  `;

  const posts = await hygraph.request(query);

  return json({ posts });
}

const Blog = () => {
  const { posts } = useLoaderData() as iAppProps;

  const seo: SEOProps = {
    title: `CL — Personal Blog ${blogTitle}`,
    description: blogDescription,
    keywords: blogKeywords,
    canonicalUrl: `${siteUrl}/blog`,
    robots: "index, follow",
    author: siteAuthor,
    publisher: sitePublisher,
    imageUrl: blogImageUrl,
    twitterHandle: twitterHandle,
  };

  return (
    <HelmetProvider>
      <SEO seo={seo} />

      <div className="divide-y divide-slate-200 dark:divide-slate-700">
        <div className="space-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-blue-900 dark:text-blue-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            All Blog Posts
          </h1>
        </div>

        {posts.posts.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">
            No blog posts available.
          </p>
        ) : (
          <ul>
            {posts.posts.map((post) => (
              <li key={post.id.toString()} className="py-4">
                <article className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                  <div>
                    <h3 className="text-base font-medium leading-6 text-blue-500">
                      {new Date(post.createdAt.toString()).toLocaleDateString(
                        "en-US",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    </h3>
                  </div>

                  <Link
                    to={`/post/${post.slug}`}
                    prefetch="intent"
                    className="space-y-3 xl:col-span-3"
                  >
                    <div>
                      <h2 className="text-2xl font-bold leading-8 tracking-tight text-slate-900 dark:text-slate-100">
                        {post.title}
                      </h2>
                    </div>
                    <div className="prose max-w-none text-slate-500 dark:text-slate-400">
                      {post.overview}
                    </div>
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        )}
      </div>
    </HelmetProvider>
  );
};

export default Blog;
