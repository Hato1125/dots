export class Color {
  private rgb: Uint8Array = new Uint8Array(3);

  constructor();
  constructor(rgb: number);
  constructor(rgb: string);
  constructor(r: number, g: number, b: number);

  constructor(r?: number | string, g?: number, b?: number) {
    switch (typeof r) {
      case 'string':
        const hex = Number.parseInt(r.slice(1), 16);
        this.rgb[0] = (hex >> 16) & 0xff;
        this.rgb[1] = (hex >> 8) & 0xff;
        this.rgb[2] = hex & 0xff;
        break;
      case 'number':
        if (typeof g === 'number' && typeof b === 'number') {
          this.rgb[0] = Math.min(Math.max(r, 0), 255);
          this.rgb[1] = Math.min(Math.max(g, 0), 255);
          this.rgb[2] = Math.min(Math.max(b, 0), 255);
        } else {
          this.rgb[0] = r >> 16 & 0xff;
          this.rgb[1] = r >> 8 & 0xff;
          this.rgb[2] = r & 0xff;
        }
        break;
    }
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

  toHex(): number {
    return this.rgb[0]! << 16 | this.rgb[1]! << 8 | this.rgb[2]!;
  }

  toCode(): string {
    return `#${this.toHex().toString(16).padStart(6, '0')}`;
  }
}
