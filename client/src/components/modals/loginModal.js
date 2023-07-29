import React, { useState } from 'react'
import { login } from '../../firebase';

const LoginModal = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = await login(email, password);
        // user.emailVerified &&
    };
    return (
        <form className="mt-6" onSubmit={handleSubmit}>
            <div>
                <label className="block text-gray-700">Email Address</label>
                <input
                    type="email"
                    name=""
                    id=""
                    placeholder="Enter Email Address"
                    className="w-full px-4 py-3 mt-2 bg-gray-200 border rounded-lg focus:border-blue-500 focus:bg-white focus:outline-none"
                    autoFocus
                    autoComplete="on"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className="mt-4">
                <label className="block text-gray-700">Password</label>
                <input
                    type="password"
                    name=""
                    id=""
                    placeholder="Enter Password"
                    minLength="6"
                    className="w-full px-4 py-3 mt-2 bg-gray-200 border rounded-lg focus:border-blue-500 focus:bg-white focus:outline-none"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <div className="mt-2 text-right">
                <a
                    href="#"
                    className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700"
                >
                    Forgot Password?
                </a>
            </div>

            <button
                diabled={email || password}
                type="submit"
                className="block w-full px-4 py-3 mt-6 font-semibold text-white bg-pink-500 rounded-lg hover:bg-pink-400 focus:bg-pink-400"
            >
                Log In
            </button>
        </form>
    )
}

export default LoginModal