import { useRouteData } from "solid-app-router";
import { createComputed, createMemo, createResource, For } from "solid-js";
import server from "solid-start/server";
import { LogoutButton } from "~/components/LogoutButton";
import { getPosts } from "~/post";
import { requireUserId } from "~/session";

export const routeData = () => {
  return createResource(
    server(async function () {
      await requireUserId(this, "/admin");
      return await getPosts();
    })
  );
};

export default function AdminIndex() {
  const [data] = useRouteData<ReturnType<typeof routeData>>();
  return (
    <>
      <div class="bg-white shadow overflow-hidden sm:rounded-md relative max-w-lg mx-auto lg:max-w-7xl">
        <div class="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
          <div class="-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-nowrap">
            <div class="ml-4 mt-4">
              <h3 class="text-lg leading-6 font-medium text-gray-900">Admin: The Solid Blog</h3>
              <p class="mt-1 text-sm text-gray-500">Edit your current posts and add new posts.</p>
            </div>
            <div class="ml-4 mt-4 flex-shrink-0">
              <button
                type="button"
                class="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create new post
              </button>
            </div>
          </div>
        </div>
        <ul role="list" class="divide-y divide-gray-200">
          <For each={data()}>
            {post => (
              <li>
                <a href={`/admin/post/${post.slug}`} class="block hover:bg-gray-50">
                  <div class="flex items-center px-4 py-4 sm:px-6">
                    <div class="min-w-0 flex-1 flex items-center md:grid md:grid-cols-2 md:gap-4">
                      <div>
                        <p class="text-sm font-medium text-indigo-600 truncate">{post.title}</p>
                        <p class="mt-2 flex items-center text-sm text-gray-500">
                          <span class="truncate">{post.description}</span>
                        </p>
                      </div>
                      <div class="ml-auto">
                        <svg
                          class="h-5 w-5 text-gray-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
            )}
          </For>

          {/* <li>
            <a href="#" class="block hover:bg-gray-50">
              <div class="flex items-center px-4 py-4 sm:px-6">
                <div class="min-w-0 flex-1 flex items-center">
                  <div class="flex-shrink-0">
                    <img
                      class="h-12 w-12 rounded-full"
                      src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </div>
                  <div class="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                    <div>
                      <p class="text-sm font-medium text-indigo-600 truncate">Kristen Ramos</p>
                      <p class="mt-2 flex items-center text-sm text-gray-500">
                        <svg
                          class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                        <span class="truncate">kristen.ramos@example.com</span>
                      </p>
                    </div>
                    <div class="hidden md:block">
                      <div>
                        <p class="text-sm text-gray-900">
                          Applied on
                          <time datetime="2020-01-07">January 7, 2020</time>
                        </p>
                        <p class="mt-2 flex items-center text-sm text-gray-500">
                          <svg
                            class="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clip-rule="evenodd"
                            />
                          </svg>
                          Completed phone screening
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <svg
                    class="h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </a>
          </li> */}
        </ul>
      </div>
    </>
  );
}