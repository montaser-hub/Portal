import React, { useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import  SwapRequestForm  from "../components/pageComponents/swapRequestPage/SwapRequestForm";
import  SwapRequestStatus  from "../components/pageComponents/swapRequestPage/SwapRequestStatus";
import  SwapRequestHistory  from "../components/pageComponents/swapRequestPage/SwapRequestHistory";
import Text from "../components/common/Text";

export default function SwapRequestPage() {
  const [activeTab, setActiveTab] = useState("request");
  const [formData, setFormData] = useState({});
  const [selectedRequest, setSelectedRequest] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log("Submit:", formData);
    // منطق الإرسال هنا
  };

  return (
        <div className="min-h-screen bg-gray-50 p-6">

      <div className="max-w-5xl mx-auto mb-8">
        <Text
          as="h1"
          content="Swap Request"
          MyClass={`text-3xl font-semibold text-[#0F7B8A] mb-2`}
        />
        <Text
          as="p"
          content="Manage your shift swap requests and track approval progress."
          MyClass="text-gray-600"
        />
      </div>
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-6">
      <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
        <Tabs.List className="flex space-x-6 border-b border-gray-200 mb-4">
        {["request", "status", "history", "received"].map((tab) => (
                      <Tabs.Trigger
                        key={tab}
                        value={tab}
                        className={`pb-2 text-sm font-medium ${
                          activeTab === tab
                            ? `border-b-2 border-[#0F7B8A] text-[#0F7B8A]`
                            : "text-gray-500 hover:text-[#0F7B8A]"
                        }`}
                      >
                        {tab === "request"
                          ? "New Request"
                          : tab === "status"
                          ? "Request Status"
                          : tab === "history"
                          ? "Requests History"
                          : "Received Requests History"}
                      </Tabs.Trigger>
                    ))}
        </Tabs.List>

        <Tabs.Content value="request">
          <SwapRequestForm
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        </Tabs.Content>

        <Tabs.Content value="status">
          <SwapRequestStatus request={selectedRequest} />
        </Tabs.Content>

        <Tabs.Content value="history">
          <SwapRequestHistory />
        </Tabs.Content>
        <Tabs.Content value="received">
              <div className="text-gray-600">
                <Text as="p" content="No past swap requests found." />
              </div>
        </Tabs.Content>
      </Tabs.Root>
        </div>
    </div>
  );
}
