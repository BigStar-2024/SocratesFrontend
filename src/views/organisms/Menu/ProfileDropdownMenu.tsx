import { FC, useState }     from 'react';
import * as React           from 'react';
import Button               from '@mui/material/Button';
import Menu                 from '@mui/material/Menu';
import MenuItem             from '@mui/material/MenuItem';
import { useHistory }       from 'react-router-dom';
import { ImageAvatar }      from 'views/molecules/Avatar/DefaultAvatar';
import { useSelector }      from 'react-redux'
import { USER_AVATAR_SIZE } from 'constants/common';
import { dictionary }       from 'views/pages/Student/Menus/dictionary'

export const ProfileDropDownMenu: FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const history = useHistory();
  const student = useSelector((state: any) => state.student);
  const avatar  = useSelector((state: any) => state.avatar);
  const open    = Boolean(anchorEl);
  let language:string = useSelector((state: any) => state.user.language);
  language            = language? language : 'en-us'
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {avatar &&
          <ImageAvatar
            name = {student.fullName}
            accessory = {avatar.accessory ? avatar.accessory : null}
            head      = {avatar.head ? avatar.head : null}
            clothes   = {avatar.clothes ? avatar.clothes : null}
            skinTone  = {avatar.skin ? avatar.skin : null}
            size      = {USER_AVATAR_SIZE}
          />
        }
      </Button>
      <Menu
        id            = "basic-menu"
        anchorEl      = {anchorEl}
        open          = {open}
        onClose       = {handleClose}
        MenuListProps = {{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => history.push('/profile')}>{dictionary[language]?.profile}</MenuItem>
        <MenuItem onClick={() => history.push('/')}>{dictionary[language]?.logout}</MenuItem>
      </Menu>
    </div>
  );
}



