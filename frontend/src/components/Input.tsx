export function FormInput({ type, formLabel, formTarget, setTarget }: { type: string, formLabel: string, formTarget: string, setTarget: (value: string) => void }) {
    return (
        <div className="flex flex-col">
            <label htmlFor={formTarget} className="font-medium">{formLabel}:</label>
            <input onChange={(e) => setTarget(e.target.value)} type={type} name={formTarget} id={formTarget} placeholder={`${formLabel}...`} className="p-2 border-[1px] border-zinc-300 bg-white rounded-md" />
        </div>
    )
}

export function Input({ type, classes, placeholder, setTarget }: { type: string, classes?: string, placeholder: string, setTarget: (value: string) => void }) {
    return (
        <input type={type} className={`bg-zinc-50 border-[1px] border-zinc-300 px-3 p-2 ${classes}`} placeholder={placeholder} onChange={(e) => setTarget(e.target.value)} />
    )
}