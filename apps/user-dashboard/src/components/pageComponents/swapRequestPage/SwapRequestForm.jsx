import React from "react";
import Text from "../../common/Text";
import { Input } from "../../common/Input";
import Button from "../../common/Button";

export default function SwapRequestForm({ formData, onChange, onSubmit }) {
  return (
    <div className="space-y-4">
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm">
        <Text as="h2" content="Step 1: Create Swap Request" MyClass="text-lg font-medium text-[#0F7B8A] mb-2" />
        <Text as="p" content="Fill in the details below to initiate a swap." MyClass="text-sm text-gray-600 mb-4" />
        <form className="space-y-4">
          <Input
            label="Your Current Shift"
            name="currentShift"
            placeholder="e.g., Night Shift - 2 Nov 2025"
            value={formData.currentShift}
            onChange={onChange}
            myClass="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#0F7B8A]"
          />
          <Input
            label="Swap With"
            name="swapWith"
            placeholder="e.g., John Doe - Morning Shift"
            value={formData.swapWith}
            onChange={onChange}
            myClass="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#0F7B8A]"
          />
          <Button onClick={onSubmit}>Submit Request</Button>
        </form>
      </div>
    </div>
  );
}
