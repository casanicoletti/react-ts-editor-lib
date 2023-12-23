import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import { Dialog as D } from '@mui/material';


export interface SimpleDialogProps {
  open: boolean;
  children: React.ReactNode;
  title: string;
}

export const Dialog = (props: SimpleDialogProps) => {
  const { children, open } = props;


  return (
    <D fullWidth={true}
      maxWidth={"lg"} open={open}>
      <DialogTitle sx={{ m: 0, p: 2 }}>{props.title}</DialogTitle>
      {children}
    </D>
  );
}