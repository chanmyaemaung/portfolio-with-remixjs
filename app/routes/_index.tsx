import { LoaderArgs, json } from "@remix-run/node";
import { gql } from "graphql-request";
import { hygraph } from "~/utils/hygraph.server";
import { MyProfile } from "~/utils/interface";
import { useLoaderData } from "@remix-run/react";
import { RichText } from "@graphcms/rich-text-react-renderer";

interface iAppProps {
  profile: MyProfile;
}

export async function loader({}: LoaderArgs) {
  const specificProfileId = "clkv1vwyk27fq0bphi9n1lrvk";

  const query = gql`
    query MyProfile {
      profile(where: { id: "${specificProfileId}" }) {
        id
        name
        overview
        about {
          raw
        }
        profileImage {
          url
        }
        github
        facebook
        instagram
        linkedin
        email
      }
    }
  `;

  const profile = await hygraph.request(query);

  return json({ profile });
}

const IndexPage = () => {
  const { profile } = useLoaderData() as iAppProps;

  const {
    id,
    name,
    overview,
    about,
    profileImage: { url: profileImage },
    github,
    facebook,
    instagram,
    linkedin,
    email,
  } = profile.profile;

  return (
    <div className="divide-y divide-slate-200 dark:divide-slate-700">
      <div className="space-y-2 pt-6 pb-8 md:space-x-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-blue-900 dark:text-blue-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          Home
        </h1>
      </div>

      <div className="items-center spacey-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
        <div className="flex flex-col items-center pt-8" data-key={id}>
          <img
            src={profileImage.toString()}
            alt="Chen Lay Profile Image"
            className="h-48 w-48 rounded-full object-cover object-top"
            loading="lazy"
          />
          <h3 className="pt-4 pb-2 text-2xl font-bold leading-8 tracking-tight">
            {name}
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-center">
            {overview}
          </p>

          {/* Social Icons */}
          <div className="flex space-x-5 pt-6">
            <a href={github.toString()} target="_blank">
              <svg
                viewBox="0 0 1024 1024"
                fill="currentColor"
                className="w-8 h-8 text-blue-500 hover:text-blue-600"
              >
                <path d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9a127.5 127.5 0 0138.1 91v112.5c.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z" />
              </svg>
            </a>
            <a href={facebook.toString()} target="_blank">
              <svg
                fill="currentColor"
                viewBox="0 0 16 16"
                className="w-8 h-8 text-blue-500 hover:text-blue-600"
              >
                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
              </svg>
            </a>
            <a href={instagram.toString()} target="_blank">
              <svg
                viewBox="0 0 1024 1024"
                fill="currentColor"
                className="w-8 h-8 text-blue-500 hover:text-blue-600"
              >
                <path d="M512 378.7c-73.4 0-133.3 59.9-133.3 133.3S438.6 645.3 512 645.3 645.3 585.4 645.3 512 585.4 378.7 512 378.7zM911.8 512c0-55.2.5-109.9-2.6-165-3.1-64-17.7-120.8-64.5-167.6-46.9-46.9-103.6-61.4-167.6-64.5-55.2-3.1-109.9-2.6-165-2.6-55.2 0-109.9-.5-165 2.6-64 3.1-120.8 17.7-167.6 64.5C132.6 226.3 118.1 283 115 347c-3.1 55.2-2.6 109.9-2.6 165s-.5 109.9 2.6 165c3.1 64 17.7 120.8 64.5 167.6 46.9 46.9 103.6 61.4 167.6 64.5 55.2 3.1 109.9 2.6 165 2.6 55.2 0 109.9.5 165-2.6 64-3.1 120.8-17.7 167.6-64.5 46.9-46.9 61.4-103.6 64.5-167.6 3.2-55.1 2.6-109.8 2.6-165zM512 717.1c-113.5 0-205.1-91.6-205.1-205.1S398.5 306.9 512 306.9 717.1 398.5 717.1 512 625.5 717.1 512 717.1zm213.5-370.7c-26.5 0-47.9-21.4-47.9-47.9s21.4-47.9 47.9-47.9 47.9 21.4 47.9 47.9a47.84 47.84 0 01-47.9 47.9z" />
              </svg>
            </a>
            <a href={linkedin.toString()} target="_blank">
              <svg
                viewBox="0 0 1024 1024"
                fill="currentColor"
                className="w-8 h-8 text-blue-500 hover:text-blue-600"
              >
                <path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zM349.3 793.7H230.6V411.9h118.7v381.8zm-59.3-434a68.8 68.8 0 1168.8-68.8c-.1 38-30.9 68.8-68.8 68.8zm503.7 434H675.1V608c0-44.3-.8-101.2-61.7-101.2-61.7 0-71.2 48.2-71.2 98v188.9H423.7V411.9h113.8v52.2h1.6c15.8-30 54.5-61.7 112.3-61.7 120.2 0 142.3 79.1 142.3 181.9v209.4z" />
              </svg>
            </a>
            <a href={`mailto:${email}`} target="_blank">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-8 h-8 text-blue-500 hover:text-blue-600"
              >
                <path d="M20 8l-8 5-8-5V6l8 5 8-5m0-2H4c-1.11 0-2 .89-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2z" />
              </svg>
            </a>
          </div>
        </div>

        {/* About Me */}
        <div className="prose max-w-none prose-lg pt-8 pb-8 dark:prose-invert xl:col-span-2">
          <RichText
            content={about.raw}
            renderers={{
              code_block: ({ children }) => {
                return (
                  <pre className="line-numbers language-javascript">
                    <code>{children}</code>
                  </pre>
                );
              },
              img: ({ src, altText, height, width }) => (
                <img
                  src={src}
                  alt={altText}
                  width={width}
                  height={height}
                  loading="lazy"
                  className="rounded-lg w-full"
                />
              ),
              a: ({ children, openInNewTab, href, rel, ...rest }) => (
                <a
                  href={href}
                  target={openInNewTab ? "_blank" : "_self"}
                  {...rest}
                  className="text-blue-500 hover:text-blue-600"
                >
                  {children}
                </a>
              ),
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
