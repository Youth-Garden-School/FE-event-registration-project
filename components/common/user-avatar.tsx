// Component hiển thị avatar mặc định của người dùng
// Default user avatar component display
export default function UserAvatar() {
  return (
    // Container hình tròn với nền mờ / Circular container with translucent background
    <div
      className={`
      w-8
      h-8
      rounded-full
      bg-white/20
      flex
      items-center
      justify-center
      text-white
    `}
    >
      {/* Chữ cái đầu tiên của "User" / First letter of "User" */}
      <span className="text-sm">U</span>
    </div>
  );
}
