import { book_holder, desk, desk_chair, laptop, teddy, tv_cabinet } from "./models";
import { globalLight, spotLight } from "./lights";
import { globalPlane } from "./world";

export const works = {
  globalPlane: globalPlane,
  globalLight: globalLight,
  spotLight: spotLight,
  desk: desk,
  desk_chair: desk_chair,
  teddy: teddy,
  book_holder: book_holder,
  tv_cabinet: tv_cabinet,
  laptop: laptop
}
