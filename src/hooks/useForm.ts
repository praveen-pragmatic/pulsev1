import { useState, useCallback } from 'react';
import { validateRequired, validateEmail, validatePhone } from '../utils/validation';
import { ERROR_MESSAGES } from '../utils/constants';

interface ValidationRules {
  required?: boolean;
  email?: boolean;
  phone?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => boolean;
}

interface FormErrors {
  [key: string]: string;
}

export const useForm = <T extends Record<string, any>>(
  initialValues: T,
  validationRules?: Record<keyof T, ValidationRules>
) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<keyof T, boolean>>({} as Record<keyof T, boolean>);

  const validate = useCallback((name: keyof T, value: any): string => {
    const rules = validationRules?.[name];
    if (!rules) return '';

    if (rules.required && !validateRequired(value)) {
      return ERROR_MESSAGES.VALIDATION.REQUIRED_FIELD;
    }

    if (rules.email && !validateEmail(value)) {
      return ERROR_MESSAGES.VALIDATION.INVALID_EMAIL;
    }

    if (rules.phone && !validatePhone(value)) {
      return ERROR_MESSAGES.VALIDATION.INVALID_PHONE;
    }

    if (rules.minLength && value.length < rules.minLength) {
      return `Minimum length is ${rules.minLength} characters`;
    }

    if (rules.maxLength && value.length > rules.maxLength) {
      return `Maximum length is ${rules.maxLength} characters`;
    }

    if (rules.pattern && !rules.pattern.test(value)) {
      return 'Invalid format';
    }

    if (rules.custom && !rules.custom(value)) {
      return 'Invalid value';
    }

    return '';
  }, [validationRules]);

  const handleChange = (name: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [name]: value }));
    setTouched(prev => ({ ...prev, [name]: true }));
    
    if (validationRules) {
      const error = validate(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (name: keyof T) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    
    if (validationRules) {
      const error = validate(name, values[name]);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({} as Record<keyof T, boolean>);
  };

  const isValid = Object.keys(errors).length === 0;

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    reset,
    isValid
  };
};