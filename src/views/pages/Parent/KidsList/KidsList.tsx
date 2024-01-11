import { FC, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import { LoadingContext } from 'react-router-loading';
import { ParentPgContainer } from 'views/molecules/ParentPgContainer/ParentPgContainer';
import { dictionary } from './dictionary';
import {
  Title,
} from './Style';
import { Box, Link, Typography } from '@mui/material';
import KidsListItem from 'views/organisms/Parent/KidsList/KidsListItem';
import { useQuery } from 'react-query'
import { doFetchGuardianStudents } from 'app/actions/guardianActions';
import { isNull } from 'lodash';
import { LoadingSpinner } from 'views/atoms/Spinner';
import { getMessage } from 'views/utils';

const KidsList: FC = () => {

  const loadingContext = useContext(LoadingContext)
  const guardian = useSelector((state: any) => state.guardian)
  const user = useSelector((state: any) => state.user)
  const language = user.language || 'en-us'
  const { data, isLoading, error } = useQuery(['fetch-kids-list', guardian.id, user.token], () => doFetchGuardianStudents(guardian.id, user.token))
  useEffect(() => {
    loadingContext.done()
    if (window.Tawk_API?.onLoaded) window.Tawk_API?.showWidget();
  }, []);


  return (
    <ParentPgContainer onlyLogoImgNav={false}>
      <Box display={'flex'} flexDirection='column' justifyContent={'center'} alignItems='center'>
        <Title>{dictionary[language]?.yourChildren}</Title>
        {
          isLoading ? <LoadingSpinner /> :
            error ? <Typography variant='h6' color='red'>{getMessage(error)}</Typography> :
              data &&
                data.message ? <Typography variant='h6' color='red'>ERROR: {data.message}</Typography> :
                <>
                  {data.some((item: any) => isNull(item.student)) &&
                    <Typography variant='h6'>
                      {dictionary[language]?.finish}
                      <Link href='/kids/new'> {dictionary[language]?.here}</Link>
                      .
                    </Typography>
                  }
                  {data.map((item: any, index: number) => (
                    item.student &&
                    <KidsListItem {...item.student} index={index} key={item.id} language={language} parentName={user.username} dateJoined={user.dateJoined} />
                  ))}
                </>
        }
      </Box>
    </ParentPgContainer>
  );
};

export default KidsList;
