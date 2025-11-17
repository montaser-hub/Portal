import { useState} from "react";
import Text from "../../common/Text";
import Card from "../../common/Card";
import Button from "../../common/Button";
import Input from "../../common/Input";
import Modal from "../../../modals/EditProfileModal";
import { toast } from "react-hot-toast";
import { updateMe } from "../../../features/user/userThunks";
import { useSelector, useDispatch } from "react-redux";
import HeartbeatSpinner from "../../common/Spinner2";

export default function ProfileOverviewCard() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [pendingData, setPendingData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const mySppinerStatus = useSelector((state) => state.loader.isLoading);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPendingData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveAttempt = () => {
    if (Object.keys(pendingData).length === 0) {
      toast("No changes to save", { icon: "ℹ️" });
      return;
    }
    setIsModalOpen(true);
  };

  /** Save to server */
  const handleConfirmSave = async () => {
    dispatch(updateMe(pendingData))
      .unwrap()
      .then(() => {
        setPendingData({});
        setIsEditing(false);
        setIsModalOpen(false);
        toast.success('User update successfully!');
      })
      .catch((err) => {
        const msg = err.response.data.message;
        toast.error(msg);
      });
  };

  const handleCancel = () => {
    setPendingData({});
    setIsEditing(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  if (!user) {
    return <Card className="p-6">Loading user data...</Card>;
  }

  return (
    <>
      {mySppinerStatus ? <HeartbeatSpinner /> : <Card className="p-6 space-y-4 bg-white border-gray-200">
        <Text as="h3" content="Contact Information" MyClass="text-lg font-medium text-teal-700" />
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
        <Text
          as="h4"
          content="Employment Details"
          MyClass="mt-4 text-md font-medium text-teal-700"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Department" value={user?.department?.name || "N/A"} disabled />
          <Input label="Position" value={user?.position?.name || "N/A"} disabled />
          <Input label="Role" value={user?.role || "N/A"} disabled />
          <Input label="Level" value={user?.level?.name || "N/A"} disabled />
          <Input label="Start Date" name="createdAt" value={formatDate(user.createdAt)} disabled />
        </div>
      </Card>}
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
    </>
  );
}
