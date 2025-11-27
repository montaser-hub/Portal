import Input from "../../common/Input";
import Text from "../../common/Text";

export default function AdminFields({
  departments = [],
  positions = [],
  levels = [],
  roles = ['user', 'manager', 'admin'],
  pendingData = {},
  userData = {},
  errors = {},
  touched = {},
  isEditing = false,
  isAdmin = false,
  onChange,
  onBlur
}) {
  // Get current values from user data or pending data
  const getCurrentValue = (field) => {
    return pendingData[field] ??
           (field === 'department' ? (userData?.department?._id || "") :
            field === 'position' ? (userData?.position?._id || "") :
            field === 'level' ? (userData?.level?._id || "") :
            field === 'role' ? (userData?.role || "") :
            (userData?.[field] || ""));
  };

  // Get display value for read-only mode
  const getDisplayValue = (field) => {
    return field === 'department' ? (userData?.department?.name || "N/A") :
           field === 'position' ? (userData?.position?.name || "N/A") :
           field === 'level' ? (userData?.level?.name || "N/A") :
           field === 'role' ? (userData?.role ? userData.role.charAt(0).toUpperCase() + userData.role.slice(1) : "N/A") :
           "N/A";
  };

  // Non-admin view
  if (!isAdmin) {
    return (
      <>
        <Text
          as="h4"
          content="Employment Details"
          MyClass="mt-4 text-md font-medium text-teal-700"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Department"
            value={getDisplayValue('department')}
            disabled
          />
          <Input
            label="Position"
            value={getDisplayValue('position')}
            disabled
          />
          <Input
            label="Role"
            value={getDisplayValue('role')}
            disabled
          />
          <Input
            label="Level"
            value={getDisplayValue('level')}
            disabled
          />
        </div>
      </>
    );
  }

  // Admin view with editable fields
  return (
    <>
      <Text
        as="h4"
        content="Employment Details (Admin Only)"
        MyClass="mt-4 text-md font-medium text-teal-700"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          type="custom-dropdown"
          label="Department"
          name="department"
          value={getCurrentValue('department')}
          options={departments}
          onChange={onChange}
          onBlur={onBlur}
          error={errors.department}
          touched={touched.department}
          disabled={!isEditing}
        />

        <Input
          type="custom-dropdown"
          label="Position"
          name="position"
          value={getCurrentValue('position')}
          options={positions}
          onChange={onChange}
          onBlur={onBlur}
          error={errors.position}
          touched={touched.position}
          disabled={!isEditing}
        />

        <Input
          type="custom-dropdown"
          label="Role"
          name="role"
          value={getCurrentValue('role')}
          options={roles.map(role => ({
            _id: role,
            name: role.charAt(0).toUpperCase() + role.slice(1)
          }))}
          onChange={onChange}
          onBlur={onBlur}
          error={errors.role}
          touched={touched.role}
          disabled={!isEditing}
        />

        <Input
          type="custom-dropdown"
          label="Level"
          name="level"
          value={getCurrentValue('level')}
          options={levels}
          onChange={onChange}
          onBlur={onBlur}
          error={errors.level}
          touched={touched.level}
          disabled={!isEditing}
          myClass={levels.length === 0 && !getCurrentValue('position') ? "border-orange-300" : ""}
        />
      </div>

      {/* Help messages */}
      {levels.length === 0 && isEditing && !getCurrentValue('position') && (
        <Text
          as="p"
          content="Please select a position first to see available levels"
          MyClass="text-sm text-orange-500 mt-2"
        />
      )}

      {levels.length === 0 && isEditing && getCurrentValue('position') && (
        <Text
          as="p"
          content="No levels available for the selected position"
          MyClass="text-sm text-orange-500 mt-2"
        />
      )}
    </>
  );
}
