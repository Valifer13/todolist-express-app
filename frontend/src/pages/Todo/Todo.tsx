import { useEffect, useState } from "react";
import fetchWithAuth from "../../helpers/fetchWithAuth";
import { Button } from "../../components/Button";
import { FormInput, Input, InputSelect, TextareaInput } from "../../components/Input";
import TodoCard from "../../components/Todo/TodoCard";
import type { TodoProps } from "../../lib/stores";

export default function Todo() {
    const [todos, setTodos] = useState<TodoProps[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [todoTitle, setTodoTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState<Priority | string>('LOW');
    const [status, setStatus] = useState<Status | string>('PENDING');

    async function fetchTodos() {
        const response = await fetchWithAuth('/todos');
        if (response && response.ok) {
            const data = await response.json();
            console.log(data.data.todos);
            setTodos(data.data.todos);
        }
    }

    async function addTodo(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            const response = await fetchWithAuth('/todos', {
                method: 'POST',
                body: JSON.stringify({
                    name: todoTitle,
                    description,
                    dueDate: new Date(dueDate),
                    priority,
                    status,
                    categoryId: null, // Assuming categoryId is optional
                })
            })

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log('Todo added successfully:', result);
            alert('Todo added successfully!');

            setModalOpen(false);
            setTodoTitle('');
            setDescription('');
            setDueDate('');
            setPriority('LOW');
            setStatus('PENDING');
        } catch (error) {
            console.error('Error adding todo:', error);
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
                <button className="p-2 bg-zinc-200 hover:bg-zinc-300 cursor-pointer border border-zinc-400 rounded-md" onClick={() => setModalOpen(!modalOpen)}>+ Add Todo</button>
            </div>
            <div className="grid grid-cols-3 gap-3">
                {todos.map((todo, i) => <TodoCard data={todo} key={i} /> )}
            </div>

            {modalOpen && (
                <div className="fixed flex inset-0 justify-center items-center bg-[rgba(0,0,0,.3)] z-50">
                    <form onSubmit={addTodo} action='/api/v1/todos' method="post" className="w-fit p-4 rounded-md bg-white flex flex-col gap-3">
                        <h1 className="text-xl font-medium min-w-xs">Add New Todolist</h1>
                        <FormInput type="text" setTarget={setTodoTitle} formLabel="Name" name="name" />
                        <TextareaInput name="description" formLabel="Description" rows={4} cols={50} placeholder="Description..." setTarget={setDescription} />
                        <InputSelect name="status" formLabel="Status" options={['PENDING', 'IN_PROGRESS', 'COMPLETE', 'CANCELED']} setTarget={setStatus} />
                        <FormInput type="date" setTarget={setDueDate} formLabel="Due Date" name="dueDate" />
                        <InputSelect name="priority" formLabel="Priority" options={['LOW', 'MEDIUM', 'HIGH']} setTarget={setPriority} />
                        {/* <DatalistInput name="category" formLabel="Category" options={['Work', 'Personal', 'Urgent']} setTarget={() => {}} /> */}
                        <div className="flex justify-end gap-2 mt-4">
                            <Button title="Cancel" setTarget={setModalOpen} targetValue={modalOpen} />
                            <Button title="Submit" type="submit" variants="primary" />
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
}