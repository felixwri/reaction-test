import { Container, Graphics, Text } from 'pixi.js';

export class Leaderboard extends Container {
    private _scores: { name: string; score: number; element: Container }[];
    private _scoreContainer: Container;
    private _maxEntries: number;
    private _width: number = 400;
    private _scoreCardHeight: number = 50;
    private _title: string = 'Leaderboard';
    private _scoreCardPadding: number = 10;
    private _scoreCardMargin: number = 5;

    constructor(maxEntries: number = 10) {
        super();
        this._scores = [];
        this._maxEntries = maxEntries;
        this._scoreContainer = new Container();
        this.init();
    }

    private init() {
        const title = new Text({
            text: this._title,
            style: {
                fontFamily: 'RacingSans',
                fontSize: 36,
                fill: '#ffffff',
                align: 'center',
            },
        });
        title.anchor.set(0.5);

        const background = new Graphics();
        background.roundRect(0, 0, 400, title.height * 2, 10);
        background.fill(0x333333);

        this.addChild(background);

        title.position.set(background.width / 2, title.height);

        this.addChild(title);

        this.pivot.set(background.width / 2, 0);

        this._scoreContainer.position.set(0, title.height * 2);

        this.addChild(this._scoreContainer);
    }

    /**
     * Creates a score card
     * Consists of a background, name and score text
     *
     * @param name
     * @param score
     * @returns Container with the score card
     */
    private createScoreCard(name: string, score: number) {
        const scoreCard = new Container();
        const background = new Graphics();
        background.roundRect(0, 0, this._width, this._scoreCardHeight, 10);
        background.fill(0x444444);
        scoreCard.addChild(background);

        const nameText = new Text({
            text: name,
            style: {
                fontFamily: 'RacingSans',
                fontSize: 24,
                fill: '#ffffff',
            },
        });
        const scoreText = new Text({
            text: `${score} ms`,
            style: {
                fontFamily: 'RacingSans',
                fontSize: 24,
                fill: '#ffffff',
            },
        });
        nameText.anchor.set(0, 0.5);
        scoreText.anchor.set(0, 0.5);

        const padding = this._scoreCardPadding;
        nameText.position.set(padding, this._scoreCardHeight / 2);
        scoreText.position.set(this._width - scoreText.width - padding, this._scoreCardHeight / 2);

        scoreCard.addChild(nameText);
        scoreCard.addChild(scoreText);

        return scoreCard;
    }

    /**
     * Sets the position of every score card
     */
    private recalculatePositions() {
        for (let i = 0; i < this._scores.length; i++) {
            this._scores[i].element.position.set(
                0,
                i * (this._scores[i].element.height + this._scoreCardMargin) + this._scoreCardMargin
            );
        }
    }

    public addScore(name: string, newScore: number) {
        console.log(`Adding score: ${name} - ${newScore} ms`);

        /**
         * Add to the start of the leaderboard
         */
        if (this._scores.length === 0) {
            const newScoreCard = this.createScoreCard(name, newScore);
            this._scores.push({ name, score: newScore, element: newScoreCard });
            this._scoreContainer.addChild(newScoreCard);
            this.recalculatePositions();
            return;
        }

        /**
         * Add to the middle of the leaderboard
         */
        for (let i = 0; i < this._scores.length; i++) {
            if (this._scores[i].score > newScore) {
                const oldScore = this._scores[i];
                const newScoreCard = this.createScoreCard(name, newScore);

                const element = {
                    name: name,
                    score: newScore,
                    element: newScoreCard,
                };

                this._scores.splice(i, 0, element);

                this._scoreContainer.addChildAt(newScoreCard, i + 1);

                if (this._scores.length > this._maxEntries) {
                    this._scoreContainer.removeChildAt(this._maxEntries);
                    this._scores[this._scores.length - 1].element.destroy();
                    this._scores.pop();
                }

                this.recalculatePositions();
                return;
            }
        }

        /**
         * Append to the end of the leaderboard
         */
        if (this._scores.length < this._maxEntries) {
            const newScoreCard = this.createScoreCard(name, newScore);
            this._scores.push({ name, score: newScore, element: newScoreCard });
            this._scoreContainer.addChild(newScoreCard);

            this.recalculatePositions();
        }
    }
}
