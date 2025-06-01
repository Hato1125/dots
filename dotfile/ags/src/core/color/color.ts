export class Color {
  private rgb: Uint8Array = new Uint8Array(3);

  static fromRGB(r: number, g: number, b: number): Color {
    const color = new Color();
    color.r = r;
    color.g = g;
    color.b = b;

    return color;
  }

  static fromRGBHexStr(rgb: string): Color {
    const hex = Number.parseInt(rgb.slice(1), 16);

    const color = new Color();
    color.r = (hex >> 16) & 0xff;
    color.g = (hex >> 8) & 0xff;
    color.b = hex & 0xff;

    return color;
  }

  static fromRGBHex(rgb: number): Color {
    const color = new Color();
    color.r = rgb >> 16 & 0xff;
    color.g = rgb >> 8 & 0xff;
    color.b = rgb & 0xff;

    return color;
  }

  get r(): number {
    return this.rgb[0]!;
  }

  get g(): number {
    return this.rgb[1]!;
  }

  get b(): number {
    return this.rgb[2]!;
  }

  set r(r: number) {
    this.rgb[0] = r & 0xff;
  }

  set g(g: number) {
    this.rgb[1] = g & 0xff;
  }

  set b(b: number) {
    this.rgb[2] = b & 0xff;
  }

  toHex(): number {
    return this.rgb[0]! << 16 | this.rgb[1]! << 8 | this.rgb[2]!;
  }

  toCode(): string {
    return `#${this.toHex().toString(16).padStart(6, '0')}`;
  }
}
