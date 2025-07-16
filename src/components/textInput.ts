import { Color, Container, defaultValue, Graphics, Text } from 'pixi.js';
import { Input } from '@pixi/ui';
import { Button } from './button';
import { Colors } from '../constants/colors';

type InputOptions = {
    width?: number;
    height?: number;
    backgroundColor?: number;
    placeholder?: string;
    defaultValue?: string;
};

export class TextInput extends Container {
    private _label: string;
    private _background: Graphics;
    private _onSubmit: (value: string) => void;
    private _options: InputOptions;
    private _input: Input;

    constructor(label: string, onSubmit: (value: string) => void, options?: InputOptions) {
        super();
        this._label = label;
        this._background = new Graphics();
        this._onSubmit = onSubmit;

        this._options = {
            width: options?.width || 400,
            height: options?.height || 50,
            backgroundColor: options?.backgroundColor || Colors.blue,
            placeholder: options?.placeholder || '',
            defaultValue: options?.defaultValue || '',
        };

        this.init();
    }

    protected init() {
        this._background.roundRect(0, 0, this._options.width, this._options.height, 10);
        this._background.fill(this._options.backgroundColor);

        this.addChild(this._background);

        this._input = new Input({
            bg: this._background,
            placeholder: this._options.placeholder,
            maxLength: 20,
            textStyle: {
                fontFamily: 'RacingSans',
                fill: '#ffffff',
            },
            padding: {
                top: 15,
                right: 15,
                bottom: 15,
                left: 15,
            },
        });

        this.addChild(this._input);

        const text = new Text({
            text: this._label,
            style: {
                fontFamily: 'RacingSans',
                fontSize: 24,
                fill: '#ffffff',
                align: 'center',
            },
        });

        text.anchor.set(0.5);
        text.position.set(this._background.width / 2, -this._background.height / 2);
        this.addChild(text);

        this.pivot.set(this._background.width / 2, this._background.height / 2);

        const button = new Button('Submit', () => {
            this._onSubmit(this._input.value || this._options.defaultValue);
        });
        button.position.set(this._background.width / 2, this._background.height + 50);
        this.addChild(button);
    }
}
