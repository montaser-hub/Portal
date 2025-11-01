// import React, { useState } from "react";
// import * as SeparatorPrimitive from "@radix-ui/react-separator";
// import * as SelectPrimitive from "@radix-ui/react-select";
// import {
//   ChevronLeft,
//   ChevronRight,
//   Calendar as CalendarIcon,
//   Filter,
//   Clock,
//   User as UserIcon,
//   CheckIcon,
//   ChevronDownIcon,
//   ChevronUpIcon
// } from "lucide-react";
// import Card from "../components/common/Card";
// import Button from "../components/common/Button";
// import Badge from "../components/common/Badge";
// import { currentUser, shifts } from "../components/common/mockData";

// // الألوان المخصصة
// const PRIMARY_COLOR = '#0F7B8A';
// const ALERT_COLOR = '#E74C3C';
// const LIGHT_GRAY_BACKGROUND = 'bg-gray-50'; // لون خلفية فاتح إضافي
// const LIGHT_GRAY_BORDER = 'border-gray-200'; // لون حدود فاتح

// // ---------------- Separator ----------------
// function Separator({ className = "", orientation = "horizontal", decorative = true, ...props }) {
//   return (
//     <SeparatorPrimitive.Root
//       data-slot="separator-root"
//       decorative={decorative}
//       orientation={orientation}
//       className={
//         (orientation === "horizontal" ? `bg-border shrink-0 h-px w-full ${LIGHT_GRAY_BORDER}` : `bg-border shrink-0 h-full w-px ${LIGHT_GRAY_BORDER}`) +
//         className
//       }
//       {...props}
//     />
//   );
// }

// // ---------------- Select Components ----------------
// function Select(props) {
//   return <SelectPrimitive.Root data-slot="select" {...props} />;
// }
// function SelectGroup(props) {
//   return <SelectPrimitive.Group data-slot="select-group" {...props} />;
// }
// function SelectValue(props) {
//   return <SelectPrimitive.Value data-slot="select-value" {...props} />;
// }
// function SelectTrigger({ className = "", size = "default", children, ...props }) {
//   return (
//     <SelectPrimitive.Trigger
//       data-slot="select-trigger"
//       data-size={size}
//       className={
//         `border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-[${PRIMARY_COLOR}] focus-visible:ring-[${PRIMARY_COLOR}]/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive flex w-full items-center justify-between gap-2 rounded-md border bg-white px-3 py-2 text-sm whitespace-nowrap transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 ` + className
//       }
//       {...props}
//     >
//       {children}
//       <SelectPrimitive.Icon asChild>
//         <ChevronDownIcon className="size-4 opacity-50" />
//       </SelectPrimitive.Icon>
//     </SelectPrimitive.Trigger>
//   );
// }
// function SelectContent({ className = "", children, position = "popper", ...props }) {
//   return (
//     <SelectPrimitive.Portal>
//       <SelectPrimitive.Content
//         data-slot="select-content"
//         className={
//           "bg-white text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md " +
//           (position === "popper"
//             ? "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1 "
//             : "") +
//           className
//         }
//         position={position}
//         {...props}
//       >
//         <SelectScrollUpButton />
//         <SelectPrimitive.Viewport
//           className={
//             "p-1 " +
//             (position === "popper" ? "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1 " : "")
//           }
//         >
//           {children}
//         </SelectPrimitive.Viewport>
//         <SelectScrollDownButton />
//       </SelectPrimitive.Content>
//     </SelectPrimitive.Portal>
//   );
// }
// function SelectLabel({ className = "", ...props }) {
//   return (
//     <SelectPrimitive.Label
//       data-slot="select-label"
//       className={"text-muted-foreground px-2 py-1.5 text-xs " + className}
//       {...props}
//     />
//   );
// }
// function SelectItem({ className = "", children, ...props }) {
//   return (
//     <SelectPrimitive.Item
//       data-slot="select-item"
//       className={
//         `focus:bg-[${PRIMARY_COLOR}]/10 focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 ` +
//         className
//       }
//       {...props}
//     >
//       <span className="absolute right-2 flex size-3.5 items-center justify-center">
//         <SelectPrimitive.ItemIndicator>
//           <CheckIcon className={`size-4 text-[${PRIMARY_COLOR}]`} />
//         </SelectPrimitive.ItemIndicator>
//       </span>
//       <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
//     </SelectPrimitive.Item>
//   );
// }
// function SelectSeparator({ className = "", ...props }) {
//   return (
//     <SelectPrimitive.Separator
//       data-slot="select-separator"
//       className={`bg-border pointer-events-none -mx-1 my-1 h-px ${LIGHT_GRAY_BORDER} ` + className}
//       {...props}
//     />
//   );
// }
// function SelectScrollUpButton({ className = "", ...props }) {
//   return (
//     <SelectPrimitive.ScrollUpButton
//       data-slot="select-scroll-up-button"
//       className={"flex cursor-default items-center justify-center py-1 " + className}
//       {...props}
//     >
//       <ChevronUpIcon className="size-4" />
//     </SelectPrimitive.ScrollUpButton>
//   );
// }
// function SelectScrollDownButton({ className = "", ...props }) {
//   return (
//     <SelectPrimitive.ScrollDownButton
//       data-slot="select-scroll-down-button"
//       className={"flex cursor-default items-center justify-center py-1 " + className}
//       {...props}
//     >
//       <ChevronDownIcon className="size-4" />
//     </SelectPrimitive.ScrollDownButton>
//   );
// }

