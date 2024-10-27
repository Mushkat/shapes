// Класс для Линий.
export class Line {
    constructor(x1, y1, x2, y2, lineWidth = 1, strokeStyle = 'black', lineDash = 'solid') {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.lineWidth = lineWidth;
        this.strokeStyle = strokeStyle;
        this.lineDash = lineDash;
    }

    // Функция получения информации об элементе.
    info() {
        console.log(this.x1, this.y1, this.x2, this.y2, this.lineWidth, this.strokeStyle, this.lineDash);
    }

    // Метод отрисовки линии.
    draw(ctx) {
        ctx.lineWidth = this.lineWidth;
        ctx.strokeStyle = this.strokeStyle;
        let space = Math.max(Math.abs(this.x1 - this.x2), Math.abs(this.y1 - this.y2)) * 0.04;
        if (this.lineDash === 'dash') {
            ctx.setLineDash([space / 2, space]);
        }
        ctx.beginPath();
        ctx.moveTo(this.x1, this.y1);
        ctx.lineTo(this.x2, this.y2);
        ctx.closePath();
        ctx.stroke();
        ctx.setLineDash([])
    }
}

// Класс для элемента Эллипс.
export class Ellipse {
    constructor(x, y, radiusX, radiusY, rotation = 0, strokeStyle = 'black',
                lineWidth = 1, lineDash = 'solid') {
        this.x = x;
        this.y = y;
        this.radiusX = radiusX;
        this.radiusY = radiusY;
        this.rotation = rotation;
        this.strokeStyle = strokeStyle;
        this.lineWidth = lineWidth;
        this.lineDash = lineDash;
    }

    // Получение информации об объекте.
    info() {
        console.log(this.x, this.y, this.radiusX, this.radiusY, this.rotation, this.strokeStyle, this.lineWidth, this.lineDash);
    }

    // Метод отрисовки эллипса
    draw(ctx) {
        ctx.beginPath();
        ctx.ellipse(
            this.x,
            this.y,
            this.radiusX,
            this.radiusY,
            this.rotation,
            0,
            2 * Math.PI
        );
        ctx.lineWidth = this.lineWidth;
        let space = Math.max(Math.abs(2 * this.radiusX), Math.abs(2 * this.radiusY)) * 0.04;
        if (this.lineDash === 'dash') {
            ctx.setLineDash([space / 2, space]);
        }
        if (this.strokeStyle) {
            ctx.strokeStyle = this.strokeStyle;
            ctx.stroke();
        }
        ctx.setLineDash([]);
    }
}
