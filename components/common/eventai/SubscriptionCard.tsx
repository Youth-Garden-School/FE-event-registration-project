// components/SubscriptionCard.tsx

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
        Subscribe to stay up-to-date with the latest events, calendars and other
        updates.
      </p>

      <div className="space-y-3">
        <Input type="email" placeholder="me@email.com" className="bg-white" />
        <Button className="w-full">Subscribe</Button>
      </div>
    </div>
  );
};

export default SubscriptionCard;
