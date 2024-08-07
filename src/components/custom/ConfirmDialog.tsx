'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogTitle, DialogHeader, DialogFooter, DialogContent } from '@/components/ui/dialog';

type ConfirmDialogProps = {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  description: string;
  onConfirm: () => void;
};

export default function ConfirmDialog({ title, isOpen, onClose, description, onConfirm }: ConfirmDialogProps) {

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='w-full rounded-md p-6 md:max-w-md'>
        <DialogHeader>
          <DialogTitle>{title || '注意！'}</DialogTitle>
        </DialogHeader>
        <p>{description}</p>
        <DialogFooter className='flex flex-row justify-end space-x-4 xs:flex-col'>
          <DialogClose asChild onClick={onClose}>
            <Button variant='ghost'>取消</Button>
          </DialogClose>
          <Button
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            確定
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}