import { z } from 'zod';

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

interface DialogComponentProps {
  handleDialog: (url: string) => void;
}

const schema = z.string().url({ message: '請填入正確的網址格式, ex: https://www.journeybites.com' }).refine(url => url.startsWith('https://'), {
  message: 'URL must start with https://'
});

export function DialogComponent({ handleDialog }: DialogComponentProps ) {
  const { isOpen, onClose, onOpen, data, setData } = useDialog();
  const handleButtonClick = () => {
    if(isOpen) return onClose();
    onOpen();
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let validatedUrl;

    try {
      validatedUrl = schema.parse(e.target.value);
      setData({ url: e.target.value });
    } catch (e) {
      if (e instanceof z.ZodError) {
          const errors = e.errors.map(error => error.message);
          return errors;
      } else {
        throw new Error('Unexpected error occurred');
      }
    } finally {
      validatedUrl ? null : setData({ url: '' });
    }

    setData({ url: e.target.value });
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
          </div>
        <DialogFooter>
          <Button type='submit' onClick={handleSubmit}>確定</Button>
        </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
