import { Card, CardContent } from "@/components/ui/card";
import { FC } from "react";
import { z } from "zod";
import { cn } from "@/lib/utils";

// Schema kiểm tra dữ liệu danh mục
const CategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  icon: z.string(),
  events: z.number(),
  color: z.string(),
});

type Category = z.infer<typeof CategorySchema>;

const categories: Category[] = [
  { id: "ai", name: "AI", icon: "🤖", events: 1000, color: "text-pink-500" },
  {
    id: "art",
    name: "Nghệ thuật & Văn hoá",
    icon: "🎨",
    events: 964,
    color: "text-green-600",
  },
  {
    id: "climate",
    name: "Khí hậu",
    icon: "🌍",
    events: 727,
    color: "text-green-500",
  },
  {
    id: "sports",
    name: "Thể dục thể thao",
    icon: "🏃",
    events: 546,
    color: "text-orange-500",
  },
  {
    id: "health",
    name: "Sức khoẻ",
    icon: "🌿",
    events: 1000,
    color: "text-teal-500",
  },
  {
    id: "crypto",
    name: "Tiền mã hoá",
    icon: "₿",
    events: 953,
    color: "text-purple-500",
  },
];

const Categories: FC = () => {
  return (
    <div className="max-w-[930px] mx-auto space-y-4">
      <h2 className="text-2xl font-semibold">Duyệt theo danh mục</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {categories.map((category) => (
          <Card
            key={category.id}
            className="hover:bg-gray-100 transition w-[250px] h-[125px] cursor-pointer"
          >
            <CardContent className="items-center space-x-4">
              <span className={cn("text-2xl", category.color)}>
                {category.icon}
              </span>
              <div className="pt-4">
                <h3 className="text-md font-medium">{category.name}</h3>
                <p className="text-sm text-gray-500">
                  {category.events.toLocaleString()} sự kiện
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Categories;