// // ---------------- Calendar Page ----------------
// export function CalendarPage() {
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [viewMode, setViewMode] = useState('month');
//   const [filter, setFilter] = useState('personal');
//   const [selectedDate, setSelectedDate] = useState(new Date());

//   const getDaysInMonth = (date) => {
//     const year = date.getFullYear();
//     const month = date.getMonth();
//     const firstDay = new Date(year, month, 1);
//     const lastDay = new Date(year, month + 1, 0);
//     const startingDayOfWeek = firstDay.getDay();
//     const days = [];
//     for (let i = 0; i < startingDayOfWeek; i++) days.push(null);
//     for (let i = 1; i <= lastDay.getDate(); i++) days.push(new Date(year, month, i));
//     return days;
//   };

//   const getShiftsForDate = (date) => {
//     if (!date) return [];
//     const dateStr = date.toISOString().split('T')[0];
//     return shifts.filter(shift =>
//       filter === 'personal'
//         ? shift.date === dateStr && shift.assignedUserId === currentUser.id
//         : shift.date === dateStr
//     );
//   };

//   const getShiftColor = (shift) => {
//     if (shift.status === 'Completed') return 'bg-gray-100 text-gray-700 border-gray-300'; // رمادي فاتح للمكتمل
//     if (shift.status === 'Assigned') return `bg-[${PRIMARY_COLOR}]/10 text-[${PRIMARY_COLOR}] border-[${PRIMARY_COLOR}]/20`; // لون أساسي (Deep Teal) للمعين
//     if (shift.status === 'Open') return `bg-[${ALERT_COLOR}]/10 text-[${ALERT_COLOR}] border-[${ALERT_COLOR}]/20`; // Alert Red للمفتوح
//     return 'bg-secondary/20 text-secondary-foreground border-border';
//   };

//   const previousMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth()-1, 1));
//   const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth()+1, 1));

//   const days = getDaysInMonth(currentDate);
//   const monthName = currentDate.toLocaleDateString('en-US', { month:'long', year:'numeric' });
//   const selectedDateShifts = getShiftsForDate(selectedDate);

//   return (
//     <div className="p-8 space-y-6 bg-white">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1>Schedule Calendar</h1>
//           <p className="text-muted-foreground mt-1">View and manage your shifts</p>
//         </div>
//         <div className="flex items-center gap-3">
//           <Select value={filter} onValueChange={v => setFilter(v)}>
//             <SelectTrigger className="w-[180px]">
//               <Filter className="mr-2 h-4 w-4" />
//               <SelectValue />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="personal">My Schedule</SelectItem>
//               <SelectItem value="department">Department Schedule</SelectItem>
//             </SelectContent>
//           </Select>

//           <Select value={viewMode} onValueChange={v => setViewMode(v)}>
//             <SelectTrigger className="w-[120px]">
//               <SelectValue />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="month">Month</SelectItem>
//               <SelectItem value="week">Week</SelectItem>
//               <SelectItem value="day">Day</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//       </div>

