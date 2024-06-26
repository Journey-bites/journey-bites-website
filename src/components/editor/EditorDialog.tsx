import { cn } from '@/lib/utils';
import { useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useDialog } from '@/stores/useDialogStore';
import { imgUrlValidate } from '@/constants/imgUrlValidate';

interface DialogComponentProps {
  handleDialog: (url: string) => void;
}

export function DialogComponent({ handleDialog }: DialogComponentProps ) {
  const { isOpen, onClose, onOpen, data, setData } = useDialog();
  const [isValid, setIsValid] = useState(false);
  const handleButtonClick = () => {
    if(isOpen) return onClose();
    onOpen();
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;;
    const validationErrors = imgUrlValidate(url);

    if (validationErrors) {
      console.error('Validation errors:', validationErrors);
    } else {
      setIsValid(true);
      setData({ url });
    }
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if(data && data.url) handleDialog(data.url);
    onClose();
  };
  return (
    <Dialog onOpenChange={handleButtonClick} open={isOpen} modal defaultOpen={isOpen}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>上傳圖片</DialogTitle>
        </DialogHeader>
        <form className='grid gap-4 py-4'>
          <div className='items-center gap-4'>
            <Label htmlFor='url' className='text-right'>
              圖片 Url:
            </Label>
            <Input
              id='url'
              className='col-span-3'
              onInput={handleChange}
            />
            <p className={cn('mt-1 text-sm text-secondary', {
              ['text-danger']: !isValid
            })}>
              請至
              <a className='underline' href='https://imgur.com/' target='_blank' rel='noreferrer'> imgur </a>
              或
              <a className='underline' href='https://unsplash.com/' target='_blank' rel='noreferrer'> unsplash </a>
              上傳圖片，造成不便敬請見諒
            </p>
          </div>
        <DialogFooter>
          <Button type='submit' onClick={handleSubmit} disabled={!isValid}>確定</Button>
        </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
