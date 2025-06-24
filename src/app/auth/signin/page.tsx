import {anonymousPro, robotoMono} from "@/lib/fonts";
import Image from "next/image";
import Link from "next/link";

const SignIn = () => {
  return (
    <div className="bg-white flex items-start min-h-screen p-4 container mx-auto">
      <div className="flex flex-col lg:flex-row bg-white rounded-lg shadow-xl overflow-hidden w-full my-auto">
        <div className="lg:w-1/2 p-8 lg:p-16 flex flex-col lg:text-left bg-gradient-to-br from-gray-50 to-gray-100">
          <Image
            src="/shopping-bag.svg"
            alt="E-commerce store-front"
            className="mr-5"
            height={390}
            width={390}
          />

          <h1
            className={`${anonymousPro.className} text-4xl lg:text-4xl font-bold text-gray-800 mb-6 leading-tight w-1/2`}
          >
            The E-Commerce Store-Front
          </h1>
          <ul
            className={`text-gray-700 text-base ${robotoMono.className} w-full`}
          >
            <li className={`flex items-start`}>
              <svg
                className="w-6 h-6 text-green-600 mr-3 mt-1 lg:mt-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              Filter by category, search by name or description
            </li>
            <li className="flex items-start lg:items-center">
              <svg
                className="w-6 h-6 text-green-600 mr-3 mt-1 lg:mt-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              Sign up and save your details for the next checkout
            </li>
            <li className="flex items-start lg:items-center">
              <svg
                className="w-6 h-6 text-green-600 mr-3 mt-1 lg:mt-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              Select favorites <span className="text-xs text-slate-600 italic mx-2 pt-1">Coming soon!</span>
            </li>
          </ul>
        </div>

        <div className="lg:w-2/3 p-8 lg:p-16 bg-gray-50 flex flex-col justify-center items-center">
          <div className="w-full bg-gray-200 p-8 shadow-md mb-8">
            <h2
              className={`${anonymousPro.className} text-3xl font-semibold text-gray-800 mb-6 w-1/3`}
            >
              Log in to your account.
            </h2>
            <form className={`${robotoMono.className}`}>
              <div className="mb-4">
                <input
                  type="email"
                  id="email-create"
                  name="email"
                  placeholder="Email"
                  className="appearance-none block w-full bg-white text-gray-700 border border-gray-300 rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 transition duration-300 ease-in-out"
                  required
                />
              </div>
              <div className="mb-6">
                <input
                  type="password"
                  id="password-create"
                  name="password"
                  placeholder="Password"
                  className="appearance-none block w-full bg-white text-gray-700 border border-gray-300 rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 transition duration-300 ease-in-out"
                  required
                />
              </div>

              <div className="flex gap-2 w-full justify-between">
                <div className="">
                  <Link className="" href="/auth/signup">
                    Sign up instead?
                  </Link>

                </div>
                <button
                  type="submit"
                  className={`${anonymousPro.className} mt-3 bg-gray-800 text-white px-5 py-2 rounded-none shadow-md hover:bg-gray-700 transition duration-300 transform hover:-translate-y-0.5`}
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
