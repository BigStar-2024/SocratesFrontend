import { FC }           from 'react';
import { createPortal } from 'react-dom';

export const Modal: FC = ({children}) => {
  return createPortal(<div>{children}</div>, document.body);
};
