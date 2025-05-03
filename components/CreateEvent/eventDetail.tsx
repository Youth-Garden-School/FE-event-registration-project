import { Edit, MapPin, Clipboard } from "lucide-react";
import { FormField, FormItem, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function EventDetails({ form }) {
  return (
    <>
      {/* Location */}
      <div className="flex items-start gap-4 bg-muted/30 rounded-lg p-4">
        <MapPin className="h-5 w-5 mt-0.5 text-muted-foreground" />
        <div className="flex-1">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Thêm địa điểm sự kiện"
                    className="border-none bg-transparent px-0 focus-visible:ring-0"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <p className="text-sm text-muted-foreground">
            Địa điểm trực tiếp hoặc liên kết ảo
          </p>
        </div>
      </div>

      {/* Description */}
      <div className="flex items-start gap-4 bg-muted/30 rounded-lg p-4">
        <Edit className="h-5 w-5 mt-0.5 text-muted-foreground" />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Textarea
                  placeholder="Thêm mô tả"
                  className="min-h-0 border-none bg-transparent resize-none px-0 focus-visible:ring-0"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>

      {/* Description */}
      <div className="flex items-start gap-4 bg-muted/30 rounded-lg p-4">
        <Clipboard className="h-5 w-5 mt-0.5 text-muted-foreground" />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Textarea
                  placeholder="Loại sự kiện"
                  className="min-h-0 border-none bg-transparent resize-none px-0 focus-visible:ring-0"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </>
  );
}
