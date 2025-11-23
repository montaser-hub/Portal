import { Clock, User as UserIcon, Calendar as CalendarIcon } from "lucide-react";
import Badge from "../../common/Badge";
import Separator from "./Separator";
import { getShiftColor } from "./Calendar";
import Text from "../../common/Text";

// ---------------- Shift Details Sidebar ----------------
export default function ShiftDetails({ selectedDate, selectedDateShifts }) {
  return (
    <div className={`border-l  pl-6 space-y-4`}>
      <div>
        <Text as="h3" content={selectedDate ? selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) : 'Select a date'} MyClass="text-gray-700" />
        <Text as="p"  content={`${selectedDateShifts.length} shift${selectedDateShifts.length !== 1 ? 's' : ''}`} MyClass="text-sm text-gray-500" />
      </div>

      <Separator />

      <div className="space-y-3 max-h-[600px] overflow-y-auto">
        {selectedDateShifts.length > 0 ? selectedDateShifts.map((shift) => (
          <div key={shift.id} className={`p-4  rounded-lg border  space-y-3`}>
            <div className="flex items-center justify-between">
              <Badge variant="outline" className={getShiftColor(shift)}>{shift.status}</Badge>
              {shift.requiredLevel && <Badge variant="outline" className={`bg-[#0F7B8A]/10 text-[#0F7B8A] border-[#0F7B8A]/20`}>{shift.requiredLevel}</Badge>}
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#6B7280]" />
                <span className="text-sm">{shift.startTime} - {shift.endTime}</span>
              </div>

              {shift.assignedUserName ? (
                <div className="flex items-center gap-2">
                  <UserIcon className="h-4 w-4" style={{ color: "#0F7B8A" }} />
                  <span className="text-sm">{shift.assignedUserName}</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <UserIcon className="h-4 w-4" style={{ color: "#E74C3C" }} />
                  <span className="text-sm" style={{ color: "#E74C3C" }}>Unassigned</span>
                </div>
              )}
            </div>

            {shift.notes && (
              <div className={`pt-2 border-t`}>
                <p className="text-xs text-[#6B7280]">{shift.notes}</p>
              </div>
            )}
          </div>
        )) : (
          <div className="text-center py-8">
            <CalendarIcon className="h-12 w-12 mx-auto mb-3 text-[#6B7280] opacity-50" />
            <p className="text-sm text-[#6B7280]">No shifts scheduled</p>
          </div>
        )}
      </div>
    </div>
  );
}
