import { AnyStyledComponent } from 'styled-components';

export interface IAnswer {
  id: string;
  identifier: string;
  isCorrect: boolean;
  randomSlug: string;
  answerText: string;
  explanation: string;
  image: string;
  audioFile: string;
  video: string;
  answerAudioUrl: string;
}

export interface IQuestionImageAsset {
  id: string;
  image: string;
  identifier: string;
  randomSlug: string;
}

export interface IQuestion {
  id: string;
  identifier: string;
  isActive: boolean;
  randomSlug: string;
  questionText: string;
  questionAudioUrl: string;
  answeroptionSet: IAnswer[];
  questionAudioAssets: any;
  questionImageAssets: IQuestionImageAsset[];
}

export interface ITopic {
  id: string;
  identifier: string;
  isActive: boolean;
  randomSlug: string;
  slug: string;
  lft: number;
  rght: number;
  treeId: number;
  level: number;
  name: string;
  questionSet: IQuestion[];
  subTopics: ITopic[];
  videoAssistor: string;
}

export interface ITopicGrade {
  id: string;
  identifier: string;
  isActive: boolean;
  randomSlug: string;
  topic: ITopic;
  standardCode: string;
  blockSet: IBlock[];
}

export interface IBlockConfigurationKeyword {
  id: string;
  isActive: boolean;
  name: string;
}

export interface IBlockConfiguration {
  id: string;
  isActive: boolean;
  value: string;
  key: IBlockConfigurationKeyword;
}

export interface IBlockType {
  id: string;
  identifier: string;
  isActive: boolean;
  randomSlug: string;
  name: string;
  blocktypeconfigurationSet: IBlockConfiguration;
}

export interface IBlock {
  id: string;
  identifier: string;
  isActive: boolean;
  randomSlug: string;
  engangementPointsAvailable: number;
  coinsAvailable: number;
  batteryPointsAvailable: number;
  typeOf: IBlockType;
  questions: IQuestion[];
  topicGrade: ITopicGrade;
}

export interface IBlockPresentation {
  id: string;
  identifier: string;
  randomSlug: string;
  block: IBlock;
}

export interface IAIBlock {
  id: string;
  identifier: string;
  randomSlug: string;
  block: {
    topicGrade: any
    questions: Array<any>
  };
}

export interface IAIQuestion {
  id: string
  questionText: string
  questionAudioUrl: string
  questionImageAssets: {
    id: number
    image: string
    order: number
  }[]
  questionAudioAssets: {
    id: number
    audioFile: string
    order: number
  }[]
  questionType: 'T' | 'MC' | 'O' | 'R' | 'MS'
  answerOptions: Array<any>
}

export interface ITypeInAnswerOptionInput {
  answerOption: number
  typedAnswer: string
}

export interface IRelateAnswerOptionInput {
  key: string
  value: string
}
