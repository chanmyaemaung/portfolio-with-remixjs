import { Link } from "@remix-run/react";

interface BreadcrumbProps {
  postTitle: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ postTitle }) => {
  return (
    <nav aria-label="Breadcrumb" className="text-gray-500 dark:text-gray-400">
    <ul className="flex flex-wrap space-x-2">
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>/</li>
      <li>
        <Link to="/blog">Blog</Link>
      </li>
      <li>/</li>
      <li title={postTitle} className="truncate max-w-[160px] md:max-w-[220px]">
        {postTitle}
      </li>
    </ul>
  </nav>
  );
};

export default Breadcrumb;