//       {/* Calendar Grid and Details */}
//       <div className="max-w-7xl mx-auto">
//          <Card className={`p-6 shadow-sm border ${LIGHT_GRAY_BORDER} bg-white`}>
//           <div className="flex items-center justify-between mb-6">
//             <h2>{monthName}</h2>
//             <div className="flex items-center gap-2">
//               <Button variant="outline" size="icon" onClick={previousMonth}>
//                 <ChevronLeft className="h-4 w-4" />
//               </Button>
//               <Button variant="outline" onClick={() => setCurrentDate(new Date())}>Today</Button>
//               <Button variant="outline" size="icon" onClick={nextMonth}>
//                 <ChevronRight className="h-4 w-4" />
//               </Button>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             {/* Calendar Grid */}
//             <div className="lg:col-span-2">
//               <div className="grid grid-cols-7 gap-2">
//                 {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map((day) => (
//                   <div key={day} className="text-center text-muted-foreground py-2">{day}</div>
//                 ))}

//                 {days.map((date, index) => {
//                   const dayShifts = getShiftsForDate(date);
//                   const isToday = date && date.toDateString() === new Date().toDateString();
//                   const isSelected = date && selectedDate && date.toDateString() === selectedDate.toDateString();

//                   return (
//                     <div
//                       key={index}
//                       onClick={() => date && setSelectedDate(date)}
//                       className={`min-h-[120px] p-2 border rounded-lg cursor-pointer transition-all ${
//                         !date ? 'bg-gray-100/50 cursor-default' : // خلفية رمادية فاتحة للخلايا الفارغة
//                         isSelected ? `bg-[${PRIMARY_COLOR}]/10 border-[${PRIMARY_COLOR}] shadow-sm` : // Deep Teal مختار
//                         isToday ? `bg-[${PRIMARY_COLOR}]/5 border-[${PRIMARY_COLOR}]` : // Deep Teal اليوم
//                         `bg-white border-${LIGHT_GRAY_BORDER} hover:bg-gray-50/50` // الأبيض/الرمادي للخلايا العادية
//                       }`}
//                     >
//                       {date && (
//                         <>
//                           <div className={`text-sm mb-2 ${isSelected ? `text-[${PRIMARY_COLOR}]` : isToday ? `text-[${PRIMARY_COLOR}]` : 'text-foreground'}`}>
//                             {date.getDate()}
//                           </div>
//                           <div className="space-y-1">
//                             {dayShifts.map((shift) => (
//                               <div key={shift.id} className={`px-2 py-1 rounded text-xs border ${getShiftColor(shift)}`}>
//                                 <div className="truncate">{shift.startTime}</div>
//                                 {filter === 'department' && shift.assignedUserName && (
//                                   <div className="truncate text-xs opacity-75">{shift.assignedUserName.split(' ')[0]}</div>
//                                 )}
//                               </div>
//                             ))}
//                           </div>
//                         </>
//                       )}
//                     </div>
//                   );
//                 })}
//               </div>

//               {/* Legend */}
//               <div className={`flex items-center gap-6 mt-6 pt-6 border-t ${LIGHT_GRAY_BORDER}`}>
//                 <div className="flex items-center gap-2">
//                   <div className="w-4 h-4 rounded" style={{ backgroundColor: `${PRIMARY_COLOR}1A`, borderColor: `${PRIMARY_COLOR}33`, borderWidth: '1px' }}></div>
//                   <span className="text-sm text-muted-foreground">Assigned</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <div className="w-4 h-4 rounded bg-gray-100 border border-gray-300"></div>
//                   <span className="text-sm text-muted-foreground">Completed</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <div className="w-4 h-4 rounded" style={{ backgroundColor: `${ALERT_COLOR}1A`, borderColor: `${ALERT_COLOR}33`, borderWidth: '1px' }}></div>
//                   <span className="text-sm text-muted-foreground">Open/Unassigned</span>
//                 </div>
//               </div>
//             </div>

