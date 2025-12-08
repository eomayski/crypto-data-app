import { useContext } from "react";
import { Link, useNavigate } from "react-router";
import UserContext from "../../contexts/UserContext.jsx";
import useForm from "../../hooks/useForm.js";

export default function Register() {


const navigate = useNavigate();
    const { registerHandler } = useContext(UserContext)

    const registerSubmitHandler = async (values) => {
        const { email, password, confirmPassword, username, avatarUrl } = values;

        if (!email || !password) {
            return alert('Email and password are required!');
        }

        if (password !== confirmPassword) {
            return alert('Password mismatch!');
        }

        try {
            registerHandler(email, password, username, avatarUrl);

            navigate('/');
        } catch (err) {
            alert(err.message);
        }
    }

    const {
        register,
        formAction,
    } = useForm(registerSubmitHandler, {
        email: '',
        password: '',
        confirmPassword: '',
        username: '',
        avatarUrl: ''
    });


    return (
        <div className="flex flex-grow items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-gray-800 p-10 rounded-xl shadow-2xl border border-indigo-500/30">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
                        Create a New Account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-400">
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium text-indigo-400 hover:text-indigo-300">
                            Sign in
                        </Link>
                    </p>
                </div>

                <form className="mt-8 space-y-6" action={formAction}>

                    <div className="rounded-md shadow-sm -space-y-px">

                        {/* Email Field */}
                        <div className="mb-3">
                            <label htmlFor="email-register" className="sr-only">Email address</label>
                            <input
                                id="email-register"
                                {...register('email')}
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none relative block w-full px-3 py-3 border border-gray-600 placeholder-gray-500 text-white bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-t-md"
                                placeholder="Email address*"
                            />
                        </div>

                        {/* Password Field */}
                        <div className="mb-3">
                            <label htmlFor="password-register" className="sr-only">Password</label>
                            <input
                                id="password-register"
                                {...register('password')}
                                type="password"
                                autoComplete="new-password"
                                required
                                className="appearance-none relative block w-full px-3 py-3 border border-gray-600 placeholder-gray-500 text-white bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-none"
                                placeholder="Password*"
                            />
                        </div>

                        {/* Confirm Password Field */}
                        <div className="mb-3">
                            <label htmlFor="confirm-password-register" className="sr-only">Confirm Password</label>
                            <input
                                id="confirm-password-register"
                                {...register('confirmPassword')}
                                type="password"
                                autoComplete="new-password"
                                required
                                className="appearance-none relative block w-full px-3 py-3 border border-gray-600 placeholder-gray-500 text-white bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-none"
                                placeholder="Confirm Password*"
                            />
                        </div>

                        {/* Username Field */}
                         <div className="mb-3">
                            <label htmlFor="username-register" className="sr-only">Username</label>
                            <input
                                id="username-register"
                                {...register('username')}
                                className="appearance-none relative block w-full px-3 py-3 border border-gray-600 placeholder-gray-500 text-white bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-none"
                                placeholder="Username"
                            />
                        </div>

                        {/* Avatar Field */}
                        <div className="mb-3">
                            <label htmlFor="avatar-register" className="sr-only">Avatar</label>
                            <input
                                id="avatar-register"
                                {...register('avatarUrl')}
                                className="appearance-none relative block w-full px-3 py-3 border border-gray-600 placeholder-gray-500 text-white bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-b-md"
                                placeholder="Avatar URL"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150`}
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}