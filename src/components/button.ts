import { Color, Container, Graphics, Text, TextStyle } from 'pixi.js';
import { Colors } from '../constants/colors';

type ButtonOptions = {
    width?: number;
    height?: number;
    fillColor?: number;
    hoverColor?: number;
};

export class Button extends Container {
    private _label: string;
    private _background: Graphics;
    private _options: ButtonOptions;
    private _onClick: () => void;

    constructor(label: string, onClick: () => void, options?: ButtonOptions) {
        super();
        this._label = label;
        this._onClick = onClick;
        this._background = new Graphics();

        this._options = {
            width: options?.width || 200,
            height: options?.height || 50,
            fillColor: options?.fillColor || Colors.blue,
            hoverColor: options?.hoverColor || Colors.lightBlue,
        };

        this.init();
    }

    protected init() {
        this.updateGraphics();

        this._background.interactive = true;
        this._background.on('pointertap', this._onClick);

        this._background.on('pointerover', () => {
            this.updateGraphics(true);
        });

        this._background.on('pointerleave', () => {
            this.updateGraphics(false);
        });

        this.addChild(this._background);
        const text = new Text({
            text: this._label,
            style: new TextStyle({
                fontFamily: 'RacingSans',
                fontSize: 24,
                fill: '#ffffff',
                align: 'center',
            }),
        });

        text.anchor.set(0.5);
        text.position.set(this._background.width / 2, this._background.height / 2);

        this.pivot.set(this._background.width / 2, this._background.height / 2);

        this.addChild(text);
    }

    private updateGraphics(hover?: boolean) {
        this._background.clear();
        this._background.roundRect(0, 0, this._options.width, this._options.height, 10);
        this._background.fill(hover ? this._options.hoverColor : this._options.fillColor);
    }
}
