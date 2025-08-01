type ButtonProps = {
    title: string;
    type?: "submit" | "button";
    variants?: "primary" | "default";
}

export function Button({ title, type = "button", variants = "default" }: ButtonProps) {
    return (
        variants === "primary" ?
            (<button type={ type } className="bg-blue-500 text-white px-4 py-2 rounded-md w-full mt-5 hover:bg-blue-600 transition-all duration-300">
                { title }
            </button>)
        :
            (<button type={ type } className="bg-zinc-300 px-4 py-2 rounded-md border border-zinc-400 w-full mt-5 hover:bg-zinc-400 transition-all duration-300">
                { title } 
            </button>)
    );
}