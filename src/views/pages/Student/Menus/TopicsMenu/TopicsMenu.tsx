import { FC, useEffect, useState, useContext }      from 'react';
import { Wrapper, TopicsMenuStyles } from './Style';
import { StudentMenu }               from 'views/pages/Student/Menus/StudentMenu';
import { TopicPresentation }         from 'views/molecules/TopicPresentation';
import { SubTopicsCarousel }         from 'views/organisms/SubTopicsCarousel';
import { get }                       from 'api/queries/get';
import { AREA_OF_KNOWLEDGE_QUERY }   from 'api/queries/questions';
import { useParams }                 from 'react-router-dom';
import { IAreasOfKnowledge }         from 'app/entities/areasOfKnowledge';
import { ITopic }                    from 'app/entities/block';
import { LoadingContext }            from 'react-router-loading';
interface RouteTopicParams {
  topicId: string;
}

export const TopicsMenu: FC = () => {
  const loadingContext  = useContext(LoadingContext);
  const {topicId}       = useParams<RouteTopicParams>();
  const [areaOfKnowledge, setAreaOfKnowledge] = useState<IAreasOfKnowledge>();

  const handleData = (data: any) => {
    setAreaOfKnowledge(data.data.areaOfKnowledgeById);
    loadingContext.done();
  };
  const handleError = (error: any) => {
    console.error(error);
  };

  useEffect(() => {
    get(
      `areaOfKnowledgeById(id:"${topicId}")`,
      AREA_OF_KNOWLEDGE_QUERY,
      handleData,
      handleError
    );
  }, []);
  return (
    <>
      <Wrapper>
        <StudentMenu>
          {areaOfKnowledge ? (
            <TopicsMenuStyles>
              <TopicPresentation
                title={areaOfKnowledge.name}
                image={`https://api.withsocrates.com/media/${areaOfKnowledge.image}`}
              />
              {areaOfKnowledge.topicSet.map((item: ITopic, i: any) => (
                <SubTopicsCarousel
                  name      ={item.name}
                  subTopics ={item.subTopics}
                  id        ={item.id}
                  key       ={i}
                />
              ))}
            </TopicsMenuStyles>
          ) : null}
        </StudentMenu>
      </Wrapper>
    </>
  );
};
