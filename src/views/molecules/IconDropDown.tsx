import { FC } from 'react';
import styled from 'styled-components';
import { BasicColor } from 'views/Color';
import { ScreenSize } from 'constants/screenSize';


type IconDropDownProps = {
  icon: string;
  onIconClick?: () => void;
  content?: React.ReactNode | FC
};

export const IconDropDown: FC<IconDropDownProps> = ({
  icon,
  content,
  onIconClick,
}) => {
  return (
    <Dropdown>
      <DropdownButton
        type="checkbox"
        name="Dropdown-button"
        id="Dropdown-button"
        onClick={onIconClick}
      />
      <label htmlFor="Dropdown-button">
        <DropdownImage src={icon} />
      </label>
      <DropdownContent>
        {content}
      </DropdownContent>
    </Dropdown>
  );
};

const Dropdown = styled.div`
  width: 100%;
  height: 50px;
  position: relative;
`;

const DropdownImage = styled.img`
  width: 50px;
  height: 50px;
  position: absolute;
  z-index: 2;
  @media screen and (min-width: ${ScreenSize.tablet}) {
    width: 60px;
  }
`;
const DropdownContent = styled.div`
  display: none;
  position: absolute;
  background-color: ${BasicColor.white};
  padding: 3px;
  z-index: 1;
  right: 0;
  margin: 0 auto;
  bottom: 55px;
  font-size: 12px;
  border: 2px solid ${BasicColor.gray60};
  border-radius: 10px 10px 0 0;

  @media screen and (min-width: ${ScreenSize.tablet}) {
    border-radius: 10px;
    ${Dropdown}:hover & {
      display: flex;
      flex-direction: column;
    }
  }
`;
const DropdownButton = styled.input`
  width: 50px;
  height: 50px;
  position: absolute;
  z-index: 6;
  opacity: 0;
  left: 0;
  right: 0;
  margin: 0 auto;

  &:checked ~ ${DropdownContent} {
    display: flex;
    flex-direction: column;
  }
`;
