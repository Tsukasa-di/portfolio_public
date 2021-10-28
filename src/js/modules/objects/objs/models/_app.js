import { sofa } from "./sofa";
import { tv_cabinet } from "./tv_cabinet";
import { laptop } from "./laptop";
import { staircase } from "./staircase";
import { jet } from "./jet";
import { desk } from "./desk";
import { desk_chair } from "./desk_chair";
import { teddy } from "../toys/teddy";
import { book_holder } from "./book_holder";
import { photo_frames } from "./photo_frames";

export function models() {
  return {
    sofa: sofa(),
    tv_cabinet: tv_cabinet(),
    laptop: laptop(),
    staircase: staircase(),
    jet: jet(),
    desk: desk(),
    desk_chair: desk_chair(),
    teddy: teddy(),
    book_holder: book_holder(),
    photo_frames: photo_frames()
  }
}
