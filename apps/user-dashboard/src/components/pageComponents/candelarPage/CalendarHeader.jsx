import { Filter } from "lucide-react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./Select";

// ---------------- Calendar Header ----------------
export default function CalendarHeader({ filter, setFilter, viewMode, setViewMode }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1>Schedule Calendar</h1>
        <p className="text-muted-foreground mt-1">View and manage your shifts</p>
      </div>
      <div className="flex items-center gap-3">
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[180px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="personal">My Schedule</SelectItem>
            <SelectItem value="department">Department Schedule</SelectItem>
          </SelectContent>
        </Select>

        <Select value={viewMode} onValueChange={setViewMode}>
          <SelectTrigger className="w-[120px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="month">Month</SelectItem>
            <SelectItem value="week">Week</SelectItem>
            <SelectItem value="day">Day</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
