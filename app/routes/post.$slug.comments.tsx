import { ActionArgs, LoaderArgs, json } from "@remix-run/node";
import {
  Form,
  useLoaderData,
  useNavigation,
  useParams,
} from "@remix-run/react";
import { db } from "~/utils/db.server";

export async function loader({ params }: LoaderArgs) {
  const data = await db.comment.findMany({
    where: {
      postSlug: params.slug,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return json({ data });
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();

  const data = await db.comment.create({
    data: {
      postSlug: formData.get("slug") as string,
      message: formData.get("comment") as string,
    },
  });

  return json({ data });
}

export default function Comments() {
  const { slug } = useParams();
  const { data } = useLoaderData<typeof loader>();
  const navigation = useNavigation();

  return (
    <div className="rounded-lg border p-4">
      <h2 className="text-xl font-semibold mb-5">Have an Opinion?</h2>

      {/* Create */}
      <div>
        <Form method="POST">
          <textarea
            name="comment"
            className="w-full border border-blue-500 bg-white text-black dark:bg-slate-900 dark:text-white rounded-lg p-2"
          ></textarea>
          <input type="hidden" name="slug" value={slug} />

          {navigation.state === "submitting" ? (
            <button
              type="submit"
              disabled
              className="bg-blue-500 px-4 py-2 rounded-lg text-white disabled:opacity-50"
            >
              Adding Comment...
            </button>
          ) : (
            <button
              type="submit"
              className="bg-blue-500 px-4 py-2 rounded-lg text-white"
            >
              Add Comment
            </button>
          )}
        </Form>

        {/* All Comments */}
        <div className="mt-5 flex flex-col gap-y-3">
          <h3 className="text-xl">All Comments: </h3>
          {data.length > 0 ? (
            data.map((post) => (
              <div key={post.id}>
                <p>{post.message}</p>
              </div>
            ))
          ) : (
            <p>No comments yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
