export default function LoginForm() {
    return (
        <div>
            <form action="/api/v1/users/login" method="post">
                <input type="text" name="username" id="username" placeholder="Username..." />
                <input type="text" name="password" id="password" placeholder="Password..." />
            </form>
        </div>
    )
}