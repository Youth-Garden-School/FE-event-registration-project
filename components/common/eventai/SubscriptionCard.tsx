// components/SubscriptionCard.tsx

import Image from "next/image";
import { Button } from "@/components/ui/button";

const SubscriptionCard = () => {
  return (
    <div className="w-full md:w-1/3 bg-card rounded-lg p-6 h-fit">
      <div className="flex items-start mb-4">
        <div className="bg-pink-100 p-2 rounded-full">
          <Image
            src="https://ext.same-assets.com/2185237885/3671249817.png"
            alt="AI Icon"
            width={28}
            height={28}
            unoptimized
          />
        </div>
      </div>

      <h3 className="text-lg font-bold mt-3 mb-1">AI</h3>
      <p className="fs-sm text-secondary-alpha mb-4">
        Theo dõi để cập nhật những sự kiện mới nhất, lịch và các thông tin khác.
      </p>

      <div className="space-y-3">
        <Button className="w-full">Subscribe</Button>
      </div>
    </div>
  );
};

export default SubscriptionCard;
