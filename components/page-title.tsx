import { Logo } from "./logo"

interface PageTitleProps {
  title: string
  description?: string
  className?: string
}

export function PageTitle({ title, description, className = "" }: PageTitleProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className="flex items-center gap-3">
        <Logo size={36} />
        <h1 className="text-3xl font-bold">{title.replace(/\s*panel\s*/i, "")}</h1>
      </div>
      {description && <p className="text-muted-foreground">{description}</p>}
    </div>
  )
}
