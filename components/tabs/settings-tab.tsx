"use client";

import { useState } from "react";
import {
  Save,
  Bell,
  Globe,
  Lock,
  Mail,
  User,
  Moon,
  Sun,
  Clock,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function SettingsTab() {
  const [activeTab, setActiveTab] = useState("account");
  const [settings, setSettings] = useState({
    account: {
      name: "Design Buddies",
      email: "contact@designbuddies.community",
      language: "Tiếng Việt",
      timezone: "GMT+7 (Hồ Chí Minh)",
    },
    notifications: {
      emailNotifications: true,
      eventReminders: true,
      messageNotifications: true,
      marketingEmails: false,
    },
    privacy: {
      profileVisibility: "public",
      showEmail: false,
      allowTagging: true,
      allowMessaging: true,
    },
    appearance: {
      theme: "light",
      compactMode: false,
      highContrast: false,
    },
  });

  const handleSave = () => {
    // Here you would typically save the settings to your backend
    alert("Cài đặt đã được lưu!");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-medium">Cài đặt</h2>
        <Button onClick={handleSave} className="bg-gray-900 hover:bg-gray-800">
          <Save className="h-4 w-4 mr-2" />
          Lưu thay đổi
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-gray-100 rounded-[8px] text-gray-900 leading-[24px] p-[2px] w-full">
          <TabsTrigger
            value="account"
            className="flex-1 flex items-center justify-center border-[0.8px] border-solid border-[#0000] text-gray-900 text-[14px] font-medium leading-[21px] p-[5px_8px] text-center data-[state=active]:bg-white data-[state=active]:rounded-md"
          >
            <User className="h-4 w-4 mr-2" />
            Tài khoản
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="flex-1 flex items-center justify-center border-[0.8px] border-solid border-[#0000] text-gray-900 text-[14px] font-medium leading-[21px] p-[5px_8px] text-center data-[state=active]:bg-white data-[state=active]:rounded-md"
          >
            <Bell className="h-4 w-4 mr-2" />
            Thông báo
          </TabsTrigger>
          <TabsTrigger
            value="privacy"
            className="flex-1 flex items-center justify-center border-[0.8px] border-solid border-[#0000] text-gray-900 text-[14px] font-medium leading-[21px] p-[5px_8px] text-center data-[state=active]:bg-white data-[state=active]:rounded-md"
          >
            <Lock className="h-4 w-4 mr-2" />
            Quyền riêng tư
          </TabsTrigger>
          <TabsTrigger
            value="appearance"
            className="flex-1 flex items-center justify-center border-[0.8px] border-solid border-[#0000] text-gray-900 text-[14px] font-medium leading-[21px] p-[5px_8px] text-center data-[state=active]:bg-white data-[state=active]:rounded-md"
          >
            <Sun className="h-4 w-4 mr-2" />
            Giao diện
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="p-4 bg-white rounded-lg border">
        {activeTab === "account" && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Tên</Label>
              <Input
                id="name"
                value={settings.account.name}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    account: { ...settings.account, name: e.target.value },
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input
                  id="email"
                  type="email"
                  value={settings.account.email}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      account: { ...settings.account, email: e.target.value },
                    })
                  }
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="language">Ngôn ngữ</Label>
              <div className="relative">
                <Globe className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <select
                  id="language"
                  value={settings.account.language}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      account: {
                        ...settings.account,
                        language: e.target.value,
                      },
                    })
                  }
                  className="w-full h-10 pl-10 pr-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Tiếng Việt">Tiếng Việt</option>
                  <option value="English">English</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone">Múi giờ</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <select
                  id="timezone"
                  value={settings.account.timezone}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      account: {
                        ...settings.account,
                        timezone: e.target.value,
                      },
                    })
                  }
                  className="w-full h-10 pl-10 pr-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="GMT+7 (Hồ Chí Minh)">
                    GMT+7 (Hồ Chí Minh)
                  </option>
                  <option value="GMT+8 (Singapore)">GMT+8 (Singapore)</option>
                  <option value="GMT+9 (Tokyo)">GMT+9 (Tokyo)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {activeTab === "notifications" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Thông báo qua email</h3>
                <p className="text-sm text-gray-500">
                  Nhận thông báo qua email
                </p>
              </div>
              <Switch
                checked={settings.notifications.emailNotifications}
                onCheckedChange={(checked) =>
                  setSettings({
                    ...settings,
                    notifications: {
                      ...settings.notifications,
                      emailNotifications: checked,
                    },
                  })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Nhắc nhở sự kiện</h3>
                <p className="text-sm text-gray-500">
                  Nhận nhắc nhở trước khi sự kiện diễn ra
                </p>
              </div>
              <Switch
                checked={settings.notifications.eventReminders}
                onCheckedChange={(checked) =>
                  setSettings({
                    ...settings,
                    notifications: {
                      ...settings.notifications,
                      eventReminders: checked,
                    },
                  })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Thông báo tin nhắn</h3>
                <p className="text-sm text-gray-500">
                  Nhận thông báo khi có tin nhắn mới
                </p>
              </div>
              <Switch
                checked={settings.notifications.messageNotifications}
                onCheckedChange={(checked) =>
                  setSettings({
                    ...settings,
                    notifications: {
                      ...settings.notifications,
                      messageNotifications: checked,
                    },
                  })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Email tiếp thị</h3>
                <p className="text-sm text-gray-500">
                  Nhận email về các sự kiện và ưu đãi mới
                </p>
              </div>
              <Switch
                checked={settings.notifications.marketingEmails}
                onCheckedChange={(checked) =>
                  setSettings({
                    ...settings,
                    notifications: {
                      ...settings.notifications,
                      marketingEmails: checked,
                    },
                  })
                }
              />
            </div>
          </div>
        )}

        {activeTab === "privacy" && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="profileVisibility">Hiển thị hồ sơ</Label>
              <select
                id="profileVisibility"
                value={settings.privacy.profileVisibility}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    privacy: {
                      ...settings.privacy,
                      profileVisibility: e.target.value,
                    },
                  })
                }
                className="w-full h-10 px-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="public">Công khai</option>
                <option value="friends">Chỉ bạn bè</option>
                <option value="private">Riêng tư</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Hiển thị email</h3>
                <p className="text-sm text-gray-500">
                  Cho phép người khác xem email của bạn
                </p>
              </div>
              <Switch
                checked={settings.privacy.showEmail}
                onCheckedChange={(checked) =>
                  setSettings({
                    ...settings,
                    privacy: { ...settings.privacy, showEmail: checked },
                  })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Cho phép gắn thẻ</h3>
                <p className="text-sm text-gray-500">
                  Cho phép người khác gắn thẻ bạn trong bài viết
                </p>
              </div>
              <Switch
                checked={settings.privacy.allowTagging}
                onCheckedChange={(checked) =>
                  setSettings({
                    ...settings,
                    privacy: { ...settings.privacy, allowTagging: checked },
                  })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Cho phép nhắn tin</h3>
                <p className="text-sm text-gray-500">
                  Cho phép người khác gửi tin nhắn cho bạn
                </p>
              </div>
              <Switch
                checked={settings.privacy.allowMessaging}
                onCheckedChange={(checked) =>
                  setSettings({
                    ...settings,
                    privacy: { ...settings.privacy, allowMessaging: checked },
                  })
                }
              />
            </div>
          </div>
        )}

        {activeTab === "appearance" && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="theme">Chủ đề</Label>
              <div className="flex gap-2">
                <button
                  className={`flex-1 p-4 border rounded-md flex flex-col items-center gap-2 ${
                    settings.appearance.theme === "light"
                      ? "border-blue-500 bg-blue-50"
                      : ""
                  }`}
                  onClick={() =>
                    setSettings({
                      ...settings,
                      appearance: { ...settings.appearance, theme: "light" },
                    })
                  }
                >
                  <Sun className="h-6 w-6" />
                  <span>Sáng</span>
                </button>
                <button
                  className={`flex-1 p-4 border rounded-md flex flex-col items-center gap-2 ${
                    settings.appearance.theme === "dark"
                      ? "border-blue-500 bg-blue-50"
                      : ""
                  }`}
                  onClick={() =>
                    setSettings({
                      ...settings,
                      appearance: { ...settings.appearance, theme: "dark" },
                    })
                  }
                >
                  <Moon className="h-6 w-6" />
                  <span>Tối</span>
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Chế độ thu gọn</h3>
                <p className="text-sm text-gray-500">
                  Hiển thị giao diện thu gọn
                </p>
              </div>
              <Switch
                checked={settings.appearance.compactMode}
                onCheckedChange={(checked) =>
                  setSettings({
                    ...settings,
                    appearance: {
                      ...settings.appearance,
                      compactMode: checked,
                    },
                  })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Độ tương phản cao</h3>
                <p className="text-sm text-gray-500">
                  Tăng độ tương phản cho người dùng khiếm thị
                </p>
              </div>
              <Switch
                checked={settings.appearance.highContrast}
                onCheckedChange={(checked) =>
                  setSettings({
                    ...settings,
                    appearance: {
                      ...settings.appearance,
                      highContrast: checked,
                    },
                  })
                }
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
