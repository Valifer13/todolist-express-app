import { useNavigate } from "react-router-dom";
import { FormInput } from "../../components/Input";
import { useState } from "react";
import { Button } from "../../components/Button";

export default function LoginForm() {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/v1/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            })

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log('Login successful:', result);

            localStorage.setItem('token', result.data.tokens.accessToken);
            localStorage.setItem('refresh-token', result.data.tokens.refreshToken);

            alert('Login successful!');
            // Redirect or perform further actions after login
            navigate('/todos');
        } catch (error) {
            console.error('There was a problem with the login:', error);
        }
    }

    return (
        <div className="w-full min-h-screen bg-white flex justify-center items-center">
            <form onSubmit={handleSubmit} action="/api/v1/users/login" method="post" className="flex flex-col gap-4 min-w-sm mx-auto p-8 bg-zinc-100 rounded-md border border-zinc-200">
                <h1 className="text-2xl font-medium text-center">Login</h1>
                <FormInput type="email" formLabel="Email" formTarget="email" setTarget={setEmail} />
                <FormInput type="password" formLabel="Password" formTarget="password" setTarget={setPassword} />
                <Button type="submit" title="Login" variants="primary" />
            </form>
        </div>
    )
}