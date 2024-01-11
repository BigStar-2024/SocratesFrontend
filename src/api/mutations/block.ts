import {STUDENT} from '../fragments/studentFragments';
import {BLOCK_PRESENTATON, QUESTION_BLOCK} from '../fragments/blockFragments';
import {BLOCK_PRESENTATION_QUERY} from '../queries/questions';
import {
  NEW_MC_ANSWER_OPTION,
  NEW_R_ANSWER_OPTION,
  TOPIC_GRADE,
  NEW_O_ANSWER_OPTION,
  NEW_T_ANSWER_OPTION,
} from 'api/fragments/questionFragments';
// import { QUESTION } from '../fragments/questionFragments'
export const FINISH_BLOCK_PRESENTATION = (
  block_presentation_id: string,
  batteryLevel: number,
  hits: number,
  errors: number,
  bonusCoins: number,
  questionResults: any
) => `
finishBlockPresentation( blockPresentationId: ${block_presentation_id}, batteryLevel: ${batteryLevel}, errors: ${errors}, hits: ${hits}, bonusCoins: ${bonusCoins}, questions: ${questionResults} ) {
    blockPresentation{
        ${BLOCK_PRESENTATON}
    }
    student {
        ${STUDENT}
    }
}
`;
export const FINISH_BLK_PT = (
  blkPTId: string,
  batteryLevel: number,
  hits: number,
  errors: number,
  bonusCoins: number,
  questions: string
) => `
finishBlockPresentation(
  batteryLevel: ${batteryLevel},
  blockPresentationId: ${blkPTId},
  bonusCoins: ${bonusCoins},
  errors: ${errors},
  hits: ${hits},
  questions: ${questions}
) {
  blockPresentation{
    ${BLOCK_PRESENTATON}
  }
}
`;

export const CREATE_AI_BLOCK_PRESENTATION = (aokId: number) => `
createAiBlockPresentation( aokId: ${aokId}) {
    blockPresentation ${BLOCK_PRESENTATION_QUERY}
}
`;

export const CREATE_PATH_BLOCK_PRESENTATION = (
  studentId: number,
  topicId: number
) => `
createPathBlockPresentation( studentId: ${studentId}, topicId: ${topicId}) {
    blockPresentation ${BLOCK_PRESENTATION_QUERY}
}
`;

export const CREATE_NEW_AI_BLOCK = (aokId: number, studentId: number) => `
mutation AIBlock {
    createAiBlockPresentation(aokId: ${aokId}, studentId: ${studentId}) {
      ${QUESTION_BLOCK}
    }
  }
`;

export const CREATE_NEW_PATH_BLOCK = (topicId: number, studentId: number) => `
mutation {
  createPathBlockPresentation(studentId: ${studentId}, topicId: ${topicId}) {
      ${QUESTION_BLOCK}
    }
  }
`;

export const CREATE_QUESTION_BLOCK = (
  studentId: number,
  questionIds: Array<number>
) => `
mutation createBlockPresentationByQuestionId{
  createBlockPresentationByQuestionId(
    studentId:${studentId},
    questionIds:[${questionIds.toString()}]
  ){
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
  }
}
`;

// TODO: This is for development test, no need for production
export const GET_QUESIONS = (blockId: number) => `{
  blockPresentationById(id: ${blockId}) {
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
}
`;

export const FETCH_STUDENT_ANSWER_HISTORY = (
  studentId: number,
  period: number,
  answerStatus: string
) => `
query {
  blockQuestionPresentationHistoryByStudentIdAndPeriodAndAnswerstate(id: ${studentId}, period: ${period}, answerState: "${answerStatus}") {
    id
    updateTimestamp
    blockQuestionPresentation{
      id
      topic {
        name
        areaOfKnowledge {
          name
        }
      }
      typedAnswer
      status
      question {
        id
        questionType
        questionText
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
      chosenAnswer {
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

`;
