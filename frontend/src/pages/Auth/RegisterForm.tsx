import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { FormInput } from "../../components/Input";

export default function RegisterForm() {
    const navigate = useNavigate();
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordConfirm, setPasswordConfirm] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/v1/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                    passwordConfirm,
                }),
            })

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log('Registration successful:', result);
            alert('Registration successful! Please log in.');
            navigate('/login');
        } catch (error) {
            console.error('There was a problem with the registration:', error);
            alert('Registration failed. Please try again.');
        }
    };

    return (
        <div onSubmit={handleSubmit} className="w-full min-h-screen bg-white flex justify-center items-center">
            <form action="/api/v1/users/register" method="post" className="flex flex-col gap-4 min-w-sm mx-auto p-8 bg-zinc-100 rounded-md border border-zinc-300">
                <h1 className="text-center text-2xl font-bold mb-5">Register Your Account</h1>
                <FormInput type="text" formLabel="Username" formTarget="username" setTarget={setUsername} />
                <FormInput type="email" formLabel="Email" formTarget="email" setTarget={setEmail} />
                <FormInput type="password" formLabel="Password" formTarget="password" setTarget={setPassword} />
                <FormInput type="password" formLabel="PasswordConfirm" formTarget="password" setTarget={setPasswordConfirm} />
                <Button type="submit" title="Register" variants="primary" />
                <p className="text-sm text-zinc-400">Already have account? <a href="/login" className="text-zinc-500 hover:text-zinc-800 hover:underline">Login</a></p>
            </form>
        </div>
    )
}