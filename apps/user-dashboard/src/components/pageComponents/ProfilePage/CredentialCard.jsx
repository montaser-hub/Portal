import React from "react";
import Text from "../../common/Text";
import { Card } from "../../common/Card";
import { Button } from "../../common/Button";
import { Badge } from "../../common/Badge";
import { AlertTriangle, Award } from "lucide-react";
import { COLORS } from "../../common/colors";

const getCredentialStatus = (credential) => {
  const expiryDate = new Date(credential.expiryDate);
  const now = new Date();
  const daysUntilExpiry = Math.floor((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  if (daysUntilExpiry < 0)
    return { color: "destructive", icon: AlertTriangle, text: "Expired" };
  if (daysUntilExpiry < 30)
    return { color: "warning", icon: AlertTriangle, text: "Expiring Soon" };
  return { color: "success", icon: Award, text: "Valid" };
};

export default function CredentialCard({ credentials }) {
  return (
    <Card className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <Text as="h3" content="Licenses & Certifications" MyClass="text-lg font-medium" />
        <Button size="sm">Add Credential</Button>
      </div>
      <div className="space-y-3">
        {credentials?.map((cred) => {
          const status = getCredentialStatus(cred);
          const StatusIcon = status.icon;
          return (
            <div key={cred.id} className={`p-4 rounded-lg border ${status.text !== "Valid" ? `bg-[${COLORS.alert}]/10 border-[${COLORS.alert}]/20` : "bg-white border-gray-200"}`}>
              <div className="flex justify-between items-start">
                <div className="flex gap-3 items-start">
                  <div className="p-2 rounded-lg">
                    <StatusIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <Text as="h4" content={cred.name} MyClass="text-md font-medium" />
                    <Text as="p" content={`Expires: ${new Date(cred.expiryDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`} MyClass="text-sm text-gray-600 mt-1" />
                  </div>
                </div>
                <Badge variant={status.color}>{status.text}</Badge>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

