import React, { useState, useEffect } from "react";
import Text from "../../common/Text";
import Card from "../../common/Card";
import Button from "../../common/Button";
import Input from "../../common/Input";
import Modal from "../../../modals/EditProfileModal";
import { Toaster, toast } from "react-hot-toast";
import { getMe, updateMe } from "../../../services/API-Services/UserService";

export default function ProfileOverviewCard({ currentUser, onSave }) {
  const [user, setUser] = useState(currentUser || {});
  const [pendingData, setPendingData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  /** ✅ Load user data on mount */
  useEffect(() => {
    getMe()
      .then((data) => setUser(data))
      .catch(() => toast.error("Failed to load user data"));
  }, []);

  /** ✅ Update pending changes only */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setPendingData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // لا نلمس user إطلاقًا الآن
  };

  /** ✅ Ask user to confirm save */
  const handleSaveAttempt = () => {
    if (Object.keys(pendingData).length === 0) {
      toast("No changes to save", { icon: "ℹ️" });
      return;
    }
    setIsModalOpen(true);
  };

  /** ✅ Save to server */
  const handleConfirmSave = async () => {
    updateMe(pendingData)
      .then((updatedUser) => {
        // ندمج فقط البيانات المعدلة داخل user
        setUser((prev) => ({
          ...prev,
          ...pendingData,
        }));

        setPendingData({});
        setIsEditing(false);
        setIsModalOpen(false);

        onSave?.(updatedUser);
        toast.success("Changes saved successfully!");
      })
      .catch(() => toast.error("Failed to save changes"));
  };

  /** ✅ Cancel editing */
  const handleCancel = () => {
    setPendingData({});
    setIsEditing(false);
  };

  return (
    <>
      <Card className="p-6 space-y-4 bg-white border-gray-200">
        {/* ✅ Title */}
        <Text as="h3" content="Contact Information" MyClass="text-lg font-medium" />

        {/* ✅ Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="First Name"
            name="firstName"
            value={pendingData.firstName ?? user.firstName ?? ""}
            onChange={handleChange}
            disabled={!isEditing}
          />

          <Input
            label="Last Name"
            name="lastName"
            value={pendingData.lastName ?? user.lastName ?? ""}
            onChange={handleChange}
            disabled={!isEditing}
          />

          <Input
            label="Email"
            name="email"
            value={pendingData.email ?? user.email ?? ""}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>

        {/* ✅ Buttons */}
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

        {/* ✅ Employment Information */}
        <Text
          as="h4"
          content="Employment Details"
          MyClass="mt-4 text-md font-medium"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Department" value={user?.department?.name || "N/A"} disabled />
          <Input label="Position" value={user?.position?.name || "N/A"} disabled />
          <Input label="Role" value={user?.role || "N/A"} disabled />
          <Input label="Level" value={user?.level?.name || "N/A"} disabled />
        </div>
      </Card>

      {/* ✅ Save Confirmation Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Text as="h2" content="Confirm Changes" MyClass="text-lg font-semibold mb-2 text-[#0F7B8A]" />
        <Text as="p" content="Are you sure you want to save these changes?" MyClass="text-gray-600 mb-6" />

        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
          <Button
            className="bg-[#0F7B8A] hover:bg-[#0F7B8A]/90 text-white"
            onClick={handleConfirmSave}
          >
            Confirm Save
          </Button>
        </div>
      </Modal>

      <Toaster />
    </>
  );
}
