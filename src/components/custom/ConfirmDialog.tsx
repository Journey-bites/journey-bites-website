'use client';

import { Button } from '../ui/button';
import { Dialog, DialogClose, DialogTitle, DialogHeader, DialogFooter, DialogContent } from '../ui/dialog';

type ConfirmDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  description: string;
  onConfirm: () => void;
};

export default function ConfirmDialog({ isOpen, onClose, description, onConfirm }: ConfirmDialogProps) {

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='w-full rounded-md p-6 md:max-w-md'>
        <DialogHeader>
          <DialogTitle>注意！</DialogTitle>
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