import { Button } from "@/components/ui/button"
import { Instagram, Twitter } from "lucide-react"

export function CommunityInfo() {
  return (
    <div className="flex flex-col pt-4">
      <div className="flex items-start">
        {/* Logo */}
        <div className="flex-shrink-0 mr-4">
          <div className="w-[80px] h-[80px] bg-black rounded-lg flex items-center justify-center overflow-hidden">
            <div className="text-white text-xs text-center" style={{ fontFamily: "cursive" }}>
              <div>READING</div>
              <div className="mt-1">RHYTHMS</div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex flex-col">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-[#00113a] mb-1">Reading Rhythms Global</h1>

                <p className="text-gray-700 text-sm mb-4">
                  Not a book club. A reading party. Read with friends to live music & curated playlists!
                </p>

                {/* Social media icons */}
                <div className="flex space-x-4 mt-2">
                  <Instagram className="w-5 h-5 text-gray-500" />
                  <Twitter className="w-5 h-5 text-gray-500" />
                  <svg
                    className="w-5 h-5 text-gray-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2 12H22"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              {/* Subscribe button */}
              <Button className="bg-[#ff3366] hover:bg-[#e62e5c] rounded-md">Theo dõi</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
