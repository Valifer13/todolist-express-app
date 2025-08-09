export type Priority = 'LOW' | 'MEDIUM' | 'HIGH';

export type Status = 'PENDING' | 'COMPLETE' | 'IN_PROGRESS' | 'CANCELED';

export type TodoProps = {
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