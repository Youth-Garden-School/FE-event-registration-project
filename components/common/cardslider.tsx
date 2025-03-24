"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
}

interface CardSliderProps {
  cards: CardProps[];
}

const CardSlider: React.FC<CardSliderProps> = ({ cards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else {
      router.push("create-calendar");
    }
  };

  return (
    <div className="w-full max-w-5xl">
      <div className="bg-white p-4 rounded-lg shadow-md flex flex-row items-center space-x-6 relative w-full min-h-[160px]">
        <img
          src={cards[currentIndex].imageUrl}
          alt="Card image"
          className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
        />

        <div className="flex flex-col w-full">
          <h2 className="text-lg font-semibold">{cards[currentIndex].title}</h2>
          <p className="text-gray-600 line-clamp-2">
            {cards[currentIndex].description}
          </p>

          <div className="mt-auto flex items-center justify-between w-full">
            <div className="flex space-x-2">
              {cards.map((_, index) => (
                <div
                  key={index}
                  className={`h-[3px] w-[24px] transition-all duration-300 ${
                    index <= currentIndex ? "bg-black" : "bg-gray-300"
                  }`}
                ></div>
              ))}
            </div>

            <Button onClick={handleNext} className="px-5 py-1 text-sm">
              {currentIndex === cards.length - 1 ? "Tạo lịch" : "Tiếp theo"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardSlider;
