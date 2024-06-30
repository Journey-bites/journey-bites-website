'use client';

import { useState } from 'react';
import InputField from './InputField';
import type { Control, FieldValues } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';
import { InputType } from '@/types/enum';

type PasswordInputProps = {
  control: Control<FieldValues>,
  name: string,
  label?: string,
  placeholder?: string,
  formDescription?: string
}

export default function PasswordInput({ control, name, label, placeholder, formDescription }: PasswordInputProps) {
  const [passwordInputType, setPasswordInputType] = useState(InputType.PASSWORD);

  function togglePasswordInputType() {
    setPasswordInputType(passwordInputType === InputType.PASSWORD ? InputType.TEXT : InputType.PASSWORD);
  }

  return (
    <InputField
      control={control}
      name={name}
      label={label || '密碼'}
      placeholder={placeholder || '請輸入你的密碼'}
      inputType={passwordInputType}
      endIcon={passwordInputType === 'password' ? EyeOff : Eye}
      iconAction={togglePasswordInputType}
      formDescription={formDescription}
    />
  );
}