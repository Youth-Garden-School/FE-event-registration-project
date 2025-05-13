import { useState } from "react";
import { Link, User, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormControl } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function EventOptions({ form }) {
  const [capacity, setCapacity] = useState("");
  const [isLimited, setIsLimited] = useState(false);
  const [overloadList, setOverloadList] = useState(false);

  return (
    <div className="space-y-4">
      <h3 className="font-medium">Tùy chọn sự kiện</h3>

      {/* Tickets
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Ticket className="h-5 w-5 text-muted-foreground" />
          <span>Vé</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">Miễn phí</span>
          <Button variant="ghost" size="sm" className="h-8 px-2 cursor-pointer">
            <Link className="h-4 w-4" />
          </Button>
        </div>
      </div> */}

      {/* Approval */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <User className="h-5 w-5 text-muted-foreground" />
          <span>Yêu cầu phê duyệt</span>
        </div>
        <FormField
          control={form.control}
          name="requireApproval"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="cursor-pointer"
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>

      {/* Capacity */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Users className="h-5 w-5 text-muted-foreground" />
          <span>Sức chứa</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">
            {isLimited ? `${capacity} người` : "Không giới hạn"}
          </span>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 cursor-pointer"
              >
                <Link className="h-4 w-4" />
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[400px]">
              <DialogHeader>
                <DialogTitle>Sức chứa tối đa</DialogTitle>
                <DialogDescription>
                  Tự động đóng đăng kí khi đạt đến giới hạn. Chỉ những người
                  được duyệt mới được tính vào giới hạn.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-3 mt-4">
                <div>
                  <label className="block mb-1 font-medium">Sức chứa</label>
                  <Input
                    type="number"
                    placeholder="Nhập số lượng"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                  />
                </div>

                <div className="flex items-center justify-between mt-2">
                  <span>Danh sách chờ quá tải</span>
                  <Switch
                    checked={overloadList}
                    onCheckedChange={setOverloadList}
                    className="cursor-pointer"
                  />
                </div>
              </div>

              <DialogFooter className="mt-4">
                <Button
                  className="cursor-pointer"
                  variant="secondary"
                  onClick={() => setIsLimited(false)}
                >
                  Gỡ giới hạn
                </Button>
                <Button
                  className="cursor-pointer"
                  onClick={() => setIsLimited(true)}
                >
                  Đặt giới hạn
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
