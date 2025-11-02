import React from "react";
import { User, Mail, Phone, Calendar } from "lucide-react";
import Text from "../../common/Text";
import { Card } from "../../common/Card";
import { Button } from "../../common/Button";
import { Badge } from "../../common/Badge";
import { COLORS } from "../../common/colors";
import { currentUser } from "../../common/mockData";
import  Input from "../../common/Input";

export default function ProfileOverviewCard({ user }) {
  return (
         <Card className="p-6 space-y-4">
                  <Text as="h3" content="Contact Information" MyClass="text-lg font-medium" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input label="Full Name" value={currentUser.name} />
                    <Input label="Email" type="email" value={currentUser.email} />
                    <Input label="Phone" type="tel" value={currentUser.phone} />
                    <Input label="Date of Birth" type="date" value={currentUser.dateOfBirth} />
                  </div>

                  <Text as="h4" content="Employment Details" MyClass="mt-4 text-md font-medium" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input label="Department" value={currentUser.departmentName} disabled />
                    <Input label="Department ID" value={currentUser.departmentId} disabled />
                    <Input label="Role" value={currentUser.role} disabled />
                    <Input label="Staff Level" value={currentUser.level} disabled />
                  </div>

                  <div className="flex justify-end mt-4 gap-2">
      <Button className="w-full mt-4" variant="secondary">Edit Profile</Button>

                  </div>
                </Card>
  );
}
