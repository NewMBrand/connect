import { MakerDeb } from '@electron-forge/maker-deb';
import { MakerRpm } from '@electron-forge/maker-rpm';
import { MakerSquirrel } from '@electron-forge/maker-squirrel';
import { MakerZIP } from '@electron-forge/maker-zip';
import { VitePlugin } from '@electron-forge/plugin-vite';
import type { ForgeConfig } from '@electron-forge/shared-types';
import * as fs from 'fs/promises';
import path from 'path';

const config: ForgeConfig = {
    packagerConfig: {
        extendInfo: 'assets/Info.plist',
        asar: true,
        osxSign: {},
        icon: 'assets/icon',
        overwrite: true,
    },
    rebuildConfig: {},
    makers: [new MakerSquirrel({}), new MakerZIP({}, ['darwin']), new MakerRpm({}), new MakerDeb({})],
    plugins: [
        new VitePlugin({
          // `build` can specify multiple entry builds, which can be Main process, Preload scripts, Worker process, etc.
          // If you are familiar with Vite configuration, it will look really familiar.
          build: [
            {
              // `entry` is just an alias for `build.lib.entry` in the corresponding file of `config`.
              entry: 'src/main.ts',
              config: 'vite.main.config.ts',
            },
            {
              entry: 'src/preload.ts',
              config: 'vite.preload.config.ts',
            },
          ],
          renderer: [
            {
              name: 'main_window',
              config: 'vite.renderer.config.ts',
            },
          ],
        }),
      ],
    publishers: [
        {
            name: '@electron-forge/publisher-electron-release-server',
            config: {
                baseUrl: 'http://localhost:8080',
                username: 'username',
                password: 'password',
            },
        },
  ],
  hooks: {
      generateAssets: async () => {
          try {
              const sourcePath = path.resolve(__dirname, 'node_modules/@powerhousedao/design-system/dist/icons.svg');
              const destinationPath = path.resolve(__dirname, 'public/icons.svg');
          
              await fs.copyFile(sourcePath, destinationPath);
            } catch (error) {
              console.error('Error occurred while copying the file:', error);
            }
      }
  }
};

export default config;