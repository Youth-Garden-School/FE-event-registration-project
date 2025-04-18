"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { formSchema } from "./FormSchema";
import CoverImageUploader from "./CoverImageUploader";
import CalendarDetails from "./CalendarDetails";
import CalendarCustomization from "./CalendarCustomization";
import { Check } from "lucide-react";

export default function CreateCalendar() {
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState("#3b82f6");

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      color: "#3b82f6",
      publicUrl: "",
      location: "",
    },
  });

  const onSubmit = (data) => {
    console.log({ ...data, coverImage, profileImage });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 m-10 bg-gray-200 rounded-lg">
      <h1 className="text-3xl font-bold mb-6">Tạo lịch</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CoverImageUploader
            coverImage={coverImage}
            setCoverImage={setCoverImage}
            profileImage={profileImage}
            setProfileImage={setProfileImage}
          />
          <CalendarDetails form={form} />
          <CalendarCustomization
            form={form}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
          />
          <Button
            type="submit"
            className="bg-gray-800 hover:bg-gray-700 cursor-pointer"
          >
            <Check className="mr-2 h-4 w-4" /> Tạo lịch
          </Button>
        </form>
      </Form>
    </div>
  );
}
