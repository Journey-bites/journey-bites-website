'use client';

import { Control, FieldValues, Path } from 'react-hook-form';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type SelectFieldProps<T extends FieldValues> = {
  className?: string;
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  isRequired?: boolean;
  formDescription?: string;
  options: { id: string, name: string }[];
};

export default function SelectField<T extends FieldValues>({ className, control, name, label, placeholder, isRequired, formDescription, options }: SelectFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
      <FormItem className={className}>
        {label && (
          <FormLabel>
            {isRequired && <span className='text-danger'> * </span>}
            {label}
          </FormLabel>
        )}
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {options.map(option => (
              <SelectItem key={option.id} value={option.name}>
                {option.name}
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
