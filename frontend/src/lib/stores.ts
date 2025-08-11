export type TodoPriority = 'LOW' | 'MEDIUM' | 'HIGH';

export type TodoStatus = 'PENDING' | 'COMPLETE' | 'IN_PROGRESS' | 'CANCELED';

export type TodoProps = {
    id: number;
    name: string;
    uuid: string;
    description: string;
    status: TodoStatus;
    dueDate: string;
    priority: TodoPriority;
    createdAt: string;
    updatedAt: string;
    userId: number;
    categoryId: number;
}