"use client";

import { useState } from "react";
import { Search, Download, CreditCard, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample payment data
const paymentsData = [
  {
    id: 1,
    description: "Thanh toán cho sự kiện Badminton Tournament",
    amount: 200000,
    date: "15/04/2025",
    status: "completed",
    method: "Visa ****4242",
  },
  {
    id: 2,
    description: "Thanh toán cho Workshop Hệ thống Thiết kế",
    amount: 500000,
    date: "10/04/2025",
    status: "completed",
    method: "MasterCard ****5678",
  },
  {
    id: 3,
    description: "Đặt cọc cho sự kiện Community Meetup",
    amount: 100000,
    date: "05/04/2025",
    status: "pending",
    method: "Chuyển khoản ngân hàng",
  },
];

export function PaymentsTab() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [payments] = useState(paymentsData);

  // Filter payments based on search query and active tab
  const filteredPayments = payments.filter(
    (payment) =>
      payment.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.method.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-medium">Thanh toán</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <Download className="h-5 w-5" />
          </Button>
          <Button className="bg-gray-900 hover:bg-gray-800">
            <Plus className="h-4 w-4 mr-2" />
            Thêm phương thức
          </Button>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
        <Input
          placeholder="Tìm kiếm giao dịch"
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-gray-100 rounded-[8px] text-gray-900 leading-[24px] p-[2px] w-full">
          <TabsTrigger
            value="all"
            className="flex-1 flex items-center justify-center border-[0.8px] border-solid border-[#0000] text-gray-900 text-[14px] font-medium leading-[21px] p-[5px_8px] text-center data-[state=active]:bg-white data-[state=active]:rounded-md"
          >
            Tất cả
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            className="flex-1 flex items-center justify-center border-[0.8px] border-solid border-[#0000] text-gray-900 text-[14px] font-medium leading-[21px] p-[5px_8px] text-center data-[state=active]:bg-white data-[state=active]:rounded-md"
          >
            Hoàn thành
          </TabsTrigger>
          <TabsTrigger
            value="pending"
            className="flex-1 flex items-center justify-center border-[0.8px] border-solid border-[#0000] text-gray-900 text-[14px] font-medium leading-[21px] p-[5px_8px] text-center data-[state=active]:bg-white data-[state=active]:rounded-md"
          >
            Đang xử lý
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="space-y-2">
        {filteredPayments.length > 0 ? (
          filteredPayments
            .filter(
              (payment) => activeTab === "all" || activeTab === payment.status,
            )
            .map((payment) => (
              <div
                key={payment.id}
                className="p-4 bg-white rounded-lg border hover:shadow-sm transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{payment.description}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <CreditCard className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {payment.method}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{payment.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      {formatCurrency(payment.amount)}
                    </p>
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-xs mt-1 ${
                        payment.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {payment.status === "completed"
                        ? "Hoàn thành"
                        : "Đang xử lý"}
                    </span>
                  </div>
                </div>
              </div>
            ))
        ) : (
          <div className="text-center py-8 bg-white rounded-lg border">
            <p className="text-gray-500">Không tìm thấy giao dịch nào</p>
          </div>
        )}
      </div>

      <div className="p-4 bg-gray-50 rounded-lg border">
        <h3 className="font-medium mb-2">Phương thức thanh toán</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 bg-white rounded-md border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-6 bg-blue-600 rounded"></div>
              <span>Visa ****4242</span>
            </div>
            <span className="text-sm text-gray-500">Hết hạn 04/26</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-white rounded-md border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-6 bg-red-500 rounded"></div>
              <span>MasterCard ****5678</span>
            </div>
            <span className="text-sm text-gray-500">Hết hạn 07/25</span>
          </div>
        </div>
      </div>
    </div>
  );
}
