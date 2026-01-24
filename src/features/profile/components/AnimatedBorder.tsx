/**
 * AnimatedBorder component
 * Provides gradient border animation effect on hover
 */

interface AnimatedBorderProps {
  gradient: string
}

export function AnimatedBorder({ gradient }: AnimatedBorderProps) {
  return (
    <>
      {/* Gradient overlay on hover */}
      <div
        className={`absolute inset-0 bg-linear-to-br ${gradient} opacity-0
         group-hover:opacity-20 transition-opacity duration-500`}
      />

      {/* Animated gradient border */}
      <div
        className={`absolute inset-0 rounded-xl border-2 border-transparent bg-linear-to-br ${gradient} bg-clip-border opacity-20 group-hover:opacity-40 transition-opacity`}
        style={{
          WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />
    </>
  )
}

