"use client";

import { useFormContext, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, setHours, setMinutes } from "date-fns";
import TimePicker from "./timePicker";
import { useState } from "react";

interface TimePickerProps {
  selectedTime: Date;
  onSelect: (time: Date | null) => void;
  startTime: Date;
  isEndPicker?: boolean;
}

export default function EventTimePicker() {
  const { control, watch, setValue } = useFormContext();

  const startDate = watch("startDate");
  const endDate = watch("endDate");

  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  return (
    <div className="space-y-3 bg-muted/30 rounded-lg p-4">
      {/* Bắt đầu */}
      <div className="flex items-start gap-4">
        <div className="mt-1">
          <div className="w-4 h-4 rounded-full bg-slate-300 border-2 border-white"></div>
        </div>
        <div className="flex-1">
          <label>Bắt đầu</label>
          <div className="grid grid-cols-2 gap-2 mt-1">
            {/* Ngày bắt đầu */}
            <Controller
              control={control}
              name="startDate"
              render={({ field }) => (
                <DatePicker
                  selected={field.value || new Date()}
                  onChange={(date) => {
                    const updated = setHours(
                      setMinutes(date as Date, field.value?.getMinutes() || 0),
                      field.value?.getHours() || 0,
                    );
                    field.onChange(updated);
                  }}
                  minDate={new Date()}
                  dateFormat="dd/MM/yyyy"
                  className="bg-white px-3 py-2 rounded-md cursor-pointer w-full"
                />
              )}
            />

            {/* Giờ bắt đầu */}
            <div>
              <div
                className="bg-white px-3 py-2 rounded-md cursor-pointer hover:bg-gray-200"
                onClick={() => setShowStartTimePicker(!showStartTimePicker)}
              >
                {format(startDate, "HH:mm")}
              </div>
              {showStartTimePicker && (
                <TimePicker
                  selectedTime={startDate || new Date()}
                  startTime={startDate || new Date()}
                  onSelect={(time: Date | null) => {
                    if (time) {
                      const updated = setHours(
                        setMinutes(startDate || new Date(), time.getMinutes()),
                        time.getHours(),
                      );
                      setValue("startDate", updated);
                    }
                    setShowStartTimePicker(false);
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Kết thúc */}
      <div className="flex items-start gap-4">
        <div className="mt-1">
          <div className="w-4 h-4 rounded-full border-2 border-slate-300"></div>
        </div>
        <div className="flex-1">
          <label>Kết thúc</label>
          <div className="grid grid-cols-2 gap-2 mt-1">
            {/* Ngày kết thúc */}
            <Controller
              control={control}
              name="endDate"
              render={({ field }) => (
                <DatePicker
                  selected={field.value || new Date()}
                  onChange={(date) => {
                    const updated = setHours(
                      setMinutes(date as Date, field.value?.getMinutes() || 0),
                      field.value?.getHours() || 0,
                    );
                    field.onChange(updated);
                  }}
                  minDate={startDate}
                  dateFormat="dd/MM/yyyy"
                  className="bg-white px-3 py-2 rounded-md cursor-pointer w-full"
                />
              )}
            />

            {/* Giờ kết thúc */}
            <div>
              <div
                className="bg-white px-3 py-2 rounded-md cursor-pointer hover:bg-gray-200"
                onClick={() => setShowEndTimePicker(!showEndTimePicker)}
              >
                {format(endDate, "HH:mm")}
              </div>
              {showEndTimePicker && (
                <TimePicker
                  selectedTime={endDate || new Date()}
                  startTime={startDate || new Date()}
                  onSelect={(time: Date | null) => {
                    if (time) {
                      const updated = setHours(
                        setMinutes(endDate || new Date(), time.getMinutes()),
                        time.getHours(),
                      );
                      setValue("endDate", updated);
                    }
                    setShowEndTimePicker(false);
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
