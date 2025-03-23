export const theme = {
  colors: {
    primary: {
      background: "bg-[#1c1e20]",
      hover: "hover:bg-[#252729]",
      text: "text-white",
      border: "border-white/10",
      borderHover: "hover:border-white/50",
    },
    secondary: {
      background: "bg-[#252729]",
      hover: "hover:bg-white",
      text: "text-gray-400",
      textHover: "hover:text-black",
    },
    accent: {
      success: "bg-green-600",
      successHover: "hover:bg-green-700",
      warning: "text-[#f0b429]",
      blue: "bg-blue-500",
      yellow: "bg-yellow-400",
    },
  },
  components: {
    card: {
      wrapper: "rounded-xl overflow-hidden transition-all duration-200",
      image: "w-32 h-32 relative rounded-lg overflow-hidden",
      content: "p-3 flex-1",
    },
    text: {
      primary: "text-white",
      secondary: "text-gray-400",
      heading: "text-xl font-bold",
      subheading: "text-lg font-medium",
      small: "text-sm",
    },
  },
  spacing: {
    container: "max-w-[1050px] mx-auto px-4",
    section: "py-8",
    gap: {
      small: "gap-2",
      medium: "gap-4",
      large: "gap-8",
    },
  },
} as const;
