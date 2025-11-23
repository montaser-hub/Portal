import { useState } from "react";
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
  const mySppinerStatus = useSelector((state) => state.loader.isLoading);
  const [pendingData, setPendingData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrors] = useState({
    nickname: "",
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
  });
  const [touched, setTouched] = useState({
    nickname: false,
    firstName: false,
    lastName: false,
    email: false,
    contactNumber: false,
  });

  /** Regex rules */
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const nameRegex = /^[A-Za-z.-]{3,}$/;
  const egyptPhoneRegex = /^01[0-2,5]{1}[0-9]{8}$/;

  const hasErrors = Object.values(errors).some((e) => e);

  /** Validation logic */
  const validateField = (name, value) => {
    const error = "";
    // Arabic input check
    if (/[ء-ي]/.test(value)) return "English Language Only";
    // Required check
    if (!value.trim()) return `${name} is required`;
    // Name validation
    if (["firstName", "lastName", "nickname"].includes(name)) {
      if (/\d/.test(value)) return "Characters Only";
      if (!nameRegex.test(value)) return "Must be at least 3 letters";
    }
    // Email validation
    if (name === "email" && !emailRegex.test(value)) return "Invalid email";

    // Phone validation
    if (name === "contactNumber") {
      if (/[A-Za-z]/.test(value)) return "Number Only";
      if (!egyptPhoneRegex.test(value)) return "Phone must be an Egyptian number";
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setPendingData((prev) => ({ ...prev, [name]: value }));

    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));

    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    setTouched((prev) => ({ ...prev, [name]: true }));

    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  const getBorderColor = (field) => {
    if (errors[field]) return "border-red-500";
    if (touched[field]) return "border-green-500";
    return "border-gray-300";
  };

  const actualChanges = Object.keys(pendingData).filter(
    (key) => pendingData[key] !== (user[key] ?? "")
  );

  /** New: handle save attempt before opening modal */
  const handleSaveAttempt = () => {
    setIsModalOpen(true);
  };

  const handleConfirmSave = async () => {
    dispatch(updateMe(pendingData))
      .unwrap()
      .then(() => {
        setPendingData({});
        setErrors({
          nickname: "",
          firstName: "",
          lastName: "",
          email: "",
          contactNumber: "",
        });
        setTouched({
          nickname: false,
          firstName: false,
          lastName: false,
          email: false,
          contactNumber: false,
        });
        setIsEditing(false);
        setIsModalOpen(false);
        toast.success("User update successfully!");
      })
      .catch((err) => {
        const msg = err.response?.data?.message || "Update failed";
        toast.error(msg);
      });
  };

  const handleCancel = () => {
    setPendingData({});
    setErrors({
      nickname: "",
      firstName: "",
      lastName: "",
      email: "",
      contactNumber: "",
    });
    setTouched({
      nickname: false,
      firstName: false,
      lastName: false,
      email: false,
      contactNumber: false,
    });
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

  return (
    <>
      {mySppinerStatus ? (
        <HeartbeatSpinner />
      ) : (
        <Card className="p-6 space-y-4 bg-white border-gray-200">
          <Text
            as="h3"
            content="Contact Information"
            MyClass="text-lg font-medium text-teal-700"
          />

          {/* Editable Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["nickname", "firstName", "lastName", "email", "contactNumber"].map(
              (field) => (
                <div key={field}>
                  <Input
                    label={
                      field === "contactNumber"
                        ? "Phone Number"
                        : field.replace(/^\w/, (c) => c.toUpperCase())
                    }
                    name={field}
                    value={pendingData[field] ?? user?.[field] ?? ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={!isEditing}
                    myClass={`border-2 ${getBorderColor(field)}`}
                  />
                  {errors[field] && touched[field] && (
                    <p className="text-sm text-red-500">{errors[field]}</p>
                  )}
                </div>
              )
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2">
            {isEditing ? (
              <>
                <Button variant="secondary" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={handleSaveAttempt}
                  disabled={hasErrors || !actualChanges.length}
                  className={`${
                    hasErrors || !actualChanges.length
                      ? "opacity-60 cursor-not-allowed"
                      : ""
                  }`}
                >
                  Save Changes
                </Button>
              </>
            ) : (
              <Button variant="primary" onClick={() => setIsEditing(true)}>
                Edit Profile
              </Button>
            )}
          </div>

          {/* Employment info */}
          <Text
            as="h4"
            content="Employment Details"
            MyClass="mt-4 text-md font-medium text-teal-700"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Department"
              value={user?.department?.name || "N/A"}
              disabled
            />
            <Input
              label="Position"
              value={user?.position?.name || "N/A"}
              disabled
            />
            <Input label="Role" value={user?.role || "N/A"} disabled />
            <Input label="Level" value={user?.level?.name || "N/A"} disabled />
            <Input label="Start Date" value={formatDate(user?.createdAt)} disabled />
          </div>
        </Card>
      )}

      {/* Confirm Save Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Text
          as="h2"
          content="Confirm Changes"
          MyClass="text-lg font-semibold mb-2 text-[#0F7B8A]"
        />
        <Text
          as="p"
          content="Are you sure you want to save these changes?"
          MyClass="text-gray-600 mb-6"
        />
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>
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
