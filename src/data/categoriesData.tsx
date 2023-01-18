import { IoGameController, IoMusicalNote } from "react-icons/io5";
import { FaFilm } from "react-icons/fa";
import { ReactElement } from "react";

export interface ICategory {
  id: number,
  name: string,
  iconSrc: ReactElement;
}

export const categories: ICategory[] = [
  { id: 1, name: 'Video', iconSrc: <FaFilm fontSize={30} /> },
  { id: 2, name: 'Music', iconSrc: <IoMusicalNote fontSize={30} /> },
  { id: 3, name: 'Games', iconSrc: <IoGameController fontSize={30} /> },
];