import type { ComponentPropsWithoutRef } from "react";

type ButtonVariant = "primary" | "secondary";

interface ButtonProps extends ComponentPropsWithoutRef<"a"> {
  variant?: ButtonVariant;
}

const baseStyles =
  "inline-flex items-center gap-2 rounded-sm px-5 py-2.5 font-mono text-sm uppercase " +
  "tracking-wide transition-colors duration-150";

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-ember text-bone hover:bg-ember-soft",
  secondary: "border border-forge-700 text-bone hover:border-ember hover:text-ember",
};

/**
 * Componente "burro" (dumb component, sem estado ou lógica própria) —
 * só recebe props e renderiza. É o tipo de componente que compõe o
 * design system (pasta components/ui) e é reaproveitado pelas duas
 * personas do site, cada uma passando suas próprias cores via variant.
 */
export function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
  return (
    <a
      className={`${baseStyles} ${variantStyles[variant]} ${className}`.trim()}
      {...props}
    />
  );
}
