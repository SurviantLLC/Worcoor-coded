import { Logo } from "./logo"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface PageTitleProps {
  title: string
  description?: string
  className?: string
}

// List of paths where the logo should be displayed (should match the one in Logo component)
const PATHS_WITH_LOGO = [
  "/dashboard",
  "/dashboard/admin",
  "/dashboard/product-manager",
  "/dashboard/task-manager",
  "/dashboard/inventory",
  "/dashboard/audit",
  "/dashboard/asset-management/assets"
]

export function PageTitle({ title, description, className = "" }: PageTitleProps) {
  const pathname = usePathname()
  const shouldShowLogo = PATHS_WITH_LOGO.includes(pathname)
  
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className="flex items-center gap-3">
        {shouldShowLogo && <Logo size={36} alwaysShow={true} />}
        {shouldShowLogo ? (
          <h1 
            className="text-3xl font-bold gradient-text"
            style={{ 
              background: 'linear-gradient(90deg, #0066FF 0%, #00C2FF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent'
            }}
          >
            {title.replace(/\s*panel\s*/i, "")}
          </h1>
        ) : (
          <h1 className="text-3xl font-bold">
            {title.replace(/\s*panel\s*/i, "")}
          </h1>
        )}
      </div>
      {description && <p className="text-muted-foreground">{description}</p>}
    </div>
  )
}
