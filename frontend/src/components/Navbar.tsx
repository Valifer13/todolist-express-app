export default function Navbar() {
    return (
        <nav className="w-full border-b border-b-zinc-300 fixed top-o left-0 bg-[rgba(255,255,255,0.6)] backdrop-blur-sm z-50">
            <div className="min-w-2xl flex items-center justify-between px-8 py-2">
                <h1 className="text-3xl font-bold">⁜ Todolist</h1>
                <ul className="flex space-x-6 *:font-medium *:text-black *:hover:text-zinc-500 *:transition-all *:duration-300">
                    <li><a href="/">Home</a></li>
                    <li><a href="/todos">Todo</a></li>
                    <li><a href="/categories">Category</a></li>
                    <li><a href="/users">People</a></li>
                </ul>
            </div>
        </nav>
    )
}