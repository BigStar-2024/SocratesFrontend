import { FC, useEffect, useState, useContext } from 'react';
import { TopicCard }                           from 'views/molecules/TopicCard';
import { Wrapper,
  SubjectsCardsContainer, TitleContainer }     from './Style';
import { StudentMenu }       from 'views/pages/Student/Menus/StudentMenu';
import { RibbonText }        from 'views/molecules/RibbonText';
import { dictionary }        from './dictionary';
import { useHistory }        from 'react-router-dom';
import { get }               from 'api/queries/get';
import { useDispatch }       from 'react-redux';
import * as TYPE             from 'app/types';
import { AUDIENCES_QUERY }   from 'api/queries/people';
import { IAreasOfKnowledge } from 'app/entities/areasOfKnowledge';
import { LoadingContext }    from 'react-router-loading';
import { useSelector }       from 'react-redux'

export const SubjectsMenu: FC = () => {
  const loadingContext  = useContext(LoadingContext);
  const dispatch        = useDispatch();
  const history         = useHistory();
  let language:string   = useSelector((state: any) => state.user.language);
  language              = language? language : "en-us"
  const [areasOfKnowledge, setTopics] = useState<IAreasOfKnowledge[]>([]);

  const handleData = (data: any) => {
    setTopics(data.data.audienceById.areaofknowledgeSet);
    dispatch({
      type:     TYPE.SET_AOK,
      payload:  data.data.audienceById.areaofknowledgeSet,
    });
    loadingContext.done();
  };

  const handleError = (error: any) => {
    console.error(error);
  };

  useEffect(() => {
    get(
      'audienceById(id:"2")',
      `{${AUDIENCES_QUERY}}`,
      handleData,
      handleError
    );
  }, []);

  return (
    <>
      <Wrapper>
        <StudentMenu>
          <TitleContainer>
            <RibbonText body={dictionary[language].title} />
          </TitleContainer>
          <SubjectsCardsContainer>
            {areasOfKnowledge.map((areaOfKnowledge: IAreasOfKnowledge) => (
              <TopicCard
                image      =  {`https://api.withsocrates.com/media/${areaOfKnowledge.image}`}
                background =  {areaOfKnowledge.hexColor}
                subject    =  {areaOfKnowledge.name}
                onClick    =  {() => history.push(`/topic/${areaOfKnowledge.id}`)}
                isButton   =  {true}
                isActive   =  {areaOfKnowledge.isActive}
              />
            ))}
          </SubjectsCardsContainer>
        </StudentMenu>
      </Wrapper>
    </>
  );
};
