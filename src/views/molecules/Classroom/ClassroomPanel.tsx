import { useSelector }                from 'react-redux'
import { Grid }                 from '@mui/material';
import { dictionary }           from './dictionary'
import addClassroomImgMark      from 'views/assets/addClassroom.svg'
import ClassroomItemImg         from 'views/assets/classroom-item.svg'
import {
    Container,
    ClassroomItem,
    ClassroomMark,
    ClassroomText }             from './Style'
const ClassroomPanel = (props: any) => {
  let language:string = useSelector((state: any) => state.user.language);
  language            = language? language : 'en-us'
  const data = props.data;
  return (
    <Container>
    {
      data.map((item:any, index: number) =>
      <ClassroomItem key={index} onClick={() => {props.onClassroom(item)}}>
          <ClassroomMark src={ClassroomItemImg} />
          <ClassroomText>{item.name}</ClassroomText>
      </ClassroomItem>
      )
    }
      <ClassroomItem onClick={() => {props.onNew()}}>
          <ClassroomMark src={addClassroomImgMark} />
          <ClassroomText>{dictionary[language]?.addNew}</ClassroomText>
      </ClassroomItem>
    </Container>
  )
}

export default ClassroomPanel
