import { FC, useEffect, useState } from 'react';
import isSvg                       from 'is-svg'
import { parseSVG, fetchFile }     from './ColorUtil'
import { useSelector }            from 'react-redux';
import { dictionary }              from 'views/pages/Student/Avatar/dictionary'

interface SvgProps {
  url: string
  skinTone?: string
}

export const AvatarItemWithSkinTone: FC<SvgProps> = ({ url, skinTone }) => {
  const [img, setImg] = useState('')

  let language:string = useSelector((state: any) => state.user.language);
  language            = language? language : 'en-us'

  const updateAvatar = async () => {
    // fetch if skinTone is not zero
    if (skinTone) {
      const svg = await fetchFile(url)
      if (svg !== '' && isSvg(svg)) {
        const newSvg = parseSVG(svg, skinTone)
        setImg(newSvg)
      } else setImg('')
    } else setImg('')
  }

  useEffect(() => {
    updateAvatar()
  }, [url, skinTone])

  return (
    <>
      {
        img ?
          <img src={`data:image/svg+xml;utf8,${img}`} alt='My Avatar' style={{ width: '100%' }} />
          :
          <img src={url} alt='My Avatar' style={url ? { width: '100%' } : { display: 'none' }} />
      }
    </>
  );
};
