import { IClassmate } from './classMate';


export interface IGroup {
  groupMembers: Array<IClassmate>;
  grade: string;
  areasOfKnowledge: string[];
}
