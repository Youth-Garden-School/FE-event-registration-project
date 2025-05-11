"use client"

import { Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EventEmptyStateProps {
  onAddEvent: () => void
  isPast?: boolean
}

export function EventEmptyState({ onAddEvent, isPast = false }: EventEmptyStateProps) {
  return (
    <div className="text-center py-16 bg-white rounded-lg border">
      <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
        <Calendar className="h-8 w-8 text-gray-400" />
      </div>
      <h3 className="text-xl font-medium mb-2">Không có sự kiện</h3>
      <p className="text-gray-500 max-w-md mx-auto mb-6">
        {isPast ? "Lịch này không có sự kiện đã qua." : "Lịch này không có sự kiện sắp tới."}
      </p>
      <Button onClick={onAddEvent} className="bg-gray-900 hover:bg-gray-800">
        + Thêm sự kiện Resgista 
      </Button>
    </div>
  )
}
