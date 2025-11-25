import { useState } from "react";
import { Wrench } from "lucide-react";
import Text from "../../common/Text";
import Card from "../../common/Card";
import Button from "../../common/Button";
import Input from "../../common/Input";
import Modal from "../../../modals/EditProfileModal";
import PasswordChangeModal from "../../../modals/PasswordChangeModal";
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
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
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

  const hasErrors = Object.values(errors).some((e) => e);

  const validateField = (name, value) => {
    if (!value || !value.trim()) {
      const fieldNames = {
        nickname: 'Nickname',
        firstName: 'First Name',
        lastName: 'Last Name',
        email: 'Email',
        contactNumber: 'Phone Number'
      };
      return `${fieldNames[name]} is required`;
    }

    /* SPACE VALIDATION */
    if (["firstName", "lastName"].includes(name)) {
      if (/^\s/.test(value) || /\s$/.test(value)) {
        return "Using space in middle only";
      }
    }
    if (!["firstName", "lastName"].includes(name)) {
      if (/\s/.test(value)) {
        return "Spaces are not allowed in this field";
      }
    }

    /* Arabic characters */
    if (/[ء-ي]/.test(value)) {
      return 'English characters only';
    }

    /* Name Validation */
    if (['firstName', 'lastName', 'nickname'].includes(name)) {
      if (/\d/.test(value)) return 'Name cannot contain numbers';
      if (value.trim().length < 2) return 'Name must be at least 2 characters';
      if (!/^[A-Za-z.\s-]+$/.test(value))
        return 'Name can only contain letters, spaces, dots and hyphens';
    }

    /* Email validation */
    if (name === 'email') {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return 'Please enter a valid email address (example@domain.com)';
      }
    }

    /* Contact Number validation */
    if (name === 'contactNumber') {
      const cleanValue = value.replace(/\s/g, '');
      if (/[A-Za-z]/.test(cleanValue)) return 'Phone number must contain numbers only';
      if (!/^\d+$/.test(cleanValue)) return 'Phone number must contain numbers only';
      if (cleanValue.length !== 11) return 'Egyptian phone number must be 11 digits';
      if (!cleanValue.startsWith('01')) return 'Egyptian phone number must start with 01';
      if (!/^01[0125]/.test(cleanValue)) {
        return 'Invalid Egyptian phone operator (must be 010, 011, 012, or 015)';
      }
    }

    return '';
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
          <div className="flex items-center justify-between">
            <Text
              as="h3"
              content="Contact Information"
              MyClass="text-lg font-medium text-teal-700"
            />
            {/* Password Change Button */}
            <Button
              onClick={() => setIsPasswordModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#0F7B8A] to-[#0D6C78] text-white rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <Wrench className="h-4 w-4" />
              <Text as="span" content="Change Password" MyClass="text-sm font-medium" />
            </Button>
          </div>

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
                    <Text as="p" content={errors[field]} MyClass="text-sm text-red-500" />
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
            variant="primary"
            className="bg-[#0F7B8A] hover:bg-[#0F7B8A]/90 text-white"
            onClick={handleConfirmSave}
          >
            Confirm Save
          </Button>
        </div>
      </Modal>

      {/* Password Change Modal */}
      <PasswordChangeModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
    </>
  );
}
