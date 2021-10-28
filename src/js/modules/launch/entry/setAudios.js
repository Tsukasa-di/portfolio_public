import { AUDIOS, PATHS } from "../../global/variables";

export function setAudios() {
  const bgm = new Audio(PATHS.root + 'assets/audio/home.mp3');
  bgm.volume = 0.5;
  bgm.loop = true;
  AUDIOS.bgm = bgm;

  const whisperNoize = new Audio(PATHS.root + 'assets/audio/transitions/whisper-noize.mp3');
  whisperNoize.volume = 0.15;
  whisperNoize.loop = true;
  AUDIOS.whisperNoize = whisperNoize;

  const glitch = new Audio(PATHS.root + 'assets/audio/transitions/glitch.mp3');
  glitch.volume = 0.5;
  glitch.loop = true;
  AUDIOS.glitch = glitch;

  const typeWriting = new Audio(PATHS.root + 'assets/audio/transitions/type-writing.mp3');
  typeWriting.volume = 0.7;
  typeWriting.loop = true;
  AUDIOS.typeWriting = typeWriting;

  const glitchRadio = new Audio(PATHS.root + 'assets/audio/soundEffects/glitch-radio.mp3');
  glitchRadio.volume = 0.8;
  glitchRadio.loop = true;
  AUDIOS.glitchRadio = glitchRadio;

  const ui = {};
  AUDIOS.ui = {};

  ui.click = new Audio(PATHS.root + 'assets/audio/ui/click.mp3')
  ui.click.volume = 0.65;
  AUDIOS.ui.click = ui.click;

  ui.rollover = new Audio(PATHS.root + 'assets/audio/ui/rollover.mp3')
  ui.rollover.volume = 0.5;
  AUDIOS.ui.rollover = ui.rollover;

  ui.prompt = new Audio(PATHS.root + 'assets/audio/ui/prompt.mp3')
  ui.prompt.volume = 0.1;
  AUDIOS.ui.prompt = ui.prompt;

  const lifeSounds = {};
  AUDIOS.lifeSounds = {};

  lifeSounds.public = new Audio(PATHS.root + 'assets/audio/lifeSounds/public.mp3')
  lifeSounds.public.volume = 0.15;
  lifeSounds.public.loop = true;
  AUDIOS.lifeSounds.public = lifeSounds.public;

  lifeSounds.school = new Audio(PATHS.root + 'assets/audio/lifeSounds/school.mp3')
  lifeSounds.school.volume = 0.7;
  lifeSounds.school.loop = true;
  AUDIOS.lifeSounds.school = lifeSounds.school;
}
