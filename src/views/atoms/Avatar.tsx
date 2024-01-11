import { FC, useEffect }               from 'react';
import { ReactComponent as AvatarSvg } from 'views/assets/avatars/girl-11.svg';
import { shadeColor }                  from 'views/Color';

type AvatarProps = {
  skin: string;
  shadow?: string;
};

export const Avatar: FC<AvatarProps> = ({skin, shadow}) => {
  useEffect(() => {
    const main = ['head', 'leftArm', 'rightArm', 'leftLeg', 'rightLeg', 'legs'];
    const shadowed = ['neck', 'rightEar', 'blush1', 'blush2', 'lefttEar'];

    main.map(s => {
      const currentSkin = document.getElementById(s);
      if (currentSkin) {
        currentSkin.setAttribute('style', `fill: ${skin}`);
        currentSkin.removeAttribute('id');
      }
    });

    shadowed.map(s => {
      const currentSkin = document.getElementById(s);
      if (currentSkin) {
        currentSkin.setAttribute(
          'style',
          `fill: ${shadow || shadeColor(skin, -25)}`
        );
        currentSkin.removeAttribute('id');
      }
    });
  }, []);
  return <AvatarSvg />;
};
