import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';


export interface SimpleDialogProps {
  open: boolean;
  children: React.ReactNode;
  title: string;
  onClose: (value: string) => void;
}

const MyDialog = (props: SimpleDialogProps) => {
  const { children, open } = props;


  return (
    <Dialog fullWidth={true}
      maxWidth={"lg"} open={open}>
      <DialogTitle sx={{ m: 0, p: 2 }}>{props.title}</DialogTitle>
      {children}
    </Dialog>
  );
}

export { MyDialog as Dialog }