export interface Post {
  posts: {
    id: String;
    title: String;
    slug: String;
    overview: String;
    createdAt: String;
  }[];
}

export interface PostId {
  post: {
    id: String;
    title: String;
    slug: String;
    overview: String;
    featuredImage: {
      url: String;
    }
    publishedAt: String;
    content: any;
  };
}

export interface iProjects {
  projects: {
    id: String;
    title: String;
    link: String;
    slug: String;
    overview: String;
    titleImage: {
      url: String;
    };
    publishedAt: String;
  }[];
}

export interface MyProfile {
  profile: {
    id: String;
    name: String;
    overview: String;
    about: any;
    profileImage: {
      url: String;
    };
    github: String;
    facebook: String;
    instagram: String;
    linkedin: String;
    email: String;
  };
}

export interface SEOProps {
  title: string;
  description: string;
  keywords: string;
  canonicalUrl: string;
  robots: string;
  author: string;
  publisher: string;
  imageUrl: string;
  twitterHandle: string;
}