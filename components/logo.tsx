import Image from "next/image"

interface LogoProps {
  className?: string
  size?: number
}

export function Logo({ className = "", size = 32 }: LogoProps) {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <Image
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo_Mark%403x-czqo4PXNUZJICBDMDTfCPYwi4yR1AO.png"
        alt="Worcoor Logo"
        fill
        style={{ objectFit: "contain" }}
        priority
      />
    </div>
  )
}
