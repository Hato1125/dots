import Wp from 'gi://AstalWp';

import { Widget } from 'astal/gtk3';
import { Variable, bind } from 'astal';

const audio = Wp.get_default()!.audio;
const speaker = audio.default_speaker;

const icon = Variable.derive([
  bind(speaker, 'mute'),
  bind(speaker, 'volume'),
], (mute: boolean, volume: number): string => {
  if (mute) {
    return 'volume_mute';
  }

  return volume >= 0.5 ? 'volume_up' : 'volume_down';
});

export default (_: boolean) => new Widget.Label({
  className: 'symbol-outlined',
  label: bind(icon),
  tooltipMarkup: bind(speaker, 'volume').as((volume: number): string => {
    return `${speaker.name} ${Math.floor(volume * 100)}%`;
  }),
});
