import React from "react";
import { Clock } from "lucide-react";
import  Text from "../../common/Text";
import  Card  from "../../common/Card";
import  Button  from "../../common/Button";
import  Badge  from "../../common/Badge";

export default function AvailabilityCard({ daysOfWeek, getAvailabilityForDay }) {
  return (
    <Card className="p-6 space-y-4 bg-white border-gray-200">
      <Text as="h3" content="Availability" MyClass="text-lg font-medium text-gray-500" />
      <div className="space-y-3">
        {daysOfWeek.map((day, idx) => {
          const avail = getAvailabilityForDay(idx);
          return (
            <div key={day} className="flex items-center justify-between p-4 bg-[#E8EEF1]/20 rounded-lg border border-[#E5E7EB]">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-gray-400" />
                <Text as="span" content={day} MyClass="text-sm text-gray-500 font-semibold"   />
              </div>
              {avail ? (
                <div className="flex items-center gap-2">
                  <Text as="span" content={`${avail.startTime} - ${avail.endTime}`} MyClass="text-sm text-gray-600" />
                  <Badge variant={avail.preferred ? "outline" : "secondary"}>
                    {avail.preferred ? "Preferred" : "Available"}
                  </Badge>
                </div>
              ) : (
                <Badge variant="secondary">Not Set</Badge>
              )}
            </div>
          );
        })}
      </div>
      <div className="flex justify-end mt-2">
        <Button>Update Availability</Button>
      </div>
    </Card>
  );
}

