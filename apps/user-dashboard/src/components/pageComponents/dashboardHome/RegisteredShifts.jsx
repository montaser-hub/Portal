import React from 'react';
import { CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import { Card } from '../../common/Card';
import { Badge } from '../../common/Badge';
import { Button } from '../../common/Button';
import Text from '../../common/Text';
import { COLORS } from '../../common/colors';
import { currentUser, shifts } from '../../common/mockData';

export function RegisteredShift() {
    const primaryLightBg = `bg-[${COLORS.primaryLight}]`;
    const primaryText = `text-[${COLORS.primary}]`;
    const grayBorder = `border-[${COLORS.grayBorder}]`;
    const successText = `text-[${COLORS.success}]`;
    const successLightBg = `bg-green-50`;
    const successBorder = `border-green-200`;
    const userAssignedShifts = shifts.filter(
        (s) => s.assignedUserId === currentUser.id && s.status === 'Assigned'
    );
    return (
        <Card
            className={`p-6 space-y-4 shadow-sm ${grayBorder} hover:shadow-md transition-all`}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    {/* أيقونة ومربع اللون */}
                    <div className={`p-2 rounded-lg ${primaryLightBg}`}>
                        <CheckCircle className={`h-5 w-5 ${primaryText}`} />
                    </div>
                    <Text as="h3" MyClass="font-normal text-gray-800" content="Register Shift" />
                </div>
                {/* بادج عدد المناوبات */}
                <Badge className={`${successLightBg} ${successText} border ${successBorder}`}>
                    {userAssignedShifts.length} Shifts
                </Badge>
            </div>

            <div className="space-y-3">
                {userAssignedShifts.length > 0 ? (
                    userAssignedShifts
                        .slice(0, 3)
                        .map((shift) => (
                            // بطاقة المناوبة الفردية
                            <div
                                key={shift.id}
                                // استخدام bg-gray-100 و border-gray-200 كبديل لـ bg-secondary/20 و border-border
                                className={`p-3 bg-gray-100 rounded-lg border ${grayBorder}`}
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <Text as="p" MyClass="text-sm font-normal text-gray-800"
                                              content={format(new Date(shift.date), 'MMM dd')} />
                                        <Text as="p" MyClass="text-xs text-gray-500"
                                              content={`${shift.startTime} - ${shift.endTime}`} />
                                    </div>
                                    <Badge
                                        variant="outline"

                                        className={`${primaryLightBg} ${primaryText} border-[${COLORS.primaryLight}]`}
                                    >
                                        Assigned
                                    </Badge>
                                </div>
                            </div>
                        ))
                ) : (
                    <Text as="p" MyClass="text-sm text-gray-500 text-center py-4" content="No registered shifts" />
                )}
            </div>

            <Button

                className={`w-full bg-[${COLORS.primary}] hover:bg-opacity-90 text-white`}
                onClick={(e) => {
                    e.stopPropagation();
                    onNavigate('calendar');
                }}
            >
                Register New Shift
            </Button>
            <Button
                className={`w-full bg-[${COLORS.primary}] hover:bg-opacity-90 text-white`}
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
