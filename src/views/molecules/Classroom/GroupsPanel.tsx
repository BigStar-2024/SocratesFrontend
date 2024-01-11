import { useSelector }          from 'react-redux'
import { Grid }                 from '@mui/material';
import { dictionary }           from './dictionary'
import groupsImg                from 'views/assets/studentGroups.svg'
import newGroupImg              from 'views/assets/newStudentGroup.svg'

import {
    Container,
    GroupItem,
    GroupMark,
    GroupText }               from './Style'
const GroupsPanel = (props: any) => {

  let language:string = useSelector((state: any) => state.user.language);
  language            = language? language : 'en-us'

  const data          = props.data;

  return (
    <Container>
    {
      data.map((item:any, index: number) =>
      <GroupItem key={index} onClick={() => {props.onGroup(item)}}>
          <GroupMark src={groupsImg} />
          <GroupText>{item.name}</GroupText>
      </GroupItem>
      )
    }
      <GroupItem onClick={() => {props.onNew()}}>
          <GroupMark src={newGroupImg} />
          <GroupText>{dictionary[language]?.addNew}</GroupText>
      </GroupItem>
    </Container>
  )
}

export default GroupsPanel
