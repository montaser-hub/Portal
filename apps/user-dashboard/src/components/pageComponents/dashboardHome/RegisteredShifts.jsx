import React from 'react';
import { CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import { currentUser, shifts } from '../../common/mockData';
import  Card  from '../../common/Card';
import  Badge  from '../../common/Badge';
import  Button  from '../../common/Button';
import Text from '../../common/Text';

export default function RegisteredShift() {
    const userAssignedShifts = shifts.filter(
        (s) => s.assignedUserId === currentUser.id && s.status === 'Assigned'
    );
    return (
        <Card className={`p-6 space-y-4 shadow-sm bg-white border-gray-200 hover:shadow-md transition-all`}>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className={`p-2 rounded-lg bg-[#E0F4F6]`}>
                        <CheckCircle className={`h-5 w-5 text-[#0F7B8A]`} />
                    </div>
                    <Text as="h3" MyClass="font-normal text-gray-500" content="Register Shift" />
                </div>
                <Badge className={`bg-green-50 text-[#2ECC71] border border-green-200`}>
                    {userAssignedShifts.length} Shifts
                </Badge>
            </div>

            <div className="space-y-3">
                {userAssignedShifts.length > 0 ? (
                    userAssignedShifts.map((shift) => (
                        <div
                            key={shift.id}
                            className={`p-3 bg-[#E8EEF1]/20 rounded-lg border border-[#E5E7EB]`}
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <Text
                                        as="p"
                                        MyClass="text-sm font-normal text-gray-800"
                                        content={format(new Date(shift.date), 'MMM dd')}
                                    />
                                    <Text
                                        as="p"
                                        MyClass="text-xs text-gray-500"
                                        content={`${shift.startTime} - ${shift.endTime}`}
                                    />
                                </div>
                                <Badge
                                    variant="outline"
                                    className={`bg-[#E0F4F6] text-[#0F7B8A] border-[#E0F4F6]`}
                                >
                                    Assigned
                                </Badge>
                            </div>
                        </div>
                    ))
                ) : (
                    <Text
                        as="p"
                        MyClass="text-sm text-gray-500 text-center py-4"
                        content="No registered shifts"
                    />
                )}
            </div>
            <Button
                className={`w-full bg-[#0F7B8A] hover:bg-opacity-90 text-white`}
                onClick={(e) => {
                    e.stopPropagation();
                    onNavigate('calendar');
                }}
            >
                Register New Shift
            </Button>
            <Button
                className={`w-full bg-[#0F7B8A] hover:bg-opacity-90 text-white`}
                onClick={(e) => {
                    e.stopPropagation();
                    onNavigate('calendar');
                }}
            >
                View Full Calendar
            </Button>
        </Card>
    );
}
