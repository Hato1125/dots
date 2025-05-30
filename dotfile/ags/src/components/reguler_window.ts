import GObject from 'gi://GObject';
import { type ConstructProps, Gtk, astalify } from 'astal/gtk3';

export class RegularWindow extends astalify(Gtk.Window) {
  static { GObject.registerClass(this) }

  constructor(props: ConstructProps<
    RegularWindow,
    Gtk.ColorButton.ConstructorProps,
    { onColorSet: [] }
  >) {
    super(props as any)
  }
}
