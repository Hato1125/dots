import { Variable, readFileAsync, writeFileAsync } from 'astal';

import { CONFIG_PATH, COLOR_PATH } from '@src/path';
import { Color } from '@core/color/color';
import { Scheme, SchemeType } from '@core/color/scheme';

export const config = {
  bar: {
    anchor: Variable('bottom'),
    components: {
      start: Variable([
        'workspace'
      ]),
      center: Variable([
        'apps'
      ]),
      end: Variable([
        'control_center',
        'datetime',
      ]),
      controlCenter: Variable([
        'volume',
        'network',
        'battery',
      ]),
    },
  },
  scheme: {
    dark: Variable(false),
    image: Variable(''),
    type: Variable(SchemeType.TonalSpot),
  }
};

export const scheme = Variable(new Scheme());

export async function initContext(): Promise<void> {
  scheme.subscribe(async (scheme: Scheme) => {
    const css = Object.entries(scheme)
      .map(([k, v]: [string, Color]): string => {
        return `@define-color ${k} ${v.toCode()};`;
      })
      .join('\n');

    await writeFileAsync(COLOR_PATH, css);
  });

  await loadConfig();

  scheme.set(
    await Scheme.fromImage(
      config.scheme.image.get(),
      config.scheme.type.get(),
      config.scheme.dark.get()
    )
  );
}

export async function loadConfig(): Promise<void> {
  const str = await readFileAsync(CONFIG_PATH);
  const json = JSON.parse(str);

  config.bar.anchor.set(json.bar.anchor);
  config.bar.components.start.set(json.bar.components.start);
  config.bar.components.center.set(json.bar.components.center);
  config.bar.components.end.set(json.bar.components.end);
  config.bar.components.controlCenter.set(json.bar.components.control_center);

  config.scheme.dark.set(json.scheme.dark);
  config.scheme.image.set(json.scheme.image);
  config.scheme.type.set(json.scheme.type);
}

export async function saveConfig(): Promise<void> {
  const json = {
    bar: {
      anchor: config.bar.anchor.get(),
      components: {
        start: config.bar.components.start.get(),
        center: config.bar.components.center.get(),
        end: config.bar.components.end.get(),
      },
    },
    scheme: {
      dark: config.scheme.dark.get(),
      image: config.scheme.image.get(),
      type: config.scheme.type.get(),
    },
  };

  await writeFileAsync(CONFIG_PATH, JSON.stringify(json, null, 2));
}
