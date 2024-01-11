import { useSelector }                from 'react-redux'
import { Grid }                 from '@mui/material';
import { dictionary }           from './dictionary'
import chair      from 'views/assets/chair.svg'
import {
    Container,
    StudentItem,
    StudentMark,
    StudentText }             from './Style'
const StudentPanel = (props: any) => {
  let language:string = useSelector((state: any) => state.user.language);
  language            = language? language : 'en-us'
  const data = props.data;
  return (
    <Container>
    {
      data.map((item:any, index: number) =>
      <StudentItem key={index} onClick={() => {props.onStudent(item)}}>
          <StudentMark src={chair} />
          <StudentText>{item.name}</StudentText>
      </StudentItem>
      )
    }
      <StudentItem onClick={() => {props.onNew()}}>
          <StudentMark src={chair} />
          <StudentText>{dictionary[language]?.addNew}</StudentText>
      </StudentItem>
    </Container>
  )
}

export default StudentPanel
