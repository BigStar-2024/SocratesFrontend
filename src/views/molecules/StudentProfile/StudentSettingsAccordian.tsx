import { FC } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import {Typography, Container} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { SettingBarColor } from 'views/Color';
import { SoundSwitch } from './SoundSwitch';
import { LanguageSelect } from './StudentSettingsLanguageSelect';
import { dictionary }       from 'views/pages/Student/Settings/dictionary'
import { useSelector } from 'react-redux';

export const StudentSettingsAccordian: FC = () => {
  let language:string     = useSelector((state: any) => state.user.language);
  language                = language? language : 'en-us'
  return (
    <Container sx={{marginTop: 2, marginBottom: 2, borderRadius: 10}}>
      <Accordion sx={{ marginBottom: 2 }} defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{ background: SettingBarColor.accessibility }}
        >
          <Typography style={{ color: 'white' }}>{dictionary[language]?.language}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <LanguageSelect />
        </AccordionDetails>
      </Accordion>
      {/* <Accordion sx={{ marginBottom: 2 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
          sx={{ background: SettingBarColor.notifications }}
        >
          <Typography style={{ color: 'white' }}>{dictionary[language]?.account}</Typography>
        </AccordionSummary>
        <AccordionDetails>
        </AccordionDetails>
      </Accordion> */}
      <Accordion>
        <AccordionSummary
          aria-controls="panel2a-content"
          id="panel2a-header"
          sx={{ background: SettingBarColor.audio }}
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography style={{ color: 'white', textAlign:'center' }}>{dictionary[language]?.sound}</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ display: 'flex', justifyContent: 'center'}}>
          <SoundSwitch />
        </AccordionDetails>
      </Accordion>
    </Container>
  );
}
