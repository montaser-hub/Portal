import { CheckCircle, Clock, UserCheck, RefreshCw } from "lucide-react";
import Text from "../../common/Text";
import Card from "../../common/Card";

export default function SwapRequestStatus({ request }) {
  return (
    <div className="space-y-6">
      <Text as="h2" content="Step 2: Approval Progress" MyClass="text-lg font-medium text-[#0F7B8A] mb-4" />

      <div className="grid grid-cols-1 md:grid-cols-[1fr_380px] gap-8 items-start">
        {/* Left: Approval Progress */}
        <Card className="p-6 relative">
          {/* Horizontal Progress Bar */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gray-100 rounded-t-xl">
            <div className="h-1 bg-[#0F7B8A] w-2/3 rounded-t-xl transition-all duration-500"></div>
          </div>

          <div className="flex flex-col space-y-6 mt-2">
            <div className="flex items-center space-x-3">
              <UserCheck className="text-[#0F7B8A]" />
              <div>
                <Text as="p" content="Peer Approval" MyClass="font-medium text-gray-800" />
                <Text as="p" content="Awaiting response..." MyClass="text-sm text-gray-500" />
              </div>
              <Clock className="ml-auto text-gray-400" />
            </div>

            <div className="flex items-center space-x-3">
              <RefreshCw className="text-[#0F7B8A]" />
              <div>
                <Text as="p" content="Manager Approval" MyClass="font-medium text-gray-800" />
                <Text as="p" content="Pending review" MyClass="text-sm text-gray-500" />
              </div>
              <Clock className="ml-auto text-gray-400" />
            </div>

            <div className="flex items-center space-x-3">
              <CheckCircle className="text-green-600" />
              <div>
                <Text as="p" content="Final Confirmation" MyClass="font-medium text-gray-800" />
                <Text as="p" content="Auto-confirm after manager approval" MyClass="text-sm text-gray-500" />
              </div>
            </div>
          </div>

          {/* Alert */}
          <div className="mt-6 p-4 bg-[#E74C3C]/10 text-[#E74C3C] rounded-lg border border-[#E74C3C]/30">
            <Text as="p" content="Note:" MyClass="font-medium" />
            <Text as="p" content="If your peer declines, the request will be automatically cancelled." MyClass="text-sm" />
          </div>
        </Card>

        {/* Right: Request Details */}
        <Card className="p-6 self-stretch bg-[#F9FAFB] border border-gray-100">
          <Text as="h3" content="Request Details" MyClass="text-lg font-semibold text-[#0F7B8A] mb-4" />
          <div className="space-y-3 text-sm">
            <div className="flex justify-between border-b border-gray-100 pb-2">
              <Text as="span" content="Request ID" MyClass="text-gray-500" />
              <Text as="span" content={request?.id ?? "#SR-2451"} MyClass="font-medium text-gray-800" />
            </div>
            <div className="flex justify-between border-b border-gray-100 pb-2">
              <Text as="span" content="Your Shift" MyClass="text-gray-500" />
              <Text as="span" content={request?.currentShift ?? "Night Shift (2 Nov 2025)"} MyClass="font-medium text-gray-800" />
            </div>
            <div className="flex justify-between border-b border-gray-100 pb-2">
              <Text as="span" content="Swap With" MyClass="text-gray-500" />
              <Text as="span" content={request?.swapWith ?? "John Doe (Morning)"} MyClass="font-medium text-gray-800" />
            </div>
            <div className="flex justify-between border-b border-gray-100 pb-2">
              <Text as="span" content="Status" MyClass="text-gray-500" />
              <Text as="span" content={request?.status ?? "Pending"} MyClass="font-medium text-yellow-600" />
            </div>
            <div className="flex justify-between border-b border-gray-100 pb-2">
              <Text as="span" content="Submitted" MyClass="text-gray-500" />
              <Text as="span" content={request?.submitted ?? "31 Oct 2025"} MyClass="font-medium text-gray-800" />
            </div>
            <div className="flex justify-between">
              <Text as="span" content="Last Update" MyClass="text-gray-500" />
              <Text as="span" content={request?.lastUpdate ?? "Awaiting Manager"} MyClass="font-medium text-gray-800" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
