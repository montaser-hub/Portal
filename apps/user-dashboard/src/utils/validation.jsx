
// Centralized validation system
export const validators = {
  // No spaces allowed validator
  noSpaces: (value, fieldName) => {
    if (!value || !value.trim()) {
      return `${fieldName} is required`;
    }
    if (/\s/.test(value)) {
      return "Spaces are not allowed in this field";
    }
    if (/[ء-ي]/.test(value)) {
      return 'English characters only';
    }
    return '';
  },

  // Name validator (spaces in middle only)
  name: (value, fieldName) => {
    if (!value || !value.trim()) {
      return `${fieldName} is required`;
    }
    if (/^\s/.test(value) || /\s$/.test(value)) {
      return "Spaces in middle only";
    }
    if (/[ء-ي]/.test(value)) {
      return 'English characters only';
    }
    if (/\d/.test(value)) return 'Name cannot contain numbers';
    if (value.trim().length < 2) return 'Name must be at least 2 characters';
    if (!/^[A-Za-z.\s-]+$/.test(value)) {
      return 'Name can only contain letters, spaces, dots and hyphens';
    }
    return '';
  },

  // Email validator
  email: (value) => {
    if (!value || !value.trim()) {
      return 'Email is required';
    }
    if (/\s/.test(value)) {
      return "Spaces are not allowed in this field";
    }
    if (/[ء-ي]/.test(value)) {
      return 'English characters only';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return 'Please enter a valid email address';
    }
    return '';
  },

  // Phone number validator
  contactNumber: (value) => {
    if (!value || !value.trim()) {
      return 'Phone number is required';
    }
    if (/\s/.test(value)) {
      return "Spaces are not allowed in this field";
    }
    if (/[ء-ي]/.test(value)) {
      return 'English characters only';
    }
    const cleanValue = value.replace(/\s/g, '');
    if (/[A-Za-z]/.test(cleanValue)) return 'Phone number must contain numbers only';
    if (!/^\d+$/.test(cleanValue)) return 'Phone number must contain numbers only';
    if (cleanValue.length !== 11) return 'Egyptian phone number must be 11 digits';
    if (!cleanValue.startsWith('01')) return 'Egyptian phone number must start with 01';
    if (!/^01[0125]/.test(cleanValue)) {
      return 'Invalid Egyptian phone operator';
    }
    return '';
  },

  // Password validator
  password: (value) => {
    if (!value || !value.trim()) {
      return 'Password is required';
    }
    if (/\s/.test(value)) {
      return "Spaces are not allowed in this field";
    }
    if (/[ء-ي]/.test(value)) {
      return 'English characters only';
    }
    if (value.length < 8) {
      return 'Password must be at least 8 characters';
    }
    if (!/(?=.*[a-z])/.test(value)) {
      return 'Password must contain at least one lowercase letter';
    }
    if (!/(?=.*[A-Z])/.test(value)) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!/(?=.*\d)/.test(value)) {
      return 'Password must contain at least one number';
    }
    if (!/(?=.*[@$!%*?&])/.test(value)) {
      return 'Password must contain at least one special character (@$!%*?&)';
    }
    return '';
  },

  // Confirm password validator
  confirmPassword: (password, confirmPassword) => {
    if (!confirmPassword) {
      return 'Please confirm your password';
    }
    if (/\s/.test(confirmPassword)) {
      return "Spaces are not allowed in this field";
    }
    if (/[ء-ي]/.test(confirmPassword)) {
      return 'English characters only';
    }
    if (password !== confirmPassword) {
      return 'Passwords do not match';
    }
    return '';
  },

  // Required field validator
  required: (value, fieldName) => {
    if (!value || !value.trim()) {
      return `${fieldName} is required`;
    }
    return '';
  }
};

// Main validation function
export const validateField = (name, value, additionalData = {}) => {
  const fieldName = name.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());

  switch (name) {
    case 'firstName':
    case 'lastName':
      return validators.name(value, fieldName);

    case 'nickname':
    case 'email':
    case 'password':
    case 'confirmPassword':
      return validators.noSpaces(value, fieldName);

    case 'contactNumber':
      return validators.contactNumber(value);

    case 'department':
    case 'position':
    case 'role':
    case 'level':
      return validators.required(value, fieldName);

    default:
      if (additionalData.customError) {
        return additionalData.customError;
      }
      return validators.text(value, fieldName);
  }
};
