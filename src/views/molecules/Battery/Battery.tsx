import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { BasicColor } from 'views/Color';
import { ScreenSize } from 'constants/screenSize';
import useSound from 'use-sound';
import fullBatterySound from 'views/assets/audios/Battery-payout-award.wav';

type BatteryProps = {
  charge: number;
};

export const Battery: FC<BatteryProps> = ({ charge }) => {
  const [chargeArray, setChargeArray] = useState(new Array(10).fill(false));
  // const chargeArray = new Array(10).fill(false);
  const [play] = useSound(fullBatterySound);
  const IncreaseCharge = (charge: number) => {

    if (charge === 10) play()
    const charges = new Array(10).fill(false)
    setChargeArray(charges.fill(true, 0, charge))
  };

  useEffect(() => {
    IncreaseCharge(charge);
  }, [charge])


  return (
    <>
      <BatteryContainer>
        <BatteryStyles>
          {chargeArray.map((item, i) => (
            <ChargeItem
              color={item ? BasicColor.greenSoft : BasicColor.gray80}
              borderColor={item ? BasicColor.greenShadow : BasicColor.gray90}
              key={i}
            />
          ))}
        </BatteryStyles>
        <BatteryPole />
      </BatteryContainer>
    </>
  );
};

type ChargeItemProps = {
  color: BasicColor.greenSoft | BasicColor.gray80;
  borderColor: BasicColor.greenShadow | BasicColor.gray90;
};

const ChargeItem = styled.div<ChargeItemProps>`
  width: 15px;
  height: 34px;
  background-color: ${p => p.color};
  border-bottom: 10px solid ${p => p.borderColor};
  @media screen and (max-width: ${ScreenSize.phone}) {
    border-bottom: 2px solid ${p => p.borderColor};
    width: 34px;
    height: 15px;
  }
`;

const BatteryStyles = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #f0f0f0;
  background: -webkit-linear-gradient(top, #f0f0f0, #d2d2d2);
  background: -moz-linear-gradient(top, #f0f0f0, #d2d2d2);
  background: linear-gradient(to bottom, #f0f0f0, #d2d2d2);
  padding: 0 5px;
  border-radius: 5px;
  @media screen and (max-width: ${ScreenSize.phone}) {
    flex-direction: column-reverse;
    justify-content: center;
    width: auto;
    height: auto;
  }
`;
const BatteryContainer = styled.div`
  width: 195px;
  height: 60px;
  display: flex;
  justify-items: left;
  align-items: center;
  @media screen and (max-width: ${ScreenSize.phone}) {
    flex-direction: column-reverse;
    width: 50px;
    justify-content: center;
    height: auto;
  }
`;

const BatteryPole = styled.div`
  width: 16px;
  height: 20px;
  background-color: #505050;
  border-bottom: 7px solid #3c3c3c;
  @media screen and (max-width: ${ScreenSize.phone}) {
    border-bottom: 2px solid #3c3c3c;
    width: 20px;
    height: 10px;
  }
`;
