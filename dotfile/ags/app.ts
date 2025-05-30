import { execAsync } from 'astal';

import { MAIN_FILE_PATH, CONFIG_DIR } from '@src/path';

console.time('build');
await execAsync(`bun run ${CONFIG_DIR}/build.ts --release`)
  .then(() => {
    console.timeEnd('build');
    import(`file://${MAIN_FILE_PATH}`);
  });
