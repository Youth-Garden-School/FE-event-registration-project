import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Define the form types
interface FormProps {
  control: any; // Replace with the correct type if available
}

interface CalendarDetailsProps {
  form: FormProps;
}

export default function CalendarDetails({ form }: CalendarDetailsProps) {
  return (
    <div className="mt-12 bg-background rounded-2xl p-6">
      {/* Name */}
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                {...field}
                placeholder="Tên lịch"
                className="border-0 border-b border-gray-200 rounded-none px-0 text-lg focus-visible:ring-0 focus-visible:border-gray-400"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Description */}
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Textarea
                {...field}
                placeholder="Thêm mô tả ngắn."
                className="mt-4 border-0 resize-none px-0 focus-visible:ring-0 text-gray-500"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
