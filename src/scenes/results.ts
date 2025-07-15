import * as PIXI from 'pixi.js';
import { BaseScene } from './baseScene';
import { Routes } from '../constants/routes';

export default class ResultsScene extends BaseScene {
    protected _background: PIXI.Graphics;
    protected _prompt: PIXI.Text;
    protected _results: PIXI.Text;

    private _reactionTime: number;

    constructor() {
        // Initialize the game scene
        super();
        this.init();
    }
    
    public start(data: { reactionTime: number }) {
        this.visible = true;

        const { reactionTime } = data as { reactionTime: number };

        this._reactionTime = reactionTime as number;
        this._results.text = `${this._reactionTime} ms`;
    }

    public end() {
        this._router.to(Routes.idle);
        this.visible = false;
    }

    protected init() {
        console.log('Result scene initialized');
        // Additional setup for the game scene can go here
        this._background = new PIXI.Graphics();

        this._background.interactive = true;
        this._background.on('pointertap', () => {
            this.end();
        });

        this._background.rect(0, 0, window.innerWidth, window.innerHeight).fill(0x22ee44);
        this.addChild(this._background);

        this._prompt = new PIXI.Text({
            text: 'Results',
            style: new PIXI.TextStyle({
                fontFamily: 'RacingSans',
                fontSize: 100,

                fill: '#ffffff',
                align: 'center'
            })
        });
        this._prompt.anchor.set(0.5);
        this._prompt.position.set(window.innerWidth / 2, window.innerHeight / 2);
        this.addChild(this._prompt);

        this._results = new PIXI.Text({
            text: `Waiting for results...`,
            style: new PIXI.TextStyle({
                fontSize: 50,
                fill: '#ffffff',
                align: 'left'
            })
        });
        this._results.position.set(window.innerWidth / 2, window.innerHeight / 2 + 100);
        this.addChild(this._results);
    }
}