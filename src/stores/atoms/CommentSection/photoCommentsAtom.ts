import { atom } from "jotai";
export interface CommentType {
  _id: string;
  text: string;
  userId: {
    _id: string;
    username: string;
    avatarUrl: string;
  };
  createdAt: string;
}

const photoCommentsAtom = atom<CommentType[]>([]);
export default photoCommentsAtom;
