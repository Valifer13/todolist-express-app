import { useEffect, useState } from "react";

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

    useEffect(() => {
        fetch('/api/v1/todos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setTodos(data.data.todos);
        })
        .catch(error => {
            console.error('There was a problem fetching the todos:', error);
        })
    }, []);

    return (
        <div className="p-8">
            <h1 className="text-3xl font-medium">Todo List</h1>
            <ul>
            {todos.map((todo, i) => (
                <li key={i}>{todo.name}</li>
            ))}
            </ul>
        </div>
    )
}