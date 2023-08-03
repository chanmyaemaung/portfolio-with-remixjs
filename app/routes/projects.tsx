import { LoaderArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { gql } from "graphql-request";
import { hygraph } from "~/utils/hygraph.server";
import { iProjects } from "~/utils/interface";

interface iAppProps {
  projects: iProjects;
}

export async function loader({}: LoaderArgs) {
  const query = gql`
    query MyProjects {
      projects {
        id
        title
        link
        overview
        titleImage {
          url
        }
        publishedAt
      }
    }
  `;

  const projects = await hygraph.request(query);

  return json({ projects });
}

const Projects = () => {
  const { projects } = useLoaderData() as iAppProps;

  return (
    <div className="divide-y divide-blue-200 dark:divide-blue-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-blue-900 dark:text-blue-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          All Projects
        </h1>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-10 pt-8">
        {projects.projects.map((project) => (
          <article
            key={project.id.toString()}
            className="overflow-hidden rounded-lg border border-slate-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-800 dark:shadow-slate-700/25"
          >
            <img
              src={project.titleImage.url.toString()}
              alt="Image of Project"
              className="h-56 w-full object-cover"
            />
            <div className="p-4 sm:p-6">
              <a href={project.link.toString()} target="_blank">
                <h3 className="text-lg font-medium text-slate-900 dark:text-white">
                  {project.title}
                </h3>
              </a>

              <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                {project.overview}
              </p>

              <a
                href={project.link.toString()}
                target="_blank"
                className="group mt-4 inline-flex items-center gap-1 text-sm fotn-medium text-blue-500"
              >
                Learn More!
                <span className="block transition-all group-hover:ms-0.5">
                  &rarr;
                </span>
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Projects;
