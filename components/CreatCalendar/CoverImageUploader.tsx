import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

export default function CoverImageUploader({
  coverImage,
  setCoverImage,
  profileImage,
  setProfileImage,
}: any) {
  const handleImageUpload = (setImage: any) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImage(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  return (
    <div className="relative w-full h-64 bg-background rounded-lg overflow-hidden">
      {coverImage ? (
        <img
          src={coverImage}
          alt="Cover"
          className="w-full h-full object-cover"
        />
      ) : null}
      <Button
        variant="secondary"
        className="absolute top-4 right-4 cursor-pointer"
        type="button"
        onClick={() => handleImageUpload(setCoverImage)}
      >
        Thay đổi ảnh bìa
      </Button>

      {/* Profile Image */}
      <div className="absolute bottom-2 left-8 cursor-pointer">
        <div className="relative w-20 h-20 bg-gradient-to-br from-pink-300 to-blue-300 rounded-lg overflow-hidden">
          {profileImage ? (
            <img
              src={profileImage}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : null}
          <Button
            variant="ghost"
            size="icon"
            className="absolute inset-0 w-full h-full"
            type="button"
            onClick={() => handleImageUpload(setProfileImage)}
          >
            <Upload className="text-white opacity-70" />
          </Button>
        </div>
      </div>
    </div>
  );
}
