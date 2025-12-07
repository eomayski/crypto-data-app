export default function Login() {
    return (
        <div className="flex flex-grow items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8 bg-gray-800 p-10 rounded-xl shadow-2xl border border-indigo-500/30">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
                            Sign in to your account
                        </h2>
                        <p className="mt-2 text-center text-sm text-gray-400">
                            Don't have an account?{' '}
                            <a href="/register" className="font-medium text-indigo-400 hover:text-indigo-300">
                                Register here
                            </a>
                        </p>
                    </div>

                    <form className="mt-8 space-y-6">

                        <div className="rounded-md shadow-sm -space-y-px">

                            {/* Email Field */}
                            <div className="mb-3">
                                <label htmlFor="email-login" className="sr-only">Email address</label>
                                <input
                                    id="email-login"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="appearance-none relative block w-full px-3 py-3 border border-gray-600 placeholder-gray-500 text-white bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-t-md"
                                    placeholder="Email address"
                                />
                            </div>

                            {/* Password Field */}
                            <div>
                                <label htmlFor="password-login" className="sr-only">Password</label>
                                <input
                                    id="password-login"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none relative block w-full px-3 py-3 border border-gray-600 placeholder-gray-500 text-white bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-b-md"
                                    placeholder="Password"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150`}
                            >
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
    );
}