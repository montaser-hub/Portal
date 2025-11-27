// import * as SeparatorPrimitive from "@radix-ui/react-separator";

// // ---------------- Separator ----------------
// export default function Separator({ className = "", orientation = "horizontal", decorative = true, ...props }) {
//   return (
//     <SeparatorPrimitive.Root
//       data-slot="separator-root"
//       decorative={decorative}
//       orientation={orientation}
//       className={
//         (orientation === "horizontal" ? `bg-[#E5E7EB] shrink-0 h-px w-full` : `bg-[#E5E7EB] shrink-0 h-full w-px`) +
//         className
//       }
//       {...props}
//     />
//   );
// }

// Separator.jsx
import * as SeparatorPrimitive from "@radix-ui/react-separator";

export default function Separator({ className = "", orientation = "horizontal", decorative = true, ...props }) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator-root"
      decorative={decorative}
      orientation={orientation}
      className={
        (orientation === "horizontal" ? `bg-[#E5E7EB] shrink-0 h-px w-full` : `bg-[#E5E7EB] shrink-0 h-full w-px`) +
        className
      }
      {...props}
    />
  );
}
