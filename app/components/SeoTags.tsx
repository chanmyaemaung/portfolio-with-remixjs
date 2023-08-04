import React from "react";
import { Helmet } from "react-helmet-async";
import { SEOProps } from "~/utils/interface"; // Make sure to import SEOProps

interface SEOComponentProps {
  seo: SEOProps; // Use the SEOProps interface here
}

const SEO: React.FC<SEOComponentProps> = ({ seo }) => {
  const {
    title,
    description,
    siteName,
    keywords,
    canonicalUrl,
    robots,
    author,
    publisher,
    imageUrl,
    twitterHandle,
  } = seo;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      {/* Robots Tag */}
      <meta name="robots" content={robots} />
      {/* Author */}
      <meta name="author" content={author} />
      {/* Publisher */}
      <meta name="publisher" content={publisher} />
      {/* Blog Image */}
      <meta property="og:image" content={imageUrl} />
      <meta name="twitter:image" content={imageUrl} />
      {/* Open Graph Tags for Facebook */}
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={siteName} />
      {/* Replace with your actual site name */}
      <meta property="og:locale" content="en_US" />
      {/* Set the locale according to your content */}
      <meta property="article:author" content={`${canonicalUrl}`} />
      {/* Link to the author's page */}
      <meta property="article:publisher" content={`${canonicalUrl}`} />
      {/* Link to the publisher's page */}
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterHandle} />
      {/* Replace with your Twitter handle */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:creator" content={twitterHandle} />
      {/* Replace with your Twitter handle */}
    </Helmet>
  );
};

export default SEO;
