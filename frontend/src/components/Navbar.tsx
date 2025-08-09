export default function Navbar() {
    return (
        <nav className="w-fit min-h-screen border-r border-r-zinc-300 top-0 left-0 bg-zinc-50 backdrop-blur-sm z-50">
            <div className="min-w-[250px] flex flex-col gap-8 items-center justify-between p-4">
                <h1 className="text-3xl font-bold">☼ Todolist</h1>
                <ul className="flex w-full flex-col gap-4 space-x-6 *:rounded-md *:py-2 *:px-3 *:w-full *:hover:bg-zinc-300 *:text-xl *:font-medium *:text-black *:transition-all *:duration-300">
                    <a href="/"><li>Home</li></a>
                    <a href="/todos"><li>Todo</li></a>
                    <a href="/categories"><li>Category</li></a>
                    <a href="/users"><li>People</li></a>
                </ul>
            </div>
        </nav>
    )
}