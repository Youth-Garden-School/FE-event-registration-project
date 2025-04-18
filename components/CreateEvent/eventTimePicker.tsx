import { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, addHours } from "date-fns";
import TimePicker from "./timePicker";

export default function EventTimePicker() {
  const [startDate1, setStartDate1] = useState(new Date());
  const [endDate1, setEndDate1] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [showPicker1, setShowPicker1] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(addHours(new Date(), 1));
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const pickerRef = useRef(null);
  const pickerRef1 = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setShowPicker(false);
      }
      if (pickerRef1.current && !pickerRef1.current.contains(event.target)) {
        setShowPicker1(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="space-y-3 bg-muted/30 rounded-lg p-4">
      {/* Chọn ngày bắt đầu */}
      <div className="flex items-start gap-4">
        <div className="mt-1">
          <div className="w-4 h-4 rounded-full bg-slate-300 border-2 border-white"></div>
        </div>
        <div className="flex-1">
          <label>Bắt đầu</label>
          <div className="grid grid-cols-2 gap-2 mt-1">
            <div
              className="bg-white hover:bg-gray-300 rounded-md px-3 py-2 cursor-pointer"
              onClick={() => setShowPicker(!showPicker)}
            >
              {format(startDate1, "dd/MM/yyyy")}
            </div>
            {showPicker && (
              <div
                ref={pickerRef}
                className="absolute bg-white shadow-md p-2 mt-2 rounded-md"
              >
                <DatePicker
                  selected={startDate1}
                  onChange={(date) => {
                    setStartDate1(date);
                    setShowPicker(false);
                    if (endDate1 < date) {
                      setEndDate1(date);
                    }
                  }}
                  minDate={new Date()}
                  inline
                />
              </div>
            )}
            <div>
              <div
                className="bg-white rounded-md px-3 py-2 hover:bg-gray-300 cursor-pointer"
                onClick={() => setShowStartPicker(!showStartPicker)}
              >
                {format(startDate, "HH:mm")}
              </div>
              {showStartPicker && (
                <TimePicker
                  startTime={null}
                  selectedTime={startDate}
                  onSelect={(time) => {
                    if (time) setStartDate(time);
                    setShowStartPicker(false);
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Chọn ngày kết thúc */}
      <div className="flex items-start gap-4">
        <div className="mt-1">
          <div className="w-4 h-4 rounded-full border-2 border-slate-300"></div>
        </div>
        <div className="flex-1">
          <label>Kết thúc</label>
          <div className="grid grid-cols-2 gap-2 mt-1">
            <div
              className="bg-white hover:bg-gray-300 rounded-md px-3 py-2 cursor-pointer"
              onClick={() => setShowPicker1(!showPicker1)}
            >
              {format(endDate1, "dd/MM/yyyy")}
            </div>
            {showPicker1 && (
              <div
                ref={pickerRef1}
                className="absolute bg-white shadow-md p-2 mt-2 rounded-md"
              >
                <DatePicker
                  selected={endDate1}
                  onChange={(date) => {
                    setEndDate1(date);
                    setShowPicker1(false);
                  }}
                  minDate={startDate1}
                  inline
                />
              </div>
            )}
            <div>
              <div
                className="bg-white rounded-md px-3 py-2 hover:bg-gray-300 cursor-pointer mt-2"
                onClick={() => setShowEndPicker(!showEndPicker)}
              >
                {format(endDate, "HH:mm")}
              </div>
              {showEndPicker && (
                <TimePicker
                  startTime={startDate}
                  selectedTime={endDate}
                  onSelect={(time) => {
                    if (time) setEndDate(time);
                    setShowEndPicker(false);
                  }}
                  isEndPicker
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Múi giờ */}
      <div className="flex justify-center">
        <div className="bg-white rounded-md px-3 py-2 flex items-center gap-2 cursor-pointer hover:bg-gray-300">
          <span>🌍</span>
          <span>GMT+07:00</span>
          <span className="text-muted-foreground">Bangkok</span>
        </div>
      </div>
    </div>
  );
}
