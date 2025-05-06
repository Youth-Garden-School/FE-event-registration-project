"use client";

import { useState } from "react";
import { Save, Edit2, Globe, MapPin, Calendar, Users, Tag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import Image from "next/image";

export function DetailsTab() {
  const [isEditing, setIsEditing] = useState(false);
  const [communityData, setCommunityData] = useState({
    name: "Design Buddies",
    description:
      "Events for designers and all creatives across SF, online, and the world! Hosted curated by Design Buddies, the world's largest design community.",
    website: "https://designbuddies.community",
    location: "San Francisco, CA",
    foundedDate: "2020",
    members: 15000,
    isPublic: true,
    tags: ["Design", "UX/UI", "Creative", "Community"],
    logo: "/placeholder.svg?height=100&width=100",
    banner: "/placeholder.svg?height=300&width=800",
  });

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save the data to your backend
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-medium">Thông tin chi tiết</h2>
        {isEditing ? (
          <Button
            onClick={handleSave}
            className="bg-gray-900 hover:bg-gray-800"
          >
            <Save className="h-4 w-4 mr-2" />
            Lưu thay đổi
          </Button>
        ) : (
          <Button onClick={() => setIsEditing(true)} variant="outline">
            <Edit2 className="h-4 w-4 mr-2" />
            Chỉnh sửa
          </Button>
        )}
      </div>

      <div className="relative">
        <div className="h-48 rounded-lg overflow-hidden">
          <Image
            src={communityData.banner || "/placeholder.svg"}
            alt="Banner"
            width={800}
            height={300}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute -bottom-10 left-6 w-20 h-20 rounded-lg bg-white p-1 shadow-md">
          <Image
            src={communityData.logo || "/placeholder.svg"}
            alt="Logo"
            width={100}
            height={100}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>

      <div className="pt-12 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Tên cộng đồng</Label>
          <Input
            id="name"
            value={communityData.name}
            onChange={(e) =>
              setCommunityData({ ...communityData, name: e.target.value })
            }
            disabled={!isEditing}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Mô tả</Label>
          <Textarea
            id="description"
            value={communityData.description}
            onChange={(e) =>
              setCommunityData({
                ...communityData,
                description: e.target.value,
              })
            }
            disabled={!isEditing}
            rows={4}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <div className="relative">
              <Globe className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <Input
                id="website"
                value={communityData.website}
                onChange={(e) =>
                  setCommunityData({
                    ...communityData,
                    website: e.target.value,
                  })
                }
                disabled={!isEditing}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Địa điểm</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <Input
                id="location"
                value={communityData.location}
                onChange={(e) =>
                  setCommunityData({
                    ...communityData,
                    location: e.target.value,
                  })
                }
                disabled={!isEditing}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="foundedDate">Ngày thành lập</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <Input
                id="foundedDate"
                value={communityData.foundedDate}
                onChange={(e) =>
                  setCommunityData({
                    ...communityData,
                    foundedDate: e.target.value,
                  })
                }
                disabled={!isEditing}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="members">Số lượng thành viên</Label>
            <div className="relative">
              <Users className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <Input
                id="members"
                type="number"
                value={communityData.members}
                onChange={(e) =>
                  setCommunityData({
                    ...communityData,
                    members: Number.parseInt(e.target.value) || 0,
                  })
                }
                disabled={!isEditing}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="isPublic">Cộng đồng công khai</Label>
            <Switch
              id="isPublic"
              checked={communityData.isPublic}
              onCheckedChange={(checked) =>
                setCommunityData({ ...communityData, isPublic: checked })
              }
              disabled={!isEditing}
            />
          </div>
          <p className="text-sm text-gray-500">
            Khi bật, cộng đồng của bạn sẽ hiển thị trong danh sách cộng đồng
            công khai và có thể được tìm thấy bởi mọi người.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="tags">Thẻ</Label>
          <div className="flex flex-wrap gap-2">
            {communityData.tags.map((tag, index) => (
              <div
                key={index}
                className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-sm"
              >
                <Tag className="h-3 w-3" />
                <span>{tag}</span>
                {isEditing && (
                  <button
                    className="ml-1 text-gray-500 hover:text-gray-700"
                    onClick={() =>
                      setCommunityData({
                        ...communityData,
                        tags: communityData.tags.filter((_, i) => i !== index),
                      })
                    }
                  >
                    &times;
                  </button>
                )}
              </div>
            ))}
            {isEditing && (
              <Button
                variant="outline"
                size="sm"
                className="rounded-full"
                onClick={() => {
                  const newTag = prompt("Nhập thẻ mới:");
                  if (newTag) {
                    setCommunityData({
                      ...communityData,
                      tags: [...communityData.tags, newTag],
                    });
                  }
                }}
              >
                + Thêm thẻ
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
