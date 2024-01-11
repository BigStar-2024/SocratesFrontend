import { FC, useState }    from 'react';
import { Icon }            from 'views/atoms/Icon/Icon';
import { TypoGeneralText } from 'views/atoms/Text'
import { BasicColor }      from 'views/Color';
import coins               from 'views/assets/coins.svg';
import styled              from 'styled-components';
import { IconSize }        from 'views/atoms/Icon/Size';
import { ScreenSize }      from 'constants/screenSize';
import { LSDialog }        from 'views/molecules/Setting/LSDialog';
import { WalletTxHistory } from './WalletTxs'

type WalletProps = {
  balance: number;
};

export const Wallet: FC<WalletProps> = ({ balance }) => {
  const [isDeploy, setIsDeploy] = useState(false);

  const deployDropdown = () => {
    setIsDeploy(!isDeploy);
  };
  return (
    <>
      <WalletContainer>
        <WalletStyle>
          <IconContainer>
            <Icon image={coins} size={IconSize.medium} onClick={deployDropdown} />
          </IconContainer>
          <TypoGeneralText>{balance}</TypoGeneralText>
        </WalletStyle>
        {isDeploy ? (
          <LSDialog isOpen={isDeploy} open={deployDropdown} dialogContent={<WalletTxHistory />} fullWidth='true' title='Recent Transactions' />
        ) : null}
      </WalletContainer>
    </>
  );
};

const WalletContainer = styled.div`
  position: relative;
  @media screen and (min-width: ${ScreenSize.desktop}) {
    display: none;
  }
  @media screen and (min-width: ${ScreenSize.desktop}) {
    width: 135px;
    height: 36px;
    display: initial;
  }
`;
const WalletStyle = styled.div`
@media screen and (max-width: ${ScreenSize.desktop}) {
  display: none;
}
  @media screen and (min-width: ${ScreenSize.tablet}) {
    width: 100%;
    height: 36px;
    border-radius: 0 13px 13px 0;
    border: 2px solid ${BasicColor.gray60};
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    z-index: 2;
    background-color: ${BasicColor.white};
  }
`;
const IconContainer = styled.div`
  position: absolute;
  left: -6px;
`;
