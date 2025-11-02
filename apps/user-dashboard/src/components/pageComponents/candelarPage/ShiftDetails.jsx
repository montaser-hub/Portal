import { Clock, User as UserIcon, Calendar as CalendarIcon } from "lucide-react";
import Badge from "../../common/Badge";
import Separator from "./Separator";
import { getShiftColor } from "./Calendar";
import { COLORS } from "../../common/colors";

// ---------------- Shift Details Sidebar ----------------
export default function ShiftDetails({ selectedDate, selectedDateShifts }) {
  return (
    <div className={`border-l ${COLORS.grayBorder} pl-6 space-y-4`}>
      <div>
        <h3>{selectedDate ? selectedDate.toLocaleDateString('en-US', { weekday:'long', month:'long', day:'numeric' }) : 'Select a date'}</h3>
        <p className="text-sm text-muted-foreground mt-1">
          {selectedDateShifts.length} shift{selectedDateShifts.length !== 1 ? 's' : ''}
        </p>
      </div>

      <Separator />

      <div className="space-y-3 max-h-[600px] overflow-y-auto">
        {selectedDateShifts.length > 0 ? selectedDateShifts.map((shift) => (
          <div key={shift.id} className={`p-4 ${COLORS.bgLight} rounded-lg border ${COLORS.grayBorder} space-y-3`}>
            <div className="flex items-center justify-between">
              <Badge variant="outline" className={getShiftColor(shift)}>{shift.status}</Badge>
              {shift.requiredLevel && <Badge variant="outline" className={`bg-[${COLORS.primary}]/10 text-[${COLORS.primary}] border-[${COLORS.primary}]/20`}>{shift.requiredLevel}</Badge>}
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{shift.startTime} - {shift.endTime}</span>
              </div>

              {shift.assignedUserName ? (
                <div className="flex items-center gap-2">
                  <UserIcon className="h-4 w-4" style={{ color: COLORS.primary }} />
                  <span className="text-sm">{shift.assignedUserName}</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <UserIcon className="h-4 w-4" style={{ color: COLORS.alert }} />
                  <span className="text-sm" style={{ color: COLORS.alert }}>Unassigned</span>
                </div>
              )}
            </div>

            {shift.notes && (
              <div className={`pt-2 border-t ${COLORS.grayBorder}`}>
                <p className="text-xs text-muted-foreground">{shift.notes}</p>
              </div>
            )}
          </div>
        )) : (
          <div className="text-center py-8">
            <CalendarIcon className="h-12 w-12 mx-auto mb-3 text-muted-foreground opacity-50" />
            <p className="text-sm text-muted-foreground">No shifts scheduled</p>
          </div>
        )}
      </div>
    </div>
  );
}
