'use client';

import { Control, FieldValues, Path } from 'react-hook-form';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

type TextAreaFieldProps<T extends FieldValues> = {
  className?: string;
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  formDescription?: string;
}

export default function TextAreaField<T extends FieldValues>({ className, control, name, label, placeholder, formDescription }: TextAreaFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
              <Textarea
                className={className}
                placeholder={placeholder || ''}
                {...field}
              />
          </FormControl>
          {formDescription && <FormDescription>{formDescription}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
