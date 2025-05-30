import { initContext } from '@src/context';
import { initCSS } from './style/style';

export async function initCore(): Promise<void> {
  await initContext();
  initCSS();
}
