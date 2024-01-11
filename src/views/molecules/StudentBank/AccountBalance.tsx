import { FC }               from 'react';
import styled               from 'styled-components';
import { ScreenSize }       from 'constants/screenSize';
import { BasicColor }       from 'views/Color';
import SavingsIcon          from '@mui/icons-material/Savings';
import { LSText, LSLabel }  from 'views/molecules/Setting/utils/Style';
import { numberWithCommas } from 'views/utils'
import { dictionary }       from 'views/pages/Student/Bank/dictionary'
import { useSelector }      from 'react-redux'

interface BalanceProp {
  balance: number
}

export const AccountBalance: FC<BalanceProp> = ({ balance }) => {

  let language:string = useSelector((state: any) => state.user.language);
  language            = language? language : 'en-us'

  return (
    <BankPaper flex_direction='row' bg_color={BasicColor.blue} >
      <SavingsIcon />
      <LSText fontSize={24}>
        {dictionary[language]?.accountBalance}
      </LSText>
      <LSLabel ml={10} fontSize={24}>${numberWithCommas(balance)}</LSLabel>
    </BankPaper>
  );
};

const BankPaper = styled.div<{
  flex_direction: string;
  bg_color: string;
  width?: number;
}>`
  margin-top: 1vh;
  padding: 30px 20px 30px 20px;
  width: ${p => (p.width ? p.width + 'px;' : 'auto;')}
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: ${p => p.flex_direction};
  color: white;
  background-color: ${BasicColor.blue};
  background-color: ${p => p.bg_color};
  border-radius: 20px;

  @media screen and (max-width: ${ScreenSize.tablet}) {
    width: 40vw;
    padding: 20px 35px 20px 35px;
  }

  @media screen and (min-width: ${ScreenSize.tablet}) (max-width: ${ScreenSize.desktop}) {
    width: 40vw;
    padding: 20px 35px 20px 35px;
  }
`;
