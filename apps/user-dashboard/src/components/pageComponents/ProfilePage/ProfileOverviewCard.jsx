/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Text from "../../common/Text";
import Card from "../../common/Card";
import Button from "../../common/Button";
import Input from "../../common/Input";
import Modal from "../../../modals/EditProfileModal";
import { toast } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import HeartbeatSpinner from "../../common/Spinner2";
import { updateMe } from "../../../features/user/userSlice";

export default function ProfileOverviewCard({ currentUser, onSave }) {
  const [user, setUser] = useState(currentUser || {});
  const [pendingData, setPendingData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const mySppinerStatus = useSelector((state) => state.loader.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser && currentUser !== user) {
        setUser(currentUser);
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPendingData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveAttempt = () => setIsModalOpen(true);

  const handleConfirmSave = async () => {
    setIsModalOpen(false);
    try {
      await dispatch(updateMe(pendingData)).unwrap();
      setPendingData({});
      setIsEditing(false);
      toast.success("Changes saved successfully!");
    } catch (error) {
        toast.error(error.message || "Failed to save changes");
    }
  };

  const handleCancel = () => {
    setPendingData({});
    setIsEditing(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric', month: 'short', day: 'numeric'
        });
    } catch {
        return dateString;
    }
  };

  const isDataPending = Object.keys(pendingData).length > 0;

  return (
    <>
      {mySppinerStatus ? (
        <HeartbeatSpinner />
      ) : (
        <Card className="p-6 bg-white border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <Text
              as="h3"
              content="Profile Information"
              MyClass="text-xl font-semibold text-[#0F7B8A]"
            />
            {isEditing ? (
              <div className="flex gap-2">
                <Button variant="secondary" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button onClick={handleSaveAttempt} disabled={!isDataPending}>
                  Save Changes
                </Button>
              </div>
            ) : (
              <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="First Name"
              name="firstName"
              value={pendingData.firstName ?? user.firstName}
              onChange={handleChange}
              disabled={!isEditing}
            />
            <Input
              label="Last Name"
              name="lastName"
              value={pendingData.lastName ?? user.lastName}
              onChange={handleChange}
              disabled={!isEditing}
            />
            <Input
              label="Email"
              name="email"
              value={pendingData.email ?? user.email}
              onChange={handleChange}
              disabled={!isEditing}
            />
            <Input
              label="Phone"
              name="phone"
              value={pendingData.phone ?? user.phone}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <Text
            as="h3"
            content="Employment Details"
            MyClass="mt-6 mb-6 text-md font-medium text-xl font-semibold text-[#0F7B8A]"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Department" value={user?.department?.name || "N/A"} disabled />
            <Input label="Position" value={user?.position?.name || "N/A"} disabled />
            <Input label="Role" value={user?.role || "N/A"} disabled />
            <Input label="Level" value={user?.level?.name || "N/A"} disabled />
            <Input label="Start Date" name="createdAt" value={formatDate(user.createdAt)} disabled />
          </div>
        </Card>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Text as="h2" content="Confirm Changes" MyClass="text-lg font-semibold mb-2 text-[#0F7B8A]" />
        <Text as="p" content="Are you sure you want to save these changes?" MyClass="text-gray-600 mb-6" />
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
          <Button
            onClick={handleConfirmSave}
            className="bg-[#0F7B8A] hover:bg-[#0F7B8A]/90 transition"
          >
            Confirm Save
          </Button>
        </div>
      </Modal>
    </>
  );
}
