import Canvas from '../canvas/Canvas.js';
import ApplyCircleMask from './ApplyCircleMask.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class CircleMaskImage extends Canvas {
    constructor(scene, x, y, key, frame, config) {
        super(scene, x, y);

        this.type = 'rexCircleMaskImage';
        var maskType = GetValue(config, 'maskType', 0);
        this.loadTexture(key, frame, maskType);
    }

    loadTexture(key, frame, maskType) {
        if (maskType === undefined) {
            maskType = 0;
        } else if (typeof (maskType) === 'string') {
            maskType = MASKTYPE[maskType];
        }

        this._textureKey = key;
        this._frameName = frame;
        super.loadTexture(key, frame);

        if (maskType !== null) {
            ApplyCircleMask(this.canvas, maskType);
        }
        this.dirty = true;
        return this;
    }
}

const MASKTYPE = {
    circle: 0,
    ellipse: 1,
}

export default CircleMaskImage;