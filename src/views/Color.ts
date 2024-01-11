export enum BasicColor {
  white = '#FFFFFF',
  white20 = '#f9f9f9',
  black = '#000000',
  orange = '#CC5B1D',
  green = '#21B95C',
  greenSoft = '#26B824',
  greenShadow = '#148712',
  yellow = '#F4C222',
  yellowDark = '#d1a20a',
  yellowLight = '#f5c735',
  gray20 = '#F1F3F4',
  gray30 = '#E3E5E5',
  gray40 = '#C6CACC',
  gray60 = '#919699',
  gray80 = '#5E6366',
  gray90 = '#3F3F3F',
  blue = '#1771B9',
  blueDark = '#135c96',
  blueLight = '#1b86dc',
  red = '#EC5858',
  aqua = '#22BAAF',
  aquaDark = '#1FA99f',
  aquaLight = '#25CBBF',
  darkGreen = '#13705F',
  purple = '#A685E2',
  pink = '#CE2489',
  brown = '#B7784B',
  darkBrown = '#5C2B0C',
  shadeBrown = '#FB8500',
  background40 = 'rgba(94, 99, 102, 0.4)',
  lightCyan = '#F0FFFE',
  lightCyanBlue = '#BCC3C8',
  veryLightCyanBlue = '#E8F1F8',
  brightBlue = '#1976D2',
  ligntBlue = '#F0FFF6',
  brightLightBlue = '#E0ECFF',
  paleOrange = '#FFFBF0',
  paleRed = '#80B1D8'
}

export enum ButtonColor {
  google = '#FFFFFF',
  signUp = '#CC5B1D',
  login = '#21B95C',
  validate = '#26B824',
  join = '#F4C222',
  next = '#F4C222',
  start = '#22BAAF',
  support = '#21B95C',
  create = '#22BAAF',
  nextKid = '#FFB703',
}

export enum SettingBarColor {
  accessibility = '#ec5858',
  audio = '#22bab0',
  notifications = '#1771b9',
}

export const shadeColor = (color: string, percent: number) => {
  let R = parseInt(color.substring(1, 3), 16);
  let G = parseInt(color.substring(3, 5), 16);
  let B = parseInt(color.substring(5, 7), 16);

  R = Math.floor((R * (100 + percent)) / 100);
  G = Math.floor((G * (100 + percent)) / 100);
  B = Math.floor((B * (100 + percent)) / 100);

  R = R < 255 ? R : 255;
  G = G < 255 ? G : 255;
  B = B < 255 ? B : 255;

  const RR =
    R.toString(16).length === 1 ? '0' + R.toString(16) : R.toString(16);
  const GG =
    G.toString(16).length === 1 ? '0' + G.toString(16) : G.toString(16);
  const BB =
    B.toString(16).length === 1 ? '0' + B.toString(16) : B.toString(16);

  return '#' + RR + GG + BB;
};
