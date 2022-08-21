import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div
      class="
    flex
    items-center
    justify-center
    w-screen
    h-screen
    bg-gradient-to-br from-dark to-primary
  "
    >
      <div class="px-40 py-20 bg-white rounded-md shadow-xl">
        <div class="flex flex-col items-center">
          <h1 class="font-bold text-primary text-9xl">404</h1>

          <h6 class="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
            <span class="text-red-500">Oops!</span> Page not found
          </h6>

          <p class="mb-8 text-center text-primary md:text-lg">
            The page you’re looking for doesn’t exist.
          </p>

          <Link
            to="/login"
            class="rounded shadow hover:shadow-lg px-6 py-2 text-lg font-semibold text-white hover:text-white bg-primary"
          >
            Go To Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
