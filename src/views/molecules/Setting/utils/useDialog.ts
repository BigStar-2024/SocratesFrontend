import { useState } from 'react';

export const useDialog = () =>{

  const [isOpen, setOpen] = useState<boolean>(false);
  const open = () => setOpen(!isOpen);
  return {
    isOpen,
    open
  }
}

export const useAddDialog = () =>{

  const [isAddOpen, setAddOpen] = useState<boolean>(false);
  const openAdd = () => setAddOpen(!isAddOpen);
  return {
    isAddOpen,
    openAdd
  }
}
