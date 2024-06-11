'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

type ImagePreviewDialogProps = {
  open: boolean;
  imgSrc: string;
  isUpdating: boolean;
  onClose: () => void;
  onSave: () => void;
}

export default function ImagePreviewDialog({ open, imgSrc, isUpdating, onClose, onSave }: ImagePreviewDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='w-full rounded-md p-6 md:max-w-md'>
        <DialogHeader>
          <DialogTitle>大頭貼預覽</DialogTitle>
        </DialogHeader>
        <div className='relative mx-auto size-[250px] py-4'>
          <Image src={imgSrc} fill alt='avatar img preview'
          className='rounded-full object-cover' />
        </div>
        <DialogFooter className='flex flex-row justify-end space-x-4 xs:flex-col'>
          <DialogClose asChild onClick={onClose}>
            <Button variant='ghost'>取消</Button>
          </DialogClose>
          <Button onClick={onSave} disabled={isUpdating} isLoading={isUpdating}>儲存</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}