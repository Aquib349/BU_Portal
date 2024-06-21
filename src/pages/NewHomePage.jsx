const NewHomePage = () => {
  return (
    <>
      <div>
        <div
          id="accordion-color"
          data-accordion="collapse"
          data-active-classes="bg-blue-100 dark:bg-gray-800 text-blue-600 dark:text-white"
        >
          <h2 id="accordion-color-heading-1">
            <button
              type="button"
              class="flex w-full items-center justify-between gap-3 rounded-t-xl border border-b-0 border-gray-200 p-5 font-medium text-gray-500 hover:bg-blue-100 focus:ring-4 focus:ring-blue-200 rtl:text-right dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:focus:ring-blue-800"
              data-accordion-target="#accordion-color-body-1"
              aria-expanded="true"
              aria-controls="accordion-color-body-1"
            >
              <span>What is Flowbite?</span>
              <svg
                data-accordion-icon
                class="h-3 w-3 shrink-0 rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5 5 1 1 5"
                />
              </svg>
            </button>
          </h2>
          <div
            id="accordion-color-body-1"
            class="hidden"
            aria-labelledby="accordion-color-heading-1"
          >
            <div class="border border-b-0 border-gray-200 p-5 dark:border-gray-700 dark:bg-gray-900">
              <p class="mb-2 text-gray-500 dark:text-gray-400">
                Flowbite is an open-source library of interactive components
                built on top of Tailwind CSS including buttons, dropdowns,
                modals, navbars, and more.
              </p>
              <p class="text-gray-500 dark:text-gray-400">
                Check out this guide to learn how to{" "}
                <a
                  href="/docs/getting-started/introduction/"
                  class="text-blue-600 hover:underline dark:text-blue-500"
                >
                  get started
                </a>{" "}
                and start developing websites even faster with components on top
                of Tailwind CSS.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewHomePage;
