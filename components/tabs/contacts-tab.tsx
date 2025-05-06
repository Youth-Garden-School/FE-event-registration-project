"use client";

import { useState } from "react";
import { Search, Plus, MoreHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

// Sample contact data
const contactsData = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    tags: ["Designer", "Freelancer"],
  },
  {
    id: 2,
    name: "Trần Thị B",
    email: "tranthib@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    tags: ["Developer"],
  },
  {
    id: 3,
    name: "Lê Văn C",
    email: "levanc@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    tags: ["Marketing"],
  },
  {
    id: 4,
    name: "Phạm Thị D",
    email: "phamthid@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    tags: ["Student"],
  },
];

export function ContactsTab() {
  const [searchQuery, setSearchQuery] = useState("");
  const [contacts] = useState(contactsData);

  // Filter contacts based on search query
  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-medium">Danh bạ</h2>
        <Button className="bg-gray-900 hover:bg-gray-800">
          <Plus className="h-4 w-4 mr-2" />
          Thêm liên hệ
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
        <Input
          placeholder="Tìm kiếm liên hệ"
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        {filteredContacts.length > 0 ? (
          filteredContacts.map((contact) => (
            <div
              key={contact.id}
              className="flex items-center justify-between p-4 bg-white rounded-lg border hover:shadow-sm transition-shadow"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    src={contact.avatar || "/placeholder.svg"}
                    alt={contact.name}
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{contact.name}</h3>
                  <p className="text-sm text-gray-500">{contact.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {contact.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 bg-white rounded-lg border">
            <p className="text-gray-500">Không tìm thấy liên hệ nào</p>
          </div>
        )}
      </div>
    </div>
  );
}