//             {/* Selected Date Details */}
//             <div className={`border-l ${LIGHT_GRAY_BORDER} pl-6 space-y-4`}>
//               <div>
//                 <h3>{selectedDate ? selectedDate.toLocaleDateString('en-US', { weekday:'long', month:'long', day:'numeric' }) : 'Select a date'}</h3>
//                 <p className="text-sm text-muted-foreground mt-1">
//                   {selectedDateShifts.length} shift{selectedDateShifts.length !== 1 ? 's' : ''}
//                 </p>
//               </div>

//               <Separator />

//               <div className="space-y-3 max-h-[600px] overflow-y-auto">
//                 {selectedDateShifts.length > 0 ? selectedDateShifts.map((shift) => (
//                   <div key={shift.id} className={`p-4 ${LIGHT_GRAY_BACKGROUND} rounded-lg border ${LIGHT_GRAY_BORDER} space-y-3`}>
//                     <div className="flex items-center justify-between">
//                       <Badge variant="outline" className={getShiftColor(shift)}>{shift.status}</Badge>
//                       {shift.requiredLevel && <Badge variant="outline" className={`bg-[${PRIMARY_COLOR}]/10 text-[${PRIMARY_COLOR}] border-[${PRIMARY_COLOR}]/20`}>{shift.requiredLevel}</Badge>}
//                     </div>

//                     <div className="space-y-2">
//                       <div className="flex items-center gap-2">
//                         <Clock className="h-4 w-4 text-muted-foreground" />
//                         <span className="text-sm">{shift.startTime} - {shift.endTime}</span>
//                       </div>

//                       {shift.assignedUserName ? (
//                         <div className="flex items-center gap-2">
//                           <UserIcon className="h-4 w-4" style={{ color: PRIMARY_COLOR }} /> {/* أيقونة بلون Deep Teal */}
//                           <span className="text-sm">{shift.assignedUserName}</span>
//                         </div>
//                       ) : (
//                         <div className="flex items-center gap-2">
//                           <UserIcon className="h-4 w-4" style={{ color: ALERT_COLOR }} /> {/* أيقونة بلون Alert Red */}
//                           <span className="text-sm" style={{ color: ALERT_COLOR }}>Unassigned</span>
//                         </div>
//                       )}
//                     </div>

//                     {shift.notes && (
//                       <div className={`pt-2 border-t ${LIGHT_GRAY_BORDER}`}>
//                         <p className="text-xs text-muted-foreground">{shift.notes}</p>
//                       </div>
//                     )}
//                   </div>
//                 )) : (
//                   <div className="text-center py-8">
//                     <CalendarIcon className="h-12 w-12 mx-auto mb-3 text-muted-foreground opacity-50" />
//                     <p className="text-sm text-muted-foreground">No shifts scheduled</p>
//                   </div>
//                 )}
//               </div>
//             </div>

//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// }

// // ---------------- Export Select + Separator ----------------
// export {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectScrollDownButton,
//   SelectScrollUpButton,
//   SelectSeparator,
//   SelectTrigger,
//   SelectValue,
//   Separator
// };
import React, { useState } from "react";
import Card from "../components/common/Card";
import CalendarHeader from "../components/pageComponents/candelarPage/CalendarHeader";
import MonthView from "../components/pageComponents/candelarPage/MonthView";
import ShiftDetails from "../components/pageComponents/candelarPage/ShiftDetails";
import { getShiftsForDate } from "../components/pageComponents/candelarPage/Calendar";
import { COLORS  } from "../components/common/colors";

// ---------------- Calendar Page ----------------
export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('month');
  const [filter, setFilter] = useState('personal');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const selectedDateShifts = getShiftsForDate(selectedDate, filter);

  return (
    <div className="p-8 space-y-6 bg-white">
      {/* Header */}
      <CalendarHeader
        filter={filter}
        setFilter={setFilter}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      {/* Calendar Grid and Details */}
      <div className="max-w-7xl mx-auto">
         <Card className={`p-6 shadow-sm border ${COLORS.grayBorder} bg-white`}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Calendar Grid */}
            <MonthView
              currentDate={currentDate}
              setCurrentDate={setCurrentDate}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              filter={filter}
            />

            {/* Selected Date Details */}
            <ShiftDetails
              selectedDate={selectedDate}
              selectedDateShifts={selectedDateShifts}
            />

          </div>
        </Card>
      </div>
    </div>
  );
}
