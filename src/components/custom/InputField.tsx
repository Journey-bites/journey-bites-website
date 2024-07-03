import type { HTMLInputTypeAttribute } from 'react';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import type { Control, FieldValues, Path } from 'react-hook-form';
import type { LucideIcon } from 'lucide-react';

type InputFieldProps<T extends FieldValues> = {
  className?: string;
  control: Control<T>;
  name: Path<T>;
  label?: string;
  inputType?: HTMLInputTypeAttribute;
  placeholder?: string;
  formDescription?: string;
  startIcon?: LucideIcon;
  endIcon?: LucideIcon;
  iconAction?: () => void;
  onBlur?: () => void;
}

export default function InputField<T extends FieldValues>({ className, control, name, label, inputType, placeholder, formDescription, startIcon, endIcon, iconAction, onBlur }: InputFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input
              className={className}
              type={inputType || 'text'}
              placeholder={placeholder || ''}
              startIcon={startIcon}
              endIcon={endIcon}
              iconAction={iconAction}
              {...field}
              onBlur={() => {
                if (onBlur) {
                  onBlur();
                }
                field.onBlur();
              }}
            />
          </FormControl>
          {formDescription && <FormDescription>{formDescription}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
