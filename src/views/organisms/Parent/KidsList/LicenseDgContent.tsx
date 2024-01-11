import { FC, useRef, useState } from 'react'
// import { toPng } from 'html-to-image'
// import { saveAs } from 'file-saver'
import License from 'views/molecules/KidLicense/KidLicense'
import Button from 'views/molecules/MuiButton'
import { BasicColor } from 'views/Color'
import { dictionary } from './dictionary'
import {
  GridContainer,
  GridItem,
} from './Style'
import { Box } from '@mui/material'
import { exportComponentAsPNG } from 'react-component-export-image'

interface LisenceDgProps {
  language: string
  kidName: string
  parentName: string
  dateJoined: string
  close: () => void
}

const LicenseDgContent: FC<LisenceDgProps> = ({
  language,
  kidName,
  dateJoined,
  parentName,
  close
}) => {
  const [loading, setLoading] = useState(false);
  const certRef = useRef<any>(null)
  const handleDownloadBtnClicked = () => {

    setLoading(true)
    // const licenseElm: any = document.querySelector('#license');
    // toPng(licenseElm).then(function (dataUrl) {
    //   saveAs(dataUrl, `${kidName}-license`);
    // });
    exportComponentAsPNG(certRef)
    setLoading(false)
  };

  return (
    <Box>
      <div ref={certRef}>
        <License
          parentName={parentName || ''}
          kidName={kidName || ''}
          membership={dateJoined?.slice(0, 10) || ''}
        />
      </div>
      <GridContainer container>
        <GridItem item md={6} xs={12}>
          <Button
            bgColor={BasicColor.green}
            onClick={handleDownloadBtnClicked}
            loading={loading}
            value={dictionary[language]?.download}
          />
        </GridItem>
        <GridItem item md={6} xs={12}>
          <Button
            bgColor={BasicColor.gray60}
            onClick={close}
            value={dictionary[language]?.return}
          />
        </GridItem>
      </GridContainer>
    </Box>
  );
};

export default LicenseDgContent;
