import React from "react";
import { User, Mail, Phone, Calendar } from "lucide-react";
import Text from "../../common/Text";
import { Card } from "../../common/Card";
import { Button } from "../../common/Button";
import { Badge } from "../../common/Badge";
import { COLORS } from "../../common/colors";

export default function ProfileCard({ user }) {
  return (
    <Card className="p-6 space-y-4">
      <div className="flex flex-col items-center text-center space-y-3">
        <div className={`w-24 h-24 rounded-full bg-[${COLORS.primary}]/10 flex items-center justify-center`}>
          <User className={`h-12 w-12 text-[${COLORS.primary}]`} />
        </div>
        <Text as="h3" content={user.name} MyClass="text-lg font-medium" />
        <Text as="p" content={user.role} MyClass="text-gray-500" />
        <div className="flex gap-2">
          <Badge variant="outline">{user.level}</Badge>
          <Badge variant="secondary">{user.departmentId}</Badge>
        </div>
      </div>

      <div className="space-y-3 mt-4">
        <div className="flex items-center gap-3 text-sm"><Mail className="h-4 w-4 text-gray-400" />
          <Text as="span" content={user.email} MyClass="text-gray-700" />
        </div>
        <div className="flex items-center gap-3 text-sm"><Phone className="h-4 w-4 text-gray-400" />
          <Text as="span" content={user.phone} MyClass="text-gray-700" />
        </div>
        <div className="flex items-center gap-3 text-sm"><Calendar className="h-4 w-4 text-gray-400" />
          <Text as="span" content={`DOB: ${new Date(user.dateOfBirth).toLocaleDateString()}`} MyClass="text-gray-700" />
        </div>
      </div>

      <Button className="w-full mt-4" variant="secondary">Edit Profile</Button>
    </Card>
  );
}
