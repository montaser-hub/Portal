import React from 'react';
import { RefreshCw, CheckCircle, XCircle } from 'lucide-react';
import { Card } from '../../common/Card';
import { Badge } from '../../common/Badge';
import { Button } from '../../common/Button';
import Text from '../../common/Text';

export function SwapRequestsList({ requests, currentUserId, }) {
    const userRequests = requests.filter(r => r.requesterId === currentUserId);
    const featuredRequest = userRequests.find(r => r.shiftDate === '2025-10-31') || userRequests[0];

    const getStatusIcon = (status) => {
        if (status.includes("Pending")) return <RefreshCw className="h-4 w-4 text-yellow-600" />;
        if (status === "Approved") return <CheckCircle className="h-4 w-4 text-green-600" />;
        if (status === "Rejected") return <XCircle className="h-4 w-4 text-red-600" />;
        return null;
    };

    const getStatusVariant = (status) => {
        if (status === "Approved") return "success";
        if (status.includes("Pending")) return "warning";
        if (status === "Rejected") return "destructive";
        return "secondary";
    };

    return (
      <Card className={`p-6 space-y-4 `}>
        <div className="flex items-center gap-2 text-gray-800">
          <RefreshCw className="h-5 w-5" />
          <Text as="h3" MyClass="font-medium" content="Swap Requests" />
          <Badge variant="secondary" className="mr-auto"> {userRequests.length} requests </Badge>
        </div>
        {featuredRequest ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg border border-gray-200">
              <div>
                <Text as="p" MyClass="text-gray-500 text-sm" content="Shift to Drop" />
                <Text as="p" MyClass="font-medium text-gray-800" content={featuredRequest.shiftDate} />
                <Text as="p" MyClass="text-sm text-gray-600 mt-0.5" content={featuredRequest.shiftTime} />
              </div>
              <div className="text-right">
                <Text as="p" MyClass="text-gray-500 text-sm" content="Status" />
                <div className="flex items-center gap-1 mt-1">
                  {getStatusIcon(featuredRequest.status)}
                  <Badge variant={getStatusVariant(featuredRequest.status)}>
                    {featuredRequest.status}
                  </Badge>
                </div>
              </div>
            </div>
            <Button className="w-full text-sm">
              Request Swap
            </Button>
            <Text as="p" MyClass="text-center text-xs text-gray-500" content="View all pending requests" />
          </div>
        ) : (
          <div className="text-center py-8">
            <Text as="p" MyClass="text-gray-500" content="No active swap requests" />
            <Button className="mt-4 text-sm">Register Swap</Button>
          </div>
        )}
      </Card>
    );
}

export default SwapRequestsList;
