// PasswordChangeModal.jsx
import { useState } from "react";
import { Eye, EyeOff, Wrench } from "lucide-react";
import Modal from "./EditProfileModal";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { updateUserPass } from "../features/user/userThunks";
import { useAuth } from "../hooks/useAuth";
import Text from "../components/common/Text";

export default function PasswordChangeModal({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const { logout } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [touched, setTouched] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

  const handleCurrentPasswordChange = (e) => {
    const value = e.target.value;
    if (/[ء-ي]/.test(value)) return;

    setCurrentPassword(value);
    setTouched((p) => ({ ...p, currentPassword: true }));
    setErrors((p) => ({
      ...p,
      currentPassword: value.length === 0 ? "Current password is required" : "",
    }));
  };

  const handleNewPasswordChange = (e) => {
    const value = e.target.value;
    if (/[ء-ي]/.test(value)) return;

    setNewPassword(value);
    setTouched((p) => ({ ...p, newPassword: true }));

    setErrors((p) => ({
      ...p,
      newPassword:
        value.length === 0
          ? "New password is required"
          : !passwordRegex.test(value)
          ? "Must include uppercase, lowercase, number, special char, and 8+ chars"
          : "",
      confirmPassword:
        confirmPassword && value !== confirmPassword
          ? "Passwords do not match"
          : "",
    }));
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    if (/[ء-ي]/.test(value)) return;

    setConfirmPassword(value);
    setTouched((p) => ({ ...p, confirmPassword: true }));

    setErrors((p) => ({
      ...p,
      confirmPassword:
        value.length === 0
          ? "Please confirm your password"
          : value !== newPassword
          ? "Passwords do not match"
          : "",
    }));
  };

  const getBorderColor = (field) => {
    const error = errors[field];
    const isTouched = touched[field];
    const values = {
      currentPassword,
      newPassword,
      confirmPassword,
    };
    const value = values[field];

    if (!isTouched) return "border-gray-300";
    if (error) return "border-red-500";
    if (value && !error) return "border-green-500";
    return "border-gray-300";
  };

  const handleSubmit = () => {
    const hasErrors = Object.values(errors).some((e) => e);
    const hasEmptyFields = !currentPassword || !newPassword || !confirmPassword;

    if (!hasErrors && !hasEmptyFields) {
      const passwordData = {
        currentPassword: currentPassword,
        newPassword: newPassword,
        confirmPassword: confirmPassword,
      };

      dispatch(updateUserPass(passwordData))
        .unwrap()
        .then(() => {
          toast.success("Password changed successfully!");
          handleReset();
          onClose();
          logout();
        })
        .catch((err) => {
          const msg = err.response?.data?.message || "Failed to change password";
          toast.error(msg);
        });
    }
  };

  const handleReset = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setErrors({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setTouched({
      currentPassword: false,
      newPassword: false,
      confirmPassword: false,
    });
    setShowPasswords({
      current: false,
      new: false,
      confirm: false,
    });
  };

  const handleCancel = () => {
    handleReset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleCancel}>
      <div className="space-y-6">
        {/* Header with Icon */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-[#0F7B8A] flex items-center justify-center shadow-md">
            <Wrench className="h-6 w-6 text-white" />
          </div>
          <div>
            <Text as="h2" content="Change Password" MyClass="text-xl font-semibold text-[#0F7B8A]" />
            <Text as="p" content="Update your account password" MyClass="text-sm text-gray-500" />
          </div>
        </div>

        {/* Current Password */}
        <div className="space-y-2">
          <div className="relative">
            <Input
              label="Current Password"
              type={showPasswords.current ? "text" : "password"}
              value={currentPassword}
              onChange={handleCurrentPasswordChange}
              placeholder="Enter current password"
              myClass={`border-2 ${getBorderColor("currentPassword")} pr-12`}
            />
            {currentPassword && (
              <button
                type="button"
                onClick={() =>
                  setShowPasswords((p) => ({ ...p, current: !p.current }))
                }
                className="absolute right-3 top-[2.6rem] transform -translate-y-1/2 focus:outline-none"
              >
                {showPasswords.current ? (
                  <Eye className="h-5 w-5 text-[#0F7B8A]" />
                ) : (
                  <EyeOff className="h-5 w-5 text-[#0F7B8A]" />
                )}
              </button>
            )}
          </div>
          {errors.currentPassword && touched.currentPassword && (
            <Text as="p" content={errors.currentPassword} MyClass="text-sm text-red-500" />
          )}
        </div>

        {/* New Password */}
        <div className="space-y-2">
          <div className="relative">
            <Input
              label="New Password"
              type={showPasswords.new ? "text" : "password"}
              value={newPassword}
              onChange={handleNewPasswordChange}
              placeholder="Enter new password"
              myClass={`border-2 ${getBorderColor("newPassword")} pr-12`}
            />
            {newPassword && (
              <Button
                onClick={() =>
                  setShowPasswords((p) => ({ ...p, new: !p.new }))
                }
                className="absolute right-3 top-[2.6rem] transform -translate-y-1/2 focus:outline-none"
              >
                {showPasswords.new ? (
                  <Eye className="h-5 w-5 text-[#0F7B8A]" />
                ) : (
                  <EyeOff className="h-5 w-5 text-[#0F7B8A]" />
                )}
              </Button>
            )}

          </div>
          {errors.newPassword && touched.newPassword && (
            <Text as="p" content={errors.newPassword} MyClass="text-sm text-red-500" />
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <div className="relative">
            <Input
              label="Confirm New Password"
              type={showPasswords.confirm ? "text" : "password"}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              placeholder="Re-enter new password"
              myClass={`border-2 ${getBorderColor("confirmPassword")} pr-12`}
            />
            {confirmPassword && (
              <Button
                onClick={() =>
                  setShowPasswords((p) => ({ ...p, confirm: !p.confirm }))
                }
                className="absolute right-3 top-[2.6rem] transform -translate-y-1/2 focus:outline-none"
              >
                {showPasswords.confirm ? (
                  <Eye className="h-5 w-5 text-[#0F7B8A]" />
                ) : (
                  <EyeOff className="h-5 w-5 text-[#0F7B8A]" />
                )}
              </Button>
            )}
          </div>
          {errors.confirmPassword && touched.confirmPassword && (
            <Text as="p" content={errors.confirmPassword} MyClass="text-sm text-red-500" />
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleSubmit();
            }}
            disabled={
              !currentPassword ||
              !newPassword ||
              !confirmPassword ||
              Object.values(errors).some((e) => e)
            }
            className={`bg-[#0F7B8A] hover:bg-[#0D6C78] text-white ${
              !currentPassword ||
              !newPassword ||
              !confirmPassword ||
              Object.values(errors).some((e) => e)
                ? "opacity-60 cursor-not-allowed"
                : ""
            }`}
          >
            Change Password
          </Button>
        </div>
      </div>
    </Modal>
  );
}
