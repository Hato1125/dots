import { Widget } from 'astal/gtk3';

import { Setting } from '@src/apps/settings/settings';
import { config } from '@src/context';

export default (vertical: boolean) => new Widget.Box({
  spacing: 6,
  vertical,
  children: [
    new Widget.Button({
      className: 'search-button',
      widthRequest: 38,
      heightRequest: 38,
      child: new Widget.Label({
        className: 'symbol-outlined',
        label: 'search'
      }),
      onClick: () => {
        Setting.show();
      },
    }),
    new Widget.Button({
      className: 'app-button',
      widthRequest: 38,
      heightRequest: 38,
      child: new Widget.Label({
        className: 'symbol-outlined',
        label: 'settings'
      }),
      onClick: () => {
        switch (config.bar.anchor.get()) {
          case 'bottom':
            config.bar.anchor.set('left');
            break;
          case 'left':
            config.bar.anchor.set('top');
            break;
          case 'top':
            config.bar.anchor.set('right');
            break;
          case 'right':
            config.bar.anchor.set('bottom');
            break;
        }
      },
    }),
    new Widget.Button({
      className: 'app-button',
      widthRequest: 38,
      heightRequest: 38,
      child: new Widget.Label({
        className: 'symbol-outlined',
        label: 'folder'
      })
    }),
    new Widget.Button({
      className: 'app-button',
      widthRequest: 38,
      heightRequest: 38,
      child: new Widget.Label({
        className: 'symbol-outlined',
        label: 'calendar_month'
      })
    }),
    new Widget.Button({
      className: 'app-button',
      widthRequest: 38,
      heightRequest: 38,
      child: new Widget.Label({
        className: 'symbol-outlined',
        label: 'apps'
      })
    }),
    new Widget.Button({
      className: 'app-button',
      widthRequest: 38,
      heightRequest: 38,
      child: new Widget.Label({
        className: 'symbol-outlined',
        label: 'android'
      })
    }),
  ]
});
