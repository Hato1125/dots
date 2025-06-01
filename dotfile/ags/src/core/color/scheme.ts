import { execAsync } from 'astal';

import { Color } from '@core/color/color';

export const SchemeType = {
  Content: 'scheme-content',
  Expressive: 'scheme-expressive',
  Fidelity: 'scheme-fidelity',
  FruitSalad: 'scheme-fruit-salad',
  Monoschrome: 'scheme-monochrome',
  Neutral: 'scheme-neutral',
  Rainbow: 'scheme-rainbow',
  TonalSpot: 'scheme-tonal-spot',
} as const;

export type SchemeType = typeof SchemeType[keyof typeof SchemeType];

export class Scheme {
  [key: string]: Color;

  primary: Color = new Color();
  onPrimary: Color = new Color();
  primaryContainer: Color = new Color();
  onPrimaryContainer: Color = new Color();
  secondary: Color = new Color();
  onSecondary: Color = new Color();
  secondaryContainer: Color = new Color();
  onSecondaryContainer: Color = new Color();
  tertiary: Color = new Color();
  onTertiary: Color = new Color();
  tertiaryContainer: Color = new Color();
  onTertiaryContainer: Color = new Color();
  error: Color = new Color();
  onError: Color = new Color();
  errorContainer: Color = new Color();
  onErrorContainer: Color = new Color();
  background: Color = new Color();
  onBackground: Color = new Color();
  surface: Color = new Color();
  onSurface: Color = new Color();
  surfaceVariant: Color = new Color();
  onSurfaceVariant: Color = new Color();
  outline: Color = new Color();
  outlineVariant: Color = new Color();
  shadow: Color = new Color();
  scrim: Color = new Color();
  inverseSurface: Color = new Color();
  inverseOnSurface: Color = new Color();
  inversePrimary: Color = new Color();

  static async fromColor(
    color: Color,
    type: SchemeType,
    dark: boolean,
  ): Promise<Scheme> {
    const json = JSON.parse(
      await execAsync(
        `matugen color hex '${color.toHex()}' -j hex -t ${type}`,
      ),
    );

    return Scheme.convertToScheme(
      dark ? json.colors.dark : json.colors.light,
    );
  }

  static async fromImage(
    path: string,
    type: SchemeType,
    dark: boolean,
  ): Promise<Scheme> {
    const json = JSON.parse(
      await execAsync(`matugen image '${path}' -j hex -t ${type}`),
    );

    return Scheme.convertToScheme(
      dark ? json.colors.dark : json.colors.light,
    );
  }

  private static convertToScheme(json: any): Scheme {
    const scheme = new Scheme();

    scheme.primary = Color.fromRGBHexStr(json.primary);
    scheme.onPrimary = Color.fromRGBHexStr(json.on_primary);
    scheme.primaryContainer = Color.fromRGBHexStr(json.primary_container);
    scheme.onPrimaryContainer = Color.fromRGBHexStr(json.on_primary_container);
    scheme.secondary = Color.fromRGBHexStr(json.secondary);
    scheme.onSecondary = Color.fromRGBHexStr(json.on_secondary);
    scheme.secondaryContainer = Color.fromRGBHexStr(json.secondary_container);
    scheme.onSecondaryContainer = Color.fromRGBHexStr(json.on_secondary_container);
    scheme.tertiary = Color.fromRGBHexStr(json.tertiary);
    scheme.onTertiary = Color.fromRGBHexStr(json.on_tertiary);
    scheme.tertiaryContainer = Color.fromRGBHexStr(json.tertiary_container);
    scheme.onTertiaryContainer = Color.fromRGBHexStr(json.on_tertiary_container);
    scheme.error = Color.fromRGBHexStr(json.error);
    scheme.onError = Color.fromRGBHexStr(json.on_error);
    scheme.errorContainer = Color.fromRGBHexStr(json.error_container);
    scheme.onErrorContainer = Color.fromRGBHexStr(json.on_error_container);
    scheme.background = Color.fromRGBHexStr(json.background);
    scheme.onBackground = Color.fromRGBHexStr(json.on_background);
    scheme.surface = Color.fromRGBHexStr(json.surface);
    scheme.onSurface = Color.fromRGBHexStr(json.on_surface);
    scheme.surfaceVariant = Color.fromRGBHexStr(json.surface_variant);
    scheme.onSurfaceVariant = Color.fromRGBHexStr(json.on_surface_variant);
    scheme.outline = Color.fromRGBHexStr(json.outline);
    scheme.outlineVariant = Color.fromRGBHexStr(json.outline_variant);
    scheme.shadow = Color.fromRGBHexStr(json.shadow);
    scheme.scrim = Color.fromRGBHexStr(json.scrim);
    scheme.inverseSurface = Color.fromRGBHexStr(json.inverse_surface);
    scheme.inverseOnSurface = Color.fromRGBHexStr(json.inverse_on_surface);
    scheme.inversePrimary = Color.fromRGBHexStr(json.inverse_primary);

    return scheme;
  }
}
