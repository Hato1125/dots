import { Gtk, Widget } from 'astal/gtk3';

import { RegularWindow } from '@src/components/reguler_window';

let window: RegularWindow | null = null;

export namespace Setting {
  export function show(): void {
    if (!window) {
      window = new RegularWindow({
        width_request: 1000,
        height_request: 600,
        child: getLayout(),
      });

      window.show();
    }
  }

  export function close(): void {
    if (window) {
      window.close();
      window = null;
    }
  }
}

function getLayout(): Widget.Box {
  return new Widget.Box({
    className: 'settings',
    vertical: true,
    hexpand: false,
    children: [
      getSettingCategoryList(),
    ]
  });
}

function getSettingCategoryList(): Gtk.Widget {
  return new Widget.Box({
    className: 'category-list',
    vertical: true,
    expand: true,
    halign: Gtk.Align.START,
    children: [
      new Widget.Entry({
        className: 'entry',
        placeholderText: 'search',
        halign: Gtk.Align.CENTER,
      }),
      getSettingCategoryCard({
        icon: 'settings',
        title: 'System',
        description: 'Linux system-wide settings',
      }),
      getSettingCategoryCard({
        icon: 'palette',
        title: 'Theme',
        description: 'UI, wallpaper and scheme settings',
      }),
      getSettingCategoryCard({
        icon: 'settings',
        title: 'System',
        description: 'Linux system-wide settings',
      }),
      getSettingCategoryCard({
        icon: 'palette',
        title: 'Theme',
        description: 'UI, wallpaper and scheme settings',
      }),
      getSettingCategoryCard({
        icon: 'settings',
        title: 'System',
        description: 'Linux system-wide settings',
      }),
      getSettingCategoryCard({
        icon: 'palette',
        title: 'Theme',
        description: 'UI, wallpaper and scheme settings',
      }),
      getSettingCategoryCard({
        icon: 'settings',
        title: 'System',
        description: 'Linux system-wide settings',
      }),
      getSettingCategoryCard({
        icon: 'palette',
        title: 'Theme',
        description: 'UI, wallpaper and scheme settings',
      }),
    ]
  });
}

function getSettingCategoryCard(props: {
  icon: string,
  title: string,
  description: string
}): Widget.Button {
  return new Widget.Button({
    className: 'card',
    child: new Widget.Box({
      spacing: 18,
      children: [
        new Widget.Label({
          className: 'symbol-outlined',
          label: props.icon,
        }),
        new Widget.Box({
          vertical: true,
          children: [
            new Widget.Label({
              className: 'title',
              label: props.title,
              halign: Gtk.Align.START,
            }),
            new Widget.Label({
              className: 'description',
              label: props.description,
              halign: Gtk.Align.START,
            }),
          ]
        }),
      ]
    }),
  });
}
