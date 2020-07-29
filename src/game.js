import { Point, FLY_DISPLAY_WIDTH, FLY_DISPLAY_HEIGHT, SIGHT_DISPLAY_WIDTH, SIGHT_DISPLAY_HEIGHT, CRATER_DISPLAY_WIDTH, CRATER_DISPLAY_HEIGHT } from './helper'
import flyImgStr from './img/fly.png'
import sightImgStr from './img/sight.png'
import craterImgStr from './img/crater.png'


let flyImg = new Image()
flyImg.onload = () => {
    console.log('flyImg onload!')
}
flyImg.src = flyImgStr

let sightImg = new Image()
sightImg.onload = () => {
    console.log('sightImg onload!')
}
sightImg.src = sightImgStr

let craterImg = new Image()
craterImg.onload = () => {
    console.log('craterImg onload!')
}
craterImg.src = craterImgStr


export class Game {

    setup() {
        this.stageHeight = this.cfg.stageHeight
        this.stageWidth = this.cfg.stageWidth
        this.flySpeed = this.cfg.flySpeed
        this.flyCount = this.cfg.flyCount
        this.allowedPrecisionErrorPixel = this.cfg.allowedPrecisionErrorPixel

        this.fly = [];
        for (let i = 0; i < this.flyCount; i++) {
            let y = Math.floor(Math.random() * this.stageHeight)
            let x = Math.floor(Math.random() * this.stageWidth)
            this.fly.push(new Point(x, y))
        }

        this.score = 0
        this.mouse = new Point()

        // clean after draw
        this.firePos = null;
        this.deadList = [];
    }

    load_config(cfg) {
        this.cfg = cfg;
    }

    new_round() {
        this.setup();
        console.log('new round started...')
    }

    constructor(cfg) {
        this.load_config(cfg)

        this.new_round()
    }

    stat() {
        return {
            score: this.score,
        }
    }

    tick() {
        // move fly
        for (let f of this.fly) {
            let x = Math.random() - 0.5
            let y = Math.random() - 0.5
            f.x += x * this.flySpeed
            f.y += y * this.flySpeed

            if (f.x < 0) {
                f.x = 0;
            } else if (f.x > this.stageWidth) {
                f.x = this.stageWidth
            }

            if (f.y < 0) {
                f.y = 0;
            } else if (f.y > this.stageHeight) {
                f.y = this.stageHeight
            }
        }

        // simulate fire
        if (this.firePos) {
            this.fly = this.fly.filter(f => {
                if (Math.abs(this.firePos.x - f.x) < this.allowedPrecisionErrorPixel) {
                    if (Math.abs(this.firePos.y - f.y) < this.allowedPrecisionErrorPixel) {
                        this.deadList.push(f)
                        this.score++;
                        return false;
                    }
                }
                return true;
            })
        }
    }


    updateMousePosition(mouse) {
        if (mouse.x !== this.mouse.x && mouse.y !== this.mouse.y) {
            // console.log('new mouse ', mouse)
            this.mouse = mouse;
        }
    }

    fire() {
        this.firePos = this.mouse
    }

    draw(ctx) {
        // draw fly
        {
            if (this.fly.length === 0) {
                ctx.font = "60px Verdana";
                ctx.strokeText('You Win', this.stageWidth / 2, this.stageHeight / 2, this.stageWidth)
            }
            for (let f of this.fly) {
                ctx.drawImage(flyImg, f.x - FLY_DISPLAY_WIDTH / 2, f.y - FLY_DISPLAY_HEIGHT / 2, FLY_DISPLAY_WIDTH, FLY_DISPLAY_HEIGHT)
            }
        }

        // draw crater
        {
            if (this.firePos) {
                ctx.drawImage(craterImg, this.firePos.x - CRATER_DISPLAY_WIDTH / 2, this.firePos.y - CRATER_DISPLAY_HEIGHT / 2, CRATER_DISPLAY_WIDTH, CRATER_DISPLAY_HEIGHT)

                // clean
                this.firePos = null;
            }
        }

        // draw sight
        {
            ctx.drawImage(sightImg, this.mouse.x - SIGHT_DISPLAY_WIDTH / 2, this.mouse.y - SIGHT_DISPLAY_HEIGHT / 2, SIGHT_DISPLAY_WIDTH, SIGHT_DISPLAY_HEIGHT)
        }
    }
}