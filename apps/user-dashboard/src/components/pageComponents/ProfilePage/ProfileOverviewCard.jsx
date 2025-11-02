import React, { useState } from "react";
import Text from "../../common/Text";
import Card from "../../common/Card";
import Button from "../../common/Button";
import Input from "../../common/Input";
import { Toaster, toast } from "react-hot-toast";
import Modal from "../../../modals/EditProfileModal";

export default function ProfileOverviewCard({ currentUser, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState({ ...currentUser });
  const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });
  const handleSaveAttempt = () => setIsModalOpen(true);
  const handleConfirmSave = () => {
    console.log("✅ Saving changes confirmed:", data);
    onSave(data);
    setIsEditing(false);
    setIsModalOpen(false);
    toast.success("Changes saved successfully!", {
      duration: 3000,
      position: "top-right",
    });
  };

  const handleCancel = () => {
    setData({ ...currentUser });
    setIsEditing(false);
  };

  const handleCloseModal = () => setIsModalOpen(false);


  return (
    <>
      <Card className="p-6 space-y-4 bg-white border-gray-200">
        <Text as="h3" content="Contact Information" MyClass="text-lg font-medium" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            name="name"
            type="text"
            value={data.name}
            onChange={handleChange}
            disabled={!isEditing}
          />
          <Input
            label="Email"
            name="email"
            type="email"
            value={data.email}
            onChange={handleChange}
            disabled={!isEditing}
          />
          <Input
            label="Phone"
            name="phone"
            type="tel"
            value={data.phone}
            onChange={handleChange}
            disabled={!isEditing}
          />
          <Input
            label="Date of Birth"
            name="dateOfBirth"
            type="date"
            value={data.dateOfBirth}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
        <div className="flex justify-end gap-2">
          {isEditing ? (
            <>
              <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
              <Button onClick={handleSaveAttempt}>Save Changes</Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
          )}
        </div>
        <Text as="h4" content="Employment Details" MyClass="mt-4 text-md font-medium" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Department" value={data.departmentName} disabled />
          <Input label="Department ID" value={data.departmentId} disabled />
          <Input label="Role" value={data.role} disabled />
          <Input label="Staff Level" value={data.level} disabled />
        </div>
      </Card>
      {/* استخدام المودال العام */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <Text
          as="h2"
          content="Confirm Changes"
          MyClass="text-lg font-semibold mb-2 text-[#0F7B8A]"
        />
        <Text
          as="p"
          content="Are you sure you want to save the changes to your contact information?"
          MyClass="text-gray-600 mb-6"
        />
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
          <Button className="bg-[#0F7B8A] hover:bg-[#0F7B8A]/90 text-white" onClick={handleConfirmSave}>
            Confirm Save
          </Button>
        </div>
      </Modal>
      <Toaster />
    </>
  );
}
