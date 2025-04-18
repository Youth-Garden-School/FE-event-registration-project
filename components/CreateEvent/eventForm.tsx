"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { formSchema } from "./formSchema";
import EventFormHeader from "./eventFormHeader";
import EventTimePicker from "./eventTimePicker";
import EventDetails from "./eventDetail";
import EventOptions from "./eventOption";

export default function EventForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      startDate: new Date(new Date().setHours(9, 0, 0, 0)),
      endDate: new Date(new Date().setHours(10, 0, 0, 0)),
      location: "",
      description: "",
      requireApproval: false,
      capacity: "Không giới hạn",
    },
  });

  function onSubmit(values) {
    console.log(values);
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 max-w-5xl mx-auto p-4">
      {/* Left side - Event image */}
      <div className="w-full md:w-2/5 mr-8">
        <div className="overflow-hidden rounded-3xl bg-black w-[400px] h-[400px]">
          <img
            src="https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,background=white,quality=75,width=400,height=400/gallery-images/ry/bd098b7b-aae7-495c-9b4d-2ff4c014a61e"
            alt=""
          />
        </div>
      </div>

      {/* Right side - Event form */}
      <div className="w-full md:w-3/5">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <EventFormHeader />
            <EventTimePicker />
            <EventDetails form={form} />
            <EventOptions form={form} />
            <Button
              type="submit"
              className="w-full bg-amber-700 hover:bg-amber-800 cursor-pointer"
            >
              Tạo sự kiện
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
