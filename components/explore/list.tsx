"use client";
import { Card, CardContent } from "@/components/ui/card";
import { FC } from "react";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation"; // ✅ thêm dòng này

const CategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  icon: z.string(),
  events: z.number(),
  color: z.string(),
});

type Category = z.infer<typeof CategorySchema>;

const categories: Category[] = [
  {
    id: "0196b407-e159-70bc-a2f1-d23d622e631e",
    name: "Artificial Intelligence",
    icon: "🤖",
    events: 1000,
    color: "text-pink-500",
  },
  {
    id: "0196b406-9ab1-77d5-9e65-fb02cfe9dbe5",
    name: "Nghệ thuật & Văn hoá",
    icon: "🎨",
    events: 964,
    color: "text-green-600",
  },
  {
    id: "0196b406-c9e0-792f-823f-f8d454442be6",
    name: "Khí hậu",
    icon: "🌍",
    events: 727,
    color: "text-green-500",
  },
  {
    id: "0196b407-0af6-7bde-9993-6f206c9ce249",
    name: "Thể dục Thể thao",
    icon: "🏃",
    events: 546,
    color: "text-orange-500",
  },
  {
    id: "0196b407-52a6-7aa1-85ed-2412c0b0ffab",
    name: "Sức khoẻ",
    icon: "🌿",
    events: 1000,
    color: "text-teal-500",
  },
  {
    id: "0196b407-8215-794b-b37e-a236f3a65274",
    name: "Tiền mã hoá",
    icon: "₿",
    events: 953,
    color: "text-purple-500",
  },
];

const Categories: FC = () => {
  const router = useRouter(); // ✅ dùng router

  return (
    <div className="max-w-[930px] mx-auto space-y-4">
      <h2 className="text-2xl font-semibold">Duyệt theo danh mục</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {categories.map((category) => (
          <Card
            key={category.id}
            onClick={() => router.push(`/featured-calendar/${category.id}`)} // Use `id`, not `name`
            className="hover:bg-gray-100 transition w-[250px] h-[125px] cursor-pointer"
          >
            <CardContent className="items-center space-x-4">
              <span className={cn("text-2xl", category.color)}>
                {category.icon}
              </span>
              <div className="pt-4">
                <h3 className="text-md font-medium">{category.name}</h3>
                <p className="text-sm text-gray-500">
                  {/* {category.events.toLocaleString()} sự kiện */}
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
