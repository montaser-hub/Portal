import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { COLORS } from "../../common/colors";

// ---------------- Separator ----------------
export default function Separator({ className = "", orientation = "horizontal", decorative = true, ...props }) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator-root"
      decorative={decorative}
      orientation={orientation}
      className={
        (orientation === "horizontal" ? `bg-border shrink-0 h-px w-full ${COLORS.grayBorder}` : `bg-border shrink-0 h-full w-px ${COLORS.grayBorder}`) +
        className
      }
      {...props}
    />
  );
}
