import { FC, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { dictionary } from './dictionary'
import { TeacherSettingPgContainer } from 'views/molecules/TeacherPgContainer/TeacherSettingPgContainer';
import { Container, Grid, Box } from '@mui/material';
import { ImageUploader } from 'views/molecules/TeacherCertificates/ImageUploader';
import { fetchTeacherCertificateFilesFromFirebase } from 'app/firebase';
import { StudentChkboxList } from 'views/molecules/TeacherCertificates/StudentChkboxList';
import * as TYPES from 'app/types'

const mockStudents = [
  {
    id: 1,
    name: 'boris',
  },
  {
    id: 2,
    name: 'timon',
  },
  {
    id: 3,
    name: 'pumba',
  },
  {
    id: 4,
    name: 'simba',
  },
]

const Certificates: FC = () => {
  let language: string = useSelector((state: any) => state.user.language);
  const [certImgs, setCertImgs] = useState<Array<any>>([])
  const [selectedId, setSelectedId] = useState<any>(null)

  const dispatch = useDispatch()
  const reLoadImgs: boolean = useSelector((state: any) => state.certificate.reLoadImgs);


  const handleImageSelect = (id: number) => {
    setSelectedId(id)
    dispatch({ type: TYPES.CERTIFICATE_SELECT_IMAGE, payload: certImgs[id] })
  }

  language = language ? language : 'en-us'
  useEffect(() => {
    if (window.Tawk_API?.onLoaded) window.Tawk_API?.showWidget();
    fetchTeacherCertificateFilesFromFirebase(setCertImgs)
  }, []);

  useEffect(() => {
    fetchTeacherCertificateFilesFromFirebase(setCertImgs)
  }, [reLoadImgs]);

  return (
    <TeacherSettingPgContainer onlyLogoImgNav={true} title={dictionary[language]?.certificates}>
      <Container maxWidth={false} sx={{ marginTop: 5, marginBottom: 5, display: 'flex', justifyContent: 'center' }}>
        <Grid container justifyContent={'center'} spacing={5}>
          <Grid item>
            <Box sx={{ maxWidth: 900 }}>
              <Grid container spacing={6} >
                {certImgs ?
                  certImgs.map((certimg, index) => (
                    <Grid item key={index}>
                      <Box
                        sx={{
                          filter: index === selectedId ? 'drop-shadow(0 0 0.75rem gold)' : 'none'
                        }}
                        onClick={() => { handleImageSelect(index) }}
                      >
                        <img src={certimg}
                          style={{
                            borderRadius: 'inherit',
                            height: 275,
                            width: 383,
                            objectFit: 'cover'
                          }} />
                      </Box>
                    </Grid>
                  )) : null
                }
                <Grid item>
                  <ImageUploader />
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item>
            <StudentChkboxList students={mockStudents} />
          </Grid>
        </Grid>
      </Container >
    </TeacherSettingPgContainer >
  );
};
export default Certificates
