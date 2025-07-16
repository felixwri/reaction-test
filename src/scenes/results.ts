import * as PIXI from 'pixi.js';
import { BaseScene } from './baseScene';
import { Routes } from '../constants/routes';
import { Colors } from '../constants/colors';
import { TextInput } from '../components/textInput';
import { Button } from '../components/button';
import { Leaderboard } from '../components/leaderboard';
import { Relative } from '../utils/layout';

export default class ResultsScene extends BaseScene {
    protected _background: PIXI.Graphics;
    protected _prompt: PIXI.Text;
    protected _results: PIXI.Text;
    protected _leaderboard: Leaderboard;
    protected _input: TextInput;
    protected _retryButton: Button;

    private _reactionTime: number;

    constructor(
        leaderboard: Leaderboard = new Leaderboard(),
        input: TextInput = new TextInput('Submit your time?', (value) => this.submitScore(value), {
            placeholder: 'Enter your name',
            defaultValue: 'Guest',
        }),
        button: Button = new Button('Try Again', () => this.end())
    ) {
        super();
        this._leaderboard = leaderboard;
        this._input = input;
        this._retryButton = button;
        this.init();
    }

    public start(data: { reactionTime: number }) {
        this.visible = true;
        this._reactionTime = data.reactionTime;
        this._results.text = `${this._reactionTime} ms`;

        // Exit after 20 seconds
        setTimeout(() => {
            this.end();
        }, 30 * 1000);
    }

    public end() {
        this._router.to(Routes.idle);
        this.visible = false;

        this._leaderboard.visible = false;
        this._input.visible = true;
    }

    protected init() {
        console.log('Result scene initialized');
        this._background = new PIXI.Graphics();
        this._background.rect(0, 0, Relative.width(1), Relative.height(1)).fill(Colors.darkGray);
        this.addChild(this._background);

        this._prompt = new PIXI.Text({
            text: 'Results',
            style: new PIXI.TextStyle({
                fontFamily: 'RacingSans',
                fontSize: 60,
                fill: '#ffffff',
                align: 'center',
            }),
        });
        this._prompt.anchor.set(0.5);
        this._prompt.position = Relative.set(0.5, 0.1);
        this.addChild(this._prompt);

        this._results = new PIXI.Text({
            text: `Waiting for results...`,
            style: new PIXI.TextStyle({
                fontFamily: 'RacingSans',
                fontSize: 100,
                fill: '#ffffff',
                align: 'left',
            }),
        });
        this._results.anchor.set(0.5);
        this._results.position = Relative.set(0.5, 0.2);
        this.addChild(this._results);

        this._input.position = Relative.set(0.5, 0.5);
        this.addChild(this._input);

        this._leaderboard.position = Relative.set(0.5, 0.3);
        this.addChild(this._leaderboard);
        this._leaderboard.visible = false;

        this._retryButton.position = Relative.set(0.5, 0.9);
        this.addChild(this._retryButton);
        this._retryButton.visible = true;
    }

    private submitScore(name: string) {
        this._leaderboard.visible = true;
        this._input.visible = false;
        this._leaderboard.addScore(name, this._reactionTime);
    }
}
