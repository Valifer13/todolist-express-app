export function FormInput({ type, formLabel, name, setTarget }: { type: string, formLabel: string, name: string, setTarget: (value: string) => void }) {
    return (
        <div className="flex flex-col">
            <label htmlFor={name} className="font-medium">{formLabel}:</label>
            <input onChange={(e) => setTarget(e.target.value)} type={type} name={name} id={name} placeholder={`${formLabel}...`} className="p-2 border-[1px] border-zinc-300 bg-white rounded-md" />
        </div>
    )
}

export function TextareaInput({ rows, cols, placeholder, formLabel, name, setTarget }: { rows: number, cols: number, placeholder: string, formLabel: string, name: string, setTarget: (value: string) => void}) {
    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={name} className="font-medium">{formLabel}:</label>
            <textarea name={name} rows={rows} cols={cols} placeholder={placeholder} className="p-2 border-[1px] border-zinc-300 bg-white rounded-md" onChange={(e) => setTarget(e.target.value)}></textarea>
        </div>
    )
}

export function InputSelect({ name, formLabel, options, setTarget }: { name: string, formLabel: string, options: string[], setTarget: (value: string) => void }) {
    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={name} className="font-medium">{formLabel}:</label>
            <select name={name} className="p-2 border-[1px] border-zinc-300 bg-white rounded-md" onChange={(e) => setTarget(e.target.value)}>
                {options.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                ))}
            </select>
        </div>
    )
}

export function DatalistInput({ name, formLabel, options, setTarget }: { name: string, formLabel: string, options: string[], setTarget: (value: string) => void }) {
    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={name} className="font-medium">{formLabel}:</label>
            <input list={name} name={name} className="p-2 border-[1px] border-zinc-300 bg-white rounded-md" onChange={(e) => setTarget(e.target.value)} />
            <datalist id={name}>
                {options.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                ))}
            </datalist>
        </div>
    )
}

export function Input({ type, classes, placeholder, setTarget }: { type: string, classes?: string, placeholder: string, setTarget: (value: string) => void }) {
    return (
        <input type={type} className={`bg-zinc-50 border-[1px] border-zinc-300 px-3 p-2 ${classes}`} placeholder={placeholder} onChange={(e) => setTarget(e.target.value)} />
    )
}