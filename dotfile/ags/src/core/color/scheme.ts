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

    scheme.primary = new Color(json.primary);
    scheme.onPrimary = new Color(json.on_primary);
    scheme.primaryContainer = new Color(json.primary_container);
    scheme.onPrimaryContainer = new Color(json.on_primary_container);
    scheme.secondary = new Color(json.secondary);
    scheme.onSecondary = new Color(json.on_secondary);
    scheme.secondaryContainer = new Color(json.secondary_container);
    scheme.onSecondaryContainer = new Color(json.on_secondary_container);
    scheme.tertiary = new Color(json.tertiary);
    scheme.onTertiary = new Color(json.on_tertiary);
    scheme.tertiaryContainer = new Color(json.tertiary_container);
    scheme.onTertiaryContainer = new Color(json.on_tertiary_container);
    scheme.error = new Color(json.error);
    scheme.onError = new Color(json.on_error);
    scheme.errorContainer = new Color(json.error_container);
    scheme.onErrorContainer = new Color(json.on_error_container);
    scheme.background = new Color(json.background);
    scheme.onBackground = new Color(json.on_background);
    scheme.surface = new Color(json.surface);
    scheme.onSurface = new Color(json.on_surface);
    scheme.surfaceVariant = new Color(json.surface_variant);
    scheme.onSurfaceVariant = new Color(json.on_surface_variant);
    scheme.outline = new Color(json.outline);
    scheme.outlineVariant = new Color(json.outline_variant);
    scheme.shadow = new Color(json.shadow);
    scheme.scrim = new Color(json.scrim);
    scheme.inverseSurface = new Color(json.inverse_surface);
    scheme.inverseOnSurface = new Color(json.inverse_on_surface);
    scheme.inversePrimary = new Color(json.inverse_primary);

    return scheme;
  }
}
