import { Graphics, Text, TextStyle } from 'pixi.js';
import { BaseScene } from './baseScene';
import { Routes } from '../constants/routes';
import { Relative } from '../utils/layout';
import { Colors } from '../constants/colors';
import gsap from 'gsap';

export default class IdleScene extends BaseScene {
    protected _background: Graphics;
    protected _title: Text;
    protected _prompt: Text;
    protected _timeline: gsap.core.Timeline;

    private _clicked: boolean = false;

    constructor() {
        // Initialize the idle scene
        super();
        this.init();
    }

    public start() {
        this._clicked = false;
        this.visible = true;
    }

    public end() {
        if (this._clicked) {
            return;
        }
        this._clicked = true;

        this._timeline = gsap.timeline();
        this._router.to(Routes.game);

        this._timeline.fromTo(
            this,
            {
                pixi: {
                    y: 0,
                },
            },
            {
                pixi: {
                    y: Relative.height(-1),
                },
                duration: 1,
                ease: 'power2.inOut',
                onComplete: () => {
                    this.visible = false;
                    this._timeline.kill();
                    this.y = 0;
                },
            }
        );
    }

    protected init() {
        console.log('Idle scene initialized');

        this._background = new Graphics();
        this._background.interactive = true;
        this._background.on('pointertap', () => {
            this.end();
        });
        this._background.rect(0, 0, Relative.width(1), Relative.height(1)).fill(Colors.blue);
        this.addChild(this._background);

        this._title = new Text({
            text: 'Reaction Test',
            style: new TextStyle({
                fontFamily: 'RacingSans',
                fontSize: 100,
                fill: '#ffffff',
                align: 'center',
            }),
        });
        this._title.anchor.set(0.5);
        this._title.position = Relative.set(0.5, 0.5);
        this.addChild(this._title);

        this._prompt = new Text({
            text: 'Click to start',
            style: new TextStyle({
                fontFamily: 'sans-serif',
                fontSize: 50,
                fill: '#ffffff',
                align: 'center',
            }),
        });
        this._prompt.anchor.set(0.5);
        this._prompt.position = Relative.set(0.5, 0.6);
        this.addChild(this._prompt);

        gsap.to(this._prompt, {
            pixi: {
                alpha: 0,
            },
            duration: 1,
            ease: 'power2.inOut',
            yoyo: true,
            repeat: -1,
        });
    }
}
