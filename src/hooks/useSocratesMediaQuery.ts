import { useMediaQuery } from '@mui/material'
import { ScreenSize } from 'constants/screenSize'

// widescreen = '1366px',
// desktop = '1024px',
// tablet = '769px',
// phone = '450px',
export const useSocratesMediaQuery = (screenSize: string) => {
  let pixelWidth
  screenSize === 'lg' && (pixelWidth = ScreenSize.widescreen)
  screenSize === 'md' && (pixelWidth = ScreenSize.desktop)
  screenSize === 'sm' && (pixelWidth = ScreenSize.tablet)
  screenSize === 'xs' && (pixelWidth = ScreenSize.phone)
  const value = useMediaQuery(`(max-width: ${pixelWidth})`)
  return value
}
