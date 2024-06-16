'use client';

import { Control, FieldValues, Path } from 'react-hook-form';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

type SelectFieldProps<T extends FieldValues> = {
  className?: string;
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  formDescription?: string;
  options: { label: string, value: string }[];
};

export default function SelectField<T extends FieldValues>({ className, control, name, label, placeholder, formDescription, options }: SelectFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
      <FormItem className={className} { ...field }>
        <FormLabel>{label}</FormLabel>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {options.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {formDescription && <FormDescription>{formDescription}</FormDescription>}
        <FormMessage />
      </FormItem>
      )}
    />
  );
}
