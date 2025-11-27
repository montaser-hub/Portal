import { useState, useCallback, useMemo } from 'react';
import { validateField } from '../utils/validation';

export const useValidate = (initialState = {}) => {
  const [errors, setErrors] = useState(initialState);
  const [touched, setTouched] = useState({});

  // Validate single field
  const validateFieldHandler = useCallback((name, value, additionalData = {}) => {
    const error = validateField(name, value, additionalData);
    setErrors(prev => ({ ...prev, [name]: error }));
    return error;
  }, []);

  // Validate entire form
  const validateForm = useCallback((data) => {
    const newErrors = {};
    Object.keys(data).forEach(key => {
      const error = validateField(key, data[key], data);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, []);

  // Handle field blur
  const handleBlur = useCallback((name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
  }, []);

  // Reset validation state
  const resetValidation = useCallback(() => {
    setErrors({});
    setTouched({});
  }, []);

  // Set custom errors
  const setCustomErrors = useCallback((newErrors) => {
    setErrors(prev => ({ ...prev, ...newErrors }));
  }, []);

  // Set touched fields
  const setTouchedFields = useCallback((fields) => {
    setTouched(prev => ({ ...prev, ...fields }));
  }, []);

  const hasErrors = useMemo(
    () => Object.values(errors).some(error => Boolean(error)),
    [errors]
  );

  return {
    errors,
    touched,
    validateField: validateFieldHandler,
    validateForm,
    handleBlur,
    resetValidation,
    setCustomErrors,
    setTouched: setTouchedFields,
    hasErrors
  };
};

export default useValidate;
