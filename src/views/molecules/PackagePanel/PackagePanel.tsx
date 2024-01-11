import { FC, useEffect, useState } from 'react';
import avatar from 'views/assets/packageIcons/avatar.svg'
// import Button from 'views/molecules/MuiButton'
import { ButtonGroup, Button } from '@mui/material';
import { BasicColor } from 'views/Color';
import { useSelector } from 'react-redux';
import { ThemeProvider } from '@mui/material';
import { dictionary } from './dictionary'
import { settingPage } from 'views/Theme';
import {
  Container,
  Header,
  Avatar,
  PriceContainer,
  Price,
  Plan,
  Body,
  Mask,
  Tip,
} from './Style'

type PackagePanelProps = {
  type: string;
  price: any;
  disabled?: boolean;
  isSpecialCode: boolean;
  onChange: (childrenCount: number, plan: string) => void;
};
export const PackagePanel: FC<PackagePanelProps> = ({ type, price, isSpecialCode, disabled = false, onChange }) => {
  const [childrenCount, setChildrenCount] = useState(0);
  const [plan, setPlan] = useState('month');
  let language: string = useSelector((state: any) => state.user.language);
  language = language ? language : 'en-us'
  // const handleCheckPath = (path: string, isChecked: boolean) => {
  //   let temp:any = [];
  //   temp = [...paths];
  //   if(isChecked) temp.push(path)
  //   else temp.pop(path)
  //   setPaths(temp)
  // }

  useEffect(() => {
    onChange(childrenCount, plan);
  }, [childrenCount, plan]);

  return (
    <ThemeProvider theme={settingPage}>
      <Container color={type}>
        {disabled && (<Mask />)}
        <Header color={type}>
          <Avatar src={avatar} />
          <b>{type}{' '}{dictionary[language]?.package}</b>
        </Header>
        <Body>
          <Tip>
            {type === 'Gold' && dictionary[language]?.includeAllAreasOfKnowledge}
            {type === 'Combo' && dictionary[language]?.pickTwoAreasOfKnowledge}
            {type === 'Sole' && dictionary[language]?.pickOneAreaOfKnowledge}
          </Tip>
          <>
            {!isSpecialCode &&
              <div className="flex flex-col p-t-10 p-b-15 font-s-20 font-w-7 w-300">
                {/* <b>{dictionary[language]?.numberOfChildren}</b>
                <br /> */}
                <div className="flex flex-row" style={{ flexWrap: 'unset' }}>
                  <Button
                    sx={{
                      bgColor: plan === 'month' ? BasicColor.green : BasicColor.gray40,
                      fontSize: 16,
                      zIndex: plan === 'month' ? 2 : 0,
                    }}
                    variant='contained'
                    color={plan === 'month' ? 'primary' : 'secondary'}
                    onClick={() => { setPlan('month') }} >
                    {dictionary[language]?.monthly}
                  </Button>
                  <Button
                    sx={{
                      bgColor: plan === 'year' ? BasicColor.green : BasicColor.gray40,
                      fontSize: 16,
                      zIndex: plan === 'year' ? 2 : 0,
                      margin: "0 0 0 -64px"
                    }}
                    variant='contained'
                    color={plan === 'year' ? 'primary' : 'secondary'}
                    onClick={() => { setPlan('year') }} >
                    {dictionary[language]?.yearly}
                  </Button>
                </div>
              </div>
            }
            <div className="flex flex-col p-t-10 p-b-15 font-s-20 font-w-7 w-300">
              <b>{dictionary[language]?.numberOfChildren}</b>
              <br />
              <div className="flex flex-row">
                <ButtonGroup variant="outlined" aria-label="outlined button group">
                  <Button variant="outlined"
                    sx={{
                      color: 'black',
                      borderColor: 'black',
                      borderRadius: 0,
                      height: 35,
                      fontSize: 24,
                      width: 35,
                    }}
                    onClick={() => childrenCount > 0 && setChildrenCount(childrenCount - 1)} >
                    -
                  </Button>
                  <Button variant="outlined"
                    sx={{
                      color: 'black',
                      borderColor: 'black',
                      borderRadius: 0,
                      height: 35,
                      width: 35,
                      fontSize: 24,
                    }}>
                    {'' + childrenCount}
                  </Button>
                  <Button variant="outlined"
                    sx={{
                      color: 'black',
                      borderColor: 'black',
                      borderRadius: 0,
                      height: 35,
                      width: 35,
                      fontSize: 24,
                    }}
                    onClick={() => setChildrenCount(childrenCount + 1)} >
                    +
                  </Button>
                </ButtonGroup>
              </div>
            </div>
          </>
          {!isSpecialCode &&
            <PriceContainer>
              <Price> $ {price}</Price>
              <Plan>/{plan}</Plan>
            </PriceContainer>
          }
        </Body>
      </Container>
    </ThemeProvider>
  );
};
