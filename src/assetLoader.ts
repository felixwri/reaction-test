import { Assets } from 'pixi.js';

export class AssetLoader {
    public static async loadAssets(): Promise<void> {
        await Assets.load('fonts/RacingSans.ttf');
    }
}
