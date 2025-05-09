"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowUp,
  Instagram,
  Linkedin,
  X,
  Youtube,
  Globe,
  Check,
} from "lucide-react";
import { ReactNode } from "react";
import { toast } from "react-toastify"; // Thêm thư viện toast

// Component tạo Input Group với Icon
function InputGroupWithIcon({
  icon,
  domain,
  placeholder,
  value,
  onChange,
}: {
  icon: ReactNode;
  domain: string;
  placeholder: string;
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <div className="flex items-center border rounded-md overflow-hidden">
      <div className="bg-gray-100 p-2.5 border-r border-gray-200">{icon}</div>
      {domain && (
        <span className="px-3 py-2 text-sm text-gray-500 bg-gray-200">
          {domain}
        </span>
      )}
      <input
        type="text"
        placeholder={placeholder}
        className="flex-1 px-3 py-2 text-sm outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

// Phần giao diện Profile Section
export function ProfileSection() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [avatarSrc, setAvatarSrc] = useState<string | undefined>(undefined);
  const [socials, setSocials] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);

  // Load dữ liệu từ API khi component mount
  useEffect(() => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    axios
      .get(
        "https://be-event-registration-project-jpv3.onrender.com/api/users/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      ) // Cập nhật URL backend của bạn
      .then((res) => {
        const data = res.data.result;
        setFirstName(data.firstName || "");
        setLastName(data.lastName || "");
        setUsername(data.username || "");
        setBio(data.bio || "");
        setAvatarSrc(data.avatar || "");
        setSocials(data.socials || {});
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
        alert("Không thể tải thông tin người dùng!");
        setIsLoading(false);
      });
  }, []);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setAvatarSrc(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("ACCESS_TOKEN");
      // Hiển thị Toast thông báo đang tải
      toast.loading("Đang cập nhật trang cá nhân của bạn...", {
        toastId: "loading-toast",
        style: { backgroundColor: "#000", fontWeight: "bold" }, // Màu nền khi đang tải là đen
      });

      await axios.put(
        "https://be-event-registration-project-jpv3.onrender.com/api/users",
        {
          firstName,
          lastName,
          username,
          bio,
          avatar: avatarSrc,
          socials,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // Hiển thị Toast thông báo thành công
      toast.update("loading-toast", {
        render: "Đã cập nhật trang cá nhân thành công!",
        type: "success",
        isLoading: false,
        icon: <Check className="h-5 w-5 text-black" />,
        style: { backgroundColor: "#28a745", fontWeight: "bold" }, // Màu nền khi thành công là xanh lá
      });
    } catch (error) {
      console.error("Error saving profile:", error);
      // Hiển thị Toast thông báo lỗi
      toast.update("loading-toast", {
        render: "Không thể lưu thông tin!",
        type: "error",
        isLoading: false,
        icon: <X className="h-5 w-5 text-white" />,
        style: { backgroundColor: "#dc3545" }, // Màu nền khi lỗi là đỏ
      });
    }
  };

  const socialLinks = [
    {
      key: "instagram",
      icon: <Instagram className="h-5 w-5 text-gray-500" />,
      domain: "instagram.com/",
    },
    {
      key: "x",
      icon: <X className="h-5 w-5 text-gray-500" />,
      domain: "x.com/",
    },
    {
      key: "youtube",
      icon: <Youtube className="h-5 w-5 text-gray-500" />,
      domain: "youtube.com/@",
    },
    {
      key: "linkedin",
      icon: <Linkedin className="h-5 w-5 text-gray-500" />,
      domain: "linkedin.com/in/",
    },
    {
      key: "website",
      icon: <Globe className="h-5 w-5 text-gray-500" />,
      domain: "",
    },
    {
      key: "tiktok",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5 text-gray-500"
        >
          <path d="M9 12a3 3 0 1 0 6 0 3 3 0 0 0-6 0v-8a3 3 0 1 0-6 0v1" />
          <path d="M7 16.5a6 6 0 0 0 10 0" />
        </svg>
      ),
      domain: "tiktok.com/@",
    },
  ];

  return (
    <section>
      <h2 className="text-xl font-semibold mb-2">Trang cá nhân của bạn</h2>
      <p className="text-gray-500 mb-6">
        Chọn cách bạn hiển thị là người tổ chức hoặc người tham dự.
      </p>

      {isLoading ? (
        <div className="text-center py-10">Đang tải dữ liệu...</div>
      ) : (
        <>
          <div className="flex flex-col md:flex-row md:items-center gap-6 mb-4">
            <div className="md:w-1/5">
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Họ
              </label>
              <Input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div className="md:w-1/5">
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Tên
              </label>
              <Input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className="md:w-1/5 flex flex-col items-center justify-center">
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Ảnh đại diện
              </label>
              <div className="relative w-20 h-20 rounded-full bg-purple-50 flex items-center justify-center overflow-hidden">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={avatarSrc} alt="Profile" />
                  <AvatarFallback className="bg-purple-50 text-purple-500 text-xl">
                    😊
                  </AvatarFallback>
                </Avatar>
                <div className="absolute bottom-0 right-0 bg-black text-white rounded-full p-1 cursor-pointer">
                  <ArrowUp className="h-4 w-4" />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="mb-6 md:w-1/3">
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Tên người dùng
            </label>
            <div className="flex items-center">
              <div className="bg-gray-100 p-2.5 rounded-l-md border-y border-l border-gray-200">
                <span className="text-gray-500">@</span>
              </div>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="rounded-l-none"
              />
            </div>
          </div>

          <div className="mb-6 md:w-1/3">
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Tiểu sử
            </label>
            <Textarea
              placeholder="Chia sẻ một chút về nền tảng và sở thích của bạn."
              className="min-h-[100px]"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>

          <div className="mb-6 md:w-2/3">
            <h3 className="text-sm font-medium mb-4 text-gray-700">
              Liên kết mạng xã hội
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {socialLinks.map(({ key, icon, domain }) => (
                <InputGroupWithIcon
                  key={key}
                  icon={icon}
                  domain={domain}
                  placeholder="tên người dùng"
                  value={socials[key] || ""}
                  onChange={(val) =>
                    setSocials((prev) => ({ ...prev, [key]: val }))
                  }
                />
              ))}
            </div>
          </div>

          <div className="mt-8">
            <Button
              variant="outline"
              className="bg-gray-800 text-white hover:bg-gray-700 px-6 rounded-full flex items-center gap-2"
              onClick={handleSave}
            >
              <Check className="h-4 w-4" />
              <span>Lưu thay đổi</span>
            </Button>
          </div>
        </>
      )}
    </section>
  );
}
