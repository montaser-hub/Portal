import { useState } from "react";
import { Wrench } from "lucide-react";
import Modal from "./EditProfileModal";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { updateUserPass } from "../features/user/userThunks";
import { useAuth } from "../hooks/useAuth";
import Text from "../components/common/Text";
import useValidate from "../hooks/useValidate";

export default function PasswordChangeModal({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const { logout } = useAuth();

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  // Centralized validation hook
  const { errors, touched, validateField, handleBlur, resetValidation } = useValidate();

  // Handle input changes with validation
  const handleInputChange = (field) => (e) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, [field]: value }));

    // Validate field with additional data if needed
    if (field === 'newPassword') {
      validateField('password', value);
      if (formData.confirmPassword) {
        validateField('confirmPassword', formData.confirmPassword, { password: value });
      }
    } else if (field === 'confirmPassword') {
      validateField('confirmPassword', value, { password: formData.newPassword });
    } else {
      validateField('currentPassword', value);
    }
  };

  // Submit password change
  const handleSubmit = () => {
    // Final validation before submission
    const currentPasswordError = validateField('currentPassword', formData.currentPassword);
    const newPasswordError = validateField('password', formData.newPassword);
    const confirmPasswordError = validateField('confirmPassword', formData.confirmPassword, {
      password: formData.newPassword
    });

    const hasErrors = currentPasswordError || newPasswordError || confirmPasswordError;
    const hasEmptyFields = !formData.currentPassword || !formData.newPassword || !formData.confirmPassword;

    if (!hasErrors && !hasEmptyFields) {
      setIsLoading(true);

      const passwordData = {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword,
      };

      dispatch(updateUserPass(passwordData))
        .unwrap()
        .then(() => {
          toast.success("Password changed successfully!");
          handleReset();
          onClose();
          setTimeout(() => {
            logout();
          }, 1000);
        })
        .catch((err) => {
          const msg = err.response?.data?.message || "Failed to change password";
          toast.error(msg);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  // Reset form and validation
  const handleReset = () => {
    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
    resetValidation();
    setShowPasswords({
      current: false,
      new: false,
      confirm: false,
    });
  };

  // Handle modal cancel
  const handleCancel = () => {
    handleReset();
    onClose();
  };

  // Submit button disabled state
  const isSubmitDisabled =
    !formData.currentPassword ||
    !formData.newPassword ||
    !formData.confirmPassword ||
    errors.currentPassword ||
    errors.password ||
    errors.confirmPassword ||
    isLoading;

  return (
    <Modal isOpen={isOpen} onClose={handleCancel}>
      <div className="space-y-6">
        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-[#0F7B8A] flex items-center justify-center shadow-md">
            <Wrench className="h-6 w-6 text-white" />
          </div>
          <div>
            <Text as="h2" content="Change Password" className="text-xl font-semibold text-[#0F7B8A]" />
            <Text as="p" content="Update your account password" className="text-sm text-gray-500" />
          </div>
        </div>

        {/* Current Password Input */}
        <div className="space-y-2">
          <Input
            label="Current Password"
            name="currentPassword"
            type={showPasswords.current ? "text" : "password"}
            value={formData.currentPassword}
            onChange={handleInputChange('currentPassword')}
            onBlur={() => handleBlur('currentPassword')}
            placeholder="Enter current password"
            error={errors.currentPassword}
            touched={touched.currentPassword}
          />
        </div>

        {/* New Password Input */}
        <div className="space-y-2">
          <Input
            label="New Password"
            name="password"
            type={showPasswords.new ? "text" : "password"}
            value={formData.newPassword}
            onChange={handleInputChange('newPassword')}
            onBlur={() => handleBlur('password')}
            placeholder="Enter new password"
            error={errors.password}
            touched={touched.password}
          />
        </div>

        {/* Confirm Password Input */}
        <div className="space-y-2">
          <Input
            label="Confirm New Password"
            name="confirmPassword"
            type={showPasswords.confirm ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={handleInputChange('confirmPassword')}
            onBlur={() => handleBlur('confirmPassword')}
            placeholder="Re-enter new password"
            error={errors.confirmPassword}
            touched={touched.confirmPassword}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <Button
            variant="secondary"
            onClick={handleCancel}
            disabled={isLoading}
            className="px-6 py-2"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={isSubmitDisabled}
            isLoading={isLoading}
            className="px-6 py-2 bg-[#0F7B8A] hover:bg-[#0D6C78] text-white"
          >
            Change Password
          </Button>
        </div>
      </div>
    </Modal>
  );
}
