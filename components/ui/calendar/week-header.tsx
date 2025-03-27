export function WeekHeader() {
  const weekDays = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

  return (
    <div className="grid grid-cols-7 mb-1">
      {weekDays.map((day, index) => (
        <div
          key={index}
          className="text-center text-xs font-medium text-gray-500 py-1"
        >
          {day}
        </div>
      ))}
    </div>
  );
}
