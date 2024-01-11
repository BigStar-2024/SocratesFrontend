import { BLOCK, BLOCK_CONFIGURATION_KEYWORD, BLOCK_PRESENTATON, BLOCK_TYPE, BLOCK_TYPE_CONFIGURATION, QUESTION_IMAGE_ASSETS, QUESTION_AUDIO_ASSETS } from '../fragments/blockFragments';
import { ANSWER_OPTION, AREA_OF_KNOWLEDGE, QUESTION, TOPIC, TOPIC_GRADE } from '../fragments/questionFragments';
import { LEVEL } from 'api/fragments/levelFragments';

export const TOPICS_QUERY = `
   {
    ${TOPIC}
    subTopics{
        ${TOPIC}
      }
    }
`;


export const TOPIC_GRADE_QUERY = `
  {
    ${TOPIC_GRADE}
    topic
    ${TOPICS_QUERY}
  }
`;

export const AREA_OF_KNOWLEDGE_QUERY = `
    {
    ${AREA_OF_KNOWLEDGE}
    topicSet
    ${TOPICS_QUERY}
    }
`;

export const QUESTION_QUERY = `
    {
      ${QUESTION}
      questionImageAssets
      ${QUESTION_IMAGE_ASSETS}
      questionAudioAssets
      ${QUESTION_AUDIO_ASSETS}
      answeroptionSet
      ${ANSWER_OPTION}
    }
`;

export const NEXT_LEVEL_QUERY = (amount: number) => `
    query {
      nextLevelByAmount(amount: ${amount}){
        ${LEVEL}
      }
    }
`;

export const BLOCK_PRESENTATION_QUERY = `
    {
      ${BLOCK_PRESENTATON}
      block{
        ${BLOCK}
          questions
            ${QUESTION_QUERY}
          topicGrade{
            ${TOPIC_GRADE}
            topic{
              videoAssistor
              name
            }
          }
          typeOf{
            ${BLOCK_TYPE}
              blocktypeconfigurationSet{
                ${BLOCK_TYPE_CONFIGURATION}
                key
                ${BLOCK_CONFIGURATION_KEYWORD}
              }
          }
      }

    }
`;

export const NEW_AI_BLOCK = `
    {
      ${BLOCK_PRESENTATON}
      block{
        ${BLOCK}
          questions
            ${QUESTION_QUERY}
          topicGrade{
            ${TOPIC_GRADE}
            topic{
              videoAssistor
              name
            }
          }
          typeOf{
            ${BLOCK_TYPE}
              blocktypeconfigurationSet{
                ${BLOCK_TYPE_CONFIGURATION}
                key
                ${BLOCK_CONFIGURATION_KEYWORD}
              }
          }
      }

    }
`;
