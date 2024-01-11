import { FC, useState }   from 'react';
import styled             from 'styled-components';
import { SKIN_PICKER }    from 'constants/avatar';
import ArrowDropDownIcon  from '@mui/icons-material/ArrowDropDown';
import { ScreenSize }     from 'constants/screenSize';
import { useSelector, useDispatch } from 'react-redux';
import { dictionary }   from 'views/pages/Student/Avatar/dictionary'

interface ColorPickerProp {
  select: (value: string) => void
}

export const ColorPickerDropdown: FC<ColorPickerProp> = ({ select }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggling = () => setIsOpen(!isOpen);
  const [selectedOption, setSelectedOption] = useState(SKIN_PICKER[0].hex);
  let language:string = useSelector((state: any) => state.user.language);
  language            = language? language : 'en-us'

  const onOptionClicked = (value: any) => () => {
    setSelectedOption(value);
    select(value)
    setIsOpen(false);
  };

  return (
    <DropDownContainer>
      <div className='dropdown-list'>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <ArrowDropDownIcon onClick={toggling} sx={isOpen ? {} : {display: 'none'}} color="primary" />
        </div>
        <ColorCircle style={isOpen ? { display: 'none' } : { background: selectedOption }} onClick={toggling}></ColorCircle>
        {
          isOpen && (
            SKIN_PICKER.map(option => (
              <ColorCircle style={{ background: option.hex }} onClick={onOptionClicked(option.hex)} key={option.hex}></ColorCircle>
            ))
          )
        }
      </div>
      {
        isOpen ? null : <ArrowDropDownIcon onClick={toggling} color="primary" />
      }
    </DropDownContainer>
  );
}


const DropDownContainer = styled.div`
  display: flex;
  padding: 5px;
  align-items: center;
  border-radius: 30px;
  z-index: 1;
  box-shadow: inset 0 0 3px 3px #d2d2d2;

  .dropdown-list {
    flex-direction: column
  }
  @media screen and (max-width: ${ScreenSize.phone}) {
    right: auto;
    top: 0;
  }
}
`;
const ColorCircle = styled.div`
width: 30px;
height: 30px;
border-radius: 100%;
margin: 5px;

&:hover {
  box-shadow: 0px 1px 10px 0px #FB8500;
  cursor: pointer;
}
`
