import { settings } from "../../settings/_app";
import { font } from "./font";

export function fonts() {
  return {
    profile: font('profile', settings.about.profile.font),
    workFeeling: font('workFeeling', settings.about.workFeeling.font)
  }
}
