import { FC }                             from 'react';
import { CongratsDgContainer }            from 'views/pages/Student/Question/Style';
import { useSelector }                    from 'react-redux';
import img_congats                        from 'views/assets/level-up-congrats.png';
import ParticlesBg                        from 'particles-bg';
import styled, { keyframes }              from 'styled-components';
import useSound                           from 'use-sound';
import fireworkSfx                        from 'views/assets/audios/mixkit-fireworks-bang-in-sky-2989.wav';
import { bounceInUp }                     from 'react-animations';
import { flip }                           from 'react-animations'
import { TypoHeader, TypoTitle, TypoBtn } from 'views/atoms/Text';
import { dictionary } from 'views/pages/Student/Question/dictionary'

interface Props {
  close: () => (void)
}
export const LevelUpDgContent: FC<Props> = ({ close }) => {
  const [play] = useSound(fireworkSfx);

  const earning           = useSelector((state: any) => state.earning);
  let language:string     = useSelector((state: any) => state.user.language);
  language                = language? language : 'en-us'

  const config = {
    num: [1, 10],
    rps: 0.1,
    radius: [2, 10],
    life: [-2, 3],
    v: [2, 3],
    tha: [-40, 40],
    alpha: [0.9, 0],
    scale: [0.1, 0.4],
    position: 'all',
    color: ['random', '#ff0000'],
    cross: 'dead',
    random: 15,
    g: 1,
  };
  return (
    <div onLoad={() => play} style={{ display: 'flex', justifyContent: 'center' }}>
      <CongratsDgContainer>
        <div className="background">
          <ParticlesBg type="custom" config={config} />
        </div>
        <div className="background">
          <ParticlesBg type="polygon" config={config} />
        </div>
        <Flip>
          <img src={img_congats} />
        </Flip>
        <BounceIn>
          <TypoHeader style={{ textAlign: 'center' }}>{dictionary[language]?.levelUp}</TypoHeader>
          <TypoTitle style={{ textAlign: 'center' }}>{dictionary[language]?.yourLevelIsNow}: {earning.level}</TypoTitle>
        </BounceIn>
        <button onClick={close}><TypoBtn>{dictionary[language]?.continue}</TypoBtn></button>
      </CongratsDgContainer>
    </div>
  );
};

const Flip = styled.div`
  animation: 2s ${keyframes`${flip}`} ;
`;

const BounceIn = styled.div`
  animation: 2s ${keyframes`${bounceInUp}`} ;
`;
