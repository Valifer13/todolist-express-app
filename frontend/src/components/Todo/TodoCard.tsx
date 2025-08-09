import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import { Button } from "../Button";
import type { TodoProps } from "../../lib/stores";

const priorityColors = {
    LOW: "bg-green-400 hover:bg-green-500",
    MEDIUM: "bg-yellow-400 hover:bg-yellow-500",
    HIGH: "bg-red-400 hover:bg-red-500",
};

export default function TodoCard({ data }: { data: TodoProps }) {
    const [cardIsActive, setCardIsActive] = useState(false);

    return (
        <div className="grid gap-3 w-full min-h-fit p-3 border border-zinc-300 rounded-lg cursor-pointer bg-white hover:bg-zinc-100" onClick={() => { setCardIsActive(!cardIsActive); console.log(cardIsActive) }}>
            <div className="flex justify-between items-center">
                <div className={`px-2 py-1 rounded-sm text-white text-xs ${priorityColors[data.priority]}`}>{data.priority}</div>
                <div className="rounded-full h-5 w-5 bg-white border border-zinc-300 cursor-pointer"></div>
            </div>
            <div className="w-full flex flex-col">
                <h2 className="font-medium text-lg">{data.name}</h2>
                <p className="text-zinc-400 text-md">{data.description}</p>
            </div>
            <div className="mt-3 gap-1 flex flex-col w-full">
                <p className="text-end text-zinc-400 text-md">{data.dueDate ? formatDistanceToNow(data.dueDate, { addSuffix: true }) : "Not in due"}</p>
                <Button title="Checklist" variants="primary" />
            </div>
        </div>
    )
}