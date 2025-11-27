import { useState, useEffect } from "react";
import { Wrench } from "lucide-react";
import Text from "../../common/Text";
import Card from "../../common/Card";
import Button from "../../common/Button";
import Input from "../../common/Input";
import Modal from "../../../modals/EditProfileModal";
import PasswordChangeModal from "../../../modals/PasswordChangeModal";
import AdminFields from "./AdminFields";
import { toast } from "react-hot-toast";
import { updateMe, updateAdmin } from "../../../features/user/userThunks";
import {
  fetchDepartments,
  fetchPositions,
  fetchLevels
} from "../../../features/inputAdmin/inputAdminThunks";
import { setFilteredLevels } from "../../../features/inputAdmin/inputAdminSlice";
import { useSelector, useDispatch } from "react-redux";
import useValidate from "../../../hooks/useValidate";
import HeartbeatSpinner from "../../common/Spinner2";

export default function ProfileOverviewCard() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const mySppinerStatus = useSelector((state) => state.loader.isLoading);
  const departments = useSelector((state) => state.inputAdmin.departments);
  const positions = useSelector((state) => state.inputAdmin.positions);
  const levels = useSelector((state) => state.inputAdmin.levels);
  const filteredLevels = useSelector((state) => state.inputAdmin.filteredLevels);

  const [pendingData, setPendingData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  // Centralized validation hook
  const { errors, touched, validateField, handleBlur, resetValidation } = useValidate();

  const isAdmin = user?.role === "admin";
  const hasErrors = Object.values(errors).some(e => e);

  // Fetch data on component load
  useEffect(() => {
    if (isAdmin) {
      dispatch(fetchDepartments());
      dispatch(fetchPositions());
      dispatch(fetchLevels());
    }
  }, [isAdmin, dispatch]);

  // Filter levels when position changes
  useEffect(() => {
    if (pendingData.position && isAdmin && levels.length > 0) {
      const localFilteredLevels = levels.filter(level => level.positionId === pendingData.position);
      dispatch(setFilteredLevels(localFilteredLevels));
    } else if (!pendingData.position && isAdmin) {
      dispatch(setFilteredLevels(levels));
    }
  }, [pendingData.position, isAdmin, dispatch, levels]);

  // Auto-set position when level is selected
  useEffect(() => {
    if (pendingData.level && isAdmin && levels.length > 0) {
      const selectedLevel = levels.find(level => level._id === pendingData.level);
      if (selectedLevel && selectedLevel.positionId) {
        setPendingData(prev => ({
          ...prev,
          position: selectedLevel.positionId
        }));

        const localFilteredLevels = levels.filter(level => level.positionId === selectedLevel.positionId);
        dispatch(setFilteredLevels(localFilteredLevels));
      }
    }
  }, [pendingData.level, isAdmin, dispatch, levels]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (value === '' && e.target.type !== 'custom-dropdown') {
      return;
    }

    setPendingData(prev => ({ ...prev, [name]: value }));
    validateField(name, value, pendingData);

    // Clear level when position changes
    if (name === 'position' && value !== pendingData.position) {
      setPendingData(prev => ({ ...prev, level: '' }));
    }
  };

  // Calculate actual changes for save button
  const actualChanges = Object.keys(pendingData).filter(
    (key) => {
      const currentValue = key === 'department'
        ? user?.department?._id
        : key === 'position'
        ? user?.position?._id
        : key === 'level'
        ? user?.level?._id
        : user[key];

      return pendingData[key] !== (currentValue ?? "");
    }
  );

  const handleSaveAttempt = () => {
    setIsModalOpen(true);
  };

  // Confirm and save changes
  const handleConfirmSave = async () => {
    const hasAdminFields = ['department', 'position', 'role', 'level'].some(
      field => pendingData[field] !== undefined
    );

    // Permission check
    if (hasAdminFields && !isAdmin) {
      toast.error("You don't have permission to update admin fields");
      setIsModalOpen(false);
      return;
    }

    if (isAdmin && hasAdminFields) {
      // Prepare admin data
      const adminData = {
        id: user._id || user.id
      };

      // Add admin fields with IDs
      if (pendingData.department) adminData.departmentId = pendingData.department;
      if (pendingData.position) adminData.positionId = pendingData.position;
      if (pendingData.level) adminData.levelId = pendingData.level;
      if (pendingData.role) adminData.role = pendingData.role;

      // Add regular fields
      if (pendingData.nickname) adminData.nickname = pendingData.nickname;
      if (pendingData.firstName) adminData.firstName = pendingData.firstName;
      if (pendingData.lastName) adminData.lastName = pendingData.lastName;
      if (pendingData.email) adminData.email = pendingData.email;
      if (pendingData.contactNumber) adminData.contactNumber = pendingData.contactNumber;

      dispatch(updateAdmin(adminData))
        .unwrap()
        .then(() => {
          resetForm();
          toast.success("Admin data updated successfully!");
        })
        .catch((err) => {
          console.error('Admin update error:', err);
          const msg = err.response?.data?.message || "Admin update failed";
          toast.error(msg);
        });
    } else {
      // Use updateMe for regular fields
      const userData = { ...pendingData };
      delete userData.department;
      delete userData.position;
      delete userData.role;
      delete userData.level;

      if (Object.keys(userData).length > 0) {
        dispatch(updateMe(userData))
          .unwrap()
          .then(() => {
            resetForm();
            toast.success("Profile updated successfully!");
          })
          .catch((err) => {
            const msg = err.response?.data?.message || "Update failed";
            toast.error(msg);
          });
      } else {
        setIsModalOpen(false);
        toast.error("No valid fields to update");
      }
    }
  };

  // Reset form state
  const resetForm = () => {
    setPendingData({});
    resetValidation();
    setIsEditing(false);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    resetForm();
  };

  // Format date for display
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
            <Button
              onClick={() => setIsPasswordModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#0F7B8A] to-[#0D6C78] text-white rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <Wrench className="h-4 w-4" />
              <Text as="span" content="Change Password" MyClass="text-sm font-medium" />
            </Button>
          </div>

          {/* Regular user fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["nickname", "firstName", "lastName", "email", "contactNumber"].map(
              (field) => (
                <Input
                  key={field}
                  label={
                    field === "contactNumber"
                      ? "Phone Number"
                      : field.replace(/^\w/, (c) => c.toUpperCase())
                  }
                  name={field}
                  value={pendingData[field] ?? user?.[field] ?? ""}
                  onChange={handleChange}
                  onBlur={() => handleBlur(field)}
                  error={errors[field]}
                  touched={touched[field]}
                  disabled={!isEditing}
                />
              )
            )}
          </div>

          {/* Action buttons */}
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

          {/* Admin-only fields */}
          <AdminFields
  departments={departments}
  positions={positions}
  levels={filteredLevels.length > 0 ? filteredLevels : levels}
  userData={user} // ✅ إضافة بيانات المستخدم
  pendingData={pendingData}
  errors={errors}
  touched={touched}
  isEditing={isEditing}
  isAdmin={isAdmin}
  onChange={handleChange}
  onBlur={handleBlur}
/>

          {/* Additional employment info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Start Date"
              value={formatDate(user?.createdAt)}
              disabled
            />
          </div>
        </Card>
      )}

      {/* Confirmation modal */}
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

      <PasswordChangeModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
    </>
  );
}
