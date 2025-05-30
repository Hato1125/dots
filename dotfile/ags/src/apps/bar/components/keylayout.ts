import Hyprland from 'gi://AstalHyprland';

import { Widget } from 'astal/gtk3';
import { Variable, bind, readFileAsync } from 'astal';

const keylayout = Variable('none');
const layoutName = Variable('none');

async function getLayoutName(layout: string): Promise<string> {
  const xkb_base = await readFileAsync('/usr/share/X11/xkb/rules/base.lst');

  const layout_names = xkb_base.split('\n')
    .find((name: string): boolean => name.includes(layout));

  if (layout_names) {
    return (layout_names.trim().split(/\s+/).at(0) as string)
      .replace(/[0-9]/g, '');
  }

  return 'none';
}

export default (_: boolean) => {
  const hyprland = Hyprland.get_default();

  hyprland.connect('keyboard-layout', async (_0, _1, layout: string) => {
    if (layoutName.get() != layout) {
      layoutName.set(layout);
      keylayout.set(
        await getLayoutName(layout)
      );
    }
  });

  return new Widget.Label({
    className: 'keylayout',
    label: bind(keylayout),
    tooltipMarkup: bind(layoutName),
  });
}
