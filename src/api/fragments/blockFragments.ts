import { NEW_MC_ANSWER_OPTION, NEW_R_ANSWER_OPTION, TOPIC_GRADE, NEW_O_ANSWER_OPTION, NEW_T_ANSWER_OPTION } from 'api/fragments/questionFragments';

export const BLOCK_CONFIGURATION_KEYWORD = `
    {
        id
        isActive
        name
    }
`;

export const BLOCK_TYPE = `

        id
        identifier
        isActive
        randomSlug
        name

`;

export const BLOCK_TYPE_CONFIGURATION = `

        id
        isActive
        value

`;

export const BLOCK = `
        id
        identifier
        isActive
        randomSlug
        createTimestamp
        updateTimestamp
        modality
        blockSize
        experiencePointsAvailable
        coinsAvailable
`;

export const BLOCK_PRESENTATON = `
        id
        hits
        errors
        total
        points
        bonusCoins
        coins
`;

export const BLOCK_QUESTION = `
    {
        id
        identifier
        randomSlug
        isCorrect
        isAnswered
    }
`;

export const BLOCK_QUESTION_PRESENTATION = `

        id
        identifier
        randomSlug

`;

export const QUESTION_IMAGE_ASSETS = `
{
        id
        identifier
        randomSlug
        image
}
`
export const QUESTION_AUDIO_ASSETS = `
{
        id
        identifier
        randomSlug
        order
        createTimestamp
        updateTimestamp
        audioFile
}`

export const QUESTION_BLOCK = `
blockPresentation {
        ${BLOCK_PRESENTATON}
        block {
          topicGrade{
              ${TOPIC_GRADE}
              topic {
                  videoAssistor
                  name
              }
            }
          questions {
            id
            questionType
            questionText
            questionAudioUrl
            questionImageAssets{
              id
              image
              order
            }
            questionAudioAssets {
              audioFile
              id
              order
            }
            answerOptions {
              id
              isCorrect
              ... on MultipleChoiceAnswerOptionSchema {
                ${NEW_MC_ANSWER_OPTION}
              }
              ... on MultipleSelectAnswerOptionSchema {
                ${NEW_MC_ANSWER_OPTION}
              }
              ... on TypeInAnswerOptionSchema {
                ${NEW_T_ANSWER_OPTION}
              }
              ... on OrderAnswerOptionSchema {
                ${NEW_O_ANSWER_OPTION}
              }
              ... on RelateAnswerOptionSchema {
                ${NEW_R_ANSWER_OPTION}
              }
            }
          }
        }
      }
`
