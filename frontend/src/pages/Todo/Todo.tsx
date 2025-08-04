import { useEffect, useState } from "react";
import fetchWithAuth from "../../helpers/fetchWithAuth";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

type Priority = 'LOW' | 'MEDIUM' | 'HIGH';
type Status = 'PENDING' | 'COMPLETE' | 'IN_PROGRESS' | 'CANCELED';

type TodoProps = {
    id: number;
    name: string;
    uuid: string;
    description: string;
    status: Status;
    dueDate: string;
    priority: Priority;
    createdAt: string;
    updatedAt: string;
    userId: number;
    categoryId: number;
}

export default function Todo() {
    const [todos, setTodos] = useState<TodoProps[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    async function fetchTodos() {
        const response = await fetchWithAuth('/todos');
        if (response && response.ok) {
            const data = await response.json();
            console.log(data.data.todos);
            setTodos(data.data.todos);
        }
    }

    useEffect(() => {
        fetchTodos();
    }, []);

    return (
        <div className="p-8">
            <h1 className="text-3xl font-medium mb-5">Todo List</h1>
            <div className="flex justify-between items-center mb-5">
                <form action={`/todos/search/${searchQuery}`}>
                    <Input type="text" placeholder="🔍 Search todo..." setTarget={setSearchQuery} classes="rounded-s-sm" />
                    <Button type="submit" title="Search" className="w-fit rounded-s-none" />
                </form>
                <Button type="button" title="+ Add Todo" className="w-fit" />
            </div>
            <div className="grid grid-cols-3 gap-3 *:bg-zinc-50 *:rounded-md *:border-zinc-300 *:border-[1px] *:p-4 *:w-full **:transition-all **:duration-300">
                {todos.map((todo, i) => (
                    <div key={i} className="grid gap-2 group/due-date">
                        <div className="flex w-full justify-between items-center">
                            <div className="bg-blue-200 hover:bg-blue-300 px-3 py-1 rounded-md text-xs font-medium cursor-pointer">{todo.priority}</div>
                            <div className="py-1 px-2 rounded-sm bg-zinc-200 hover:bg-zinc-300 text-center cursor-pointer">•••</div>
                        </div>
                        <a href="#" className="text-xl font-medium text-black hover:text-zinc-700">{todo.name}</a>
                        <p className="text-zinc-600">{todo.description}</p>
                        <div className="flex w-full justify-between items-center *:text-zinc-500">
                            <div className="group-hover/due-date:w-full w-0 h-[1px] bg-zinc-500 relative top-0.5"></div>
                            <p className="bg-inherit ps-2">{todo.dueDate || 'unknown'}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}