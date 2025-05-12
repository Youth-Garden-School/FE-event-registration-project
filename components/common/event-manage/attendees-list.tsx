"use client";

import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Registration } from "@/lib/api-event";

interface PaginationProps {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalElements: number;
}

interface AttendeesListProps {
  registrations: Registration[];
  pagination: PaginationProps;
  onPageChange: (page: number) => Promise<void>;
}

export function AttendeesList({
  registrations,
  pagination,
  onPageChange,
}: AttendeesListProps) {
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Display name or email for attendee
  const getUserDisplayName = (user: Registration["user"]) => {
    if (user.firstName && user.lastName) {
      return `${user.firstName} ${user.lastName}`;
    } else if (user.firstName) {
      return user.firstName;
    } else if (user.lastName) {
      return user.lastName;
    } else if (user.username) {
      return user.username;
    } else {
      return user.email.split("@")[0];
    }
  };

  // Get user initials for avatar
  const getUserInitials = (user: Registration["user"]) => {
    if (user.firstName && user.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    } else if (user.firstName) {
      return user.firstName[0].toUpperCase();
    } else if (user.lastName) {
      return user.lastName[0].toUpperCase();
    } else if (user.username) {
      return user.username[0].toUpperCase();
    } else {
      return user.email[0].toUpperCase();
    }
  };

  // Lọc registrations theo trạng thái
  const filteredRegistrations =
    statusFilter === "all"
      ? registrations
      : registrations.filter((reg) => reg.status === statusFilter);

  return (
    <div className="space-y-4">
      <div className="flex justify-end items-center">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Lọc theo trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="CONFIRMED">Đã đăng ký</SelectItem>
              <SelectItem value="CANCELLED">Đã hủy</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Người tham dự
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Trạng thái
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Thời gian đăng ký
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredRegistrations.length > 0 ? (
              filteredRegistrations.map((registration) => (
                <tr key={registration.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                        {registration.user.avatarUrl ? (
                          <Image
                            src={
                              registration.user.avatarUrl || "/placeholder.svg"
                            }
                            alt={getUserDisplayName(registration.user)}
                            width={40}
                            height={40}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <span className="text-gray-600">
                            {getUserInitials(registration.user)}
                          </span>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {getUserDisplayName(registration.user)}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {registration.user.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge
                      className={
                        registration.status === "CONFIRMED"
                          ? "bg-green-100 text-green-800"
                          : registration.status === "CANCELLED"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                      }
                    >
                      {registration.status === "CONFIRMED"
                        ? "Đã đăng ký"
                        : registration.status === "CANCELLED"
                          ? "Đã hủy"
                          : "Đang chờ"}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(registration.registeredAt).toLocaleString(
                      "vi-VN",
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                  Không có người tham dự nào
                  {statusFilter !== "all" ? " với trạng thái đã chọn" : ""}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-500">
            Hiển thị {pagination.pageNumber * pagination.pageSize + 1} đến{" "}
            {Math.min(
              (pagination.pageNumber + 1) * pagination.pageSize,
              pagination.totalElements,
            )}{" "}
            trong {pagination.totalElements} kết quả
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(pagination.pageNumber - 1)}
              disabled={pagination.pageNumber === 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(pagination.pageNumber + 1)}
              disabled={pagination.pageNumber === pagination.totalPages - 1}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
