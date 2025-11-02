import React from 'react';
import { Clock, AlertCircle } from 'lucide-react';
import { Card } from '../../common/Card';
import { Badge } from '../../common/Badge';
import { COLORS } from '../../common/colors';
import Text from '../../common/Text';

export function UpcomingShiftCard({ shift, timeUntil }) {
    const isStartingSoon = timeUntil === 'Starting Soon';
    return (
        <Card className="p-6 space-y-4 lg:col-span-2">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-800">
                    {/* استخدام Deep Teal الثابت */}
                    <Clock className={`h-5 w-5 text-[${COLORS.primary}]`} />
                    <Text as="h3" MyClass="font-normal  " content= "Upcoming Shift" />
                </div>
                {isStartingSoon && (
                    <Badge variant="destructive" className="ml-auto">Starting Soon</Badge>
                )}
            </div>
            {shift ? (
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 p-4 bg-gray-100 rounded-lg border border-gray-200">
                        <div>
                            <Text as="p" MyClass="text-gray-500 text-sm font-normal" content= "Date" />
                            <Text as="p" MyClass="font-normal text-gray-800"
                              content={new Date(shift.date).toLocaleDateString('en-US', {
                                weekday: 'long',
                                month: 'long',
                                day: 'numeric'
                              })}  />
                        </div>
                        <div className="text-right">
                          <Text as="p" MyClass="text-gray-500 text-sm" content="Time" />
                          <Text as="p" MyClass="font-medium text-gray-500" content={`${shift.startTime} - ${shift.endTime}`} />
                        </div>
                    </div>
                    <div className={`flex items-center gap-4 p-4 rounded-lg border
                        ${isStartingSoon ? 'bg-red-50 border-red-200' : 'bg-[#E0F4F6] border-gray-200'}`}>
                        <AlertCircle className={`h-5 w-5 ${isStartingSoon ? 'text-red-600' : `text-[${COLORS.primary}]`}`}/>
                        <div>
                          <Text as="p" MyClass="text-gray-600 text-sm" content="Time until shift" />
                          <Text as="p" MyClass={`font-medium ${isStartingSoon ? 'text-red-600' : `text-[${COLORS.primary}]`}`}
                          content={timeUntil || 'N/A'} />
                        </div>
                    </div>
                </div>
            ) : (
                <Text as="p" MyClass="text-gray-500 py-8 text-center" content="No upcoming shifts scheduled" />
            )}
        </Card>
    );
}

export default UpcomingShiftCard;
