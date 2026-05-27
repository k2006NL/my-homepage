import { IconType } from "react-icons";
type Props = {
    icon: IconType
    label: string
    className: string
}


export function TechStack({ icon, className, label }: Props) {
  const Icon = icon
  return (
    <div className="flex flex-col items-center gap-1 p-3 border border-gray-300 dark:border-zinc-700 rounded min-w-17.5">
      <Icon className={`text-2xl ${className}`} />
      <span className="text-[10px] font-bold text-gray-500">{label}</span>
    </div>
  )
}