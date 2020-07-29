export const STAGE_WIDTH = 640
export const STAGE_HEIGHT = 480

// fly图片大小
export const FLY_DISPLAY_HEIGHT = 100
export const FLY_DISPLAY_WIDTH = 100

// 瞄准镜图片大小
export const SIGHT_DISPLAY_HEIGHT = 130
export const SIGHT_DISPLAY_WIDTH = 130

// 弹痕图片大小
export const CRATER_DISPLAY_HEIGHT = 100
export const CRATER_DISPLAY_WIDTH = 100

export const GAME_CONFIG = {
    stageHeight: STAGE_HEIGHT,
    stageWidth: STAGE_WIDTH,
    // fly数量
    flyCount: 3,
    // fly飞行速度
    flySpeed: 40,
    // 瞄准误差，越高越容易打中
    allowedPrecisionErrorPixel: 30,
}

// 刷新率，越高越流畅，越卡
export const REFRESH_ITN = 1000 / 8


export class Point {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
}