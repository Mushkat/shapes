import {rotatePoint} from "./findObjects.js";

// Инициализация размера холста и перемещения координатной системы.
export function setupCanvas(group) {
    const canvas = document.getElementById("drawingCanvas");
    const ctx = canvas.getContext("2d");
    let centerX = group.p.x + group.s.x / 2;
    let centerY = group.p.y + group.s.y / 2;
    let point = rotatePoint(group.p.x, group.p.y, centerX, centerY, group.r);
    let groupX = group.p.x;
    let groupY = group.p.y;
    const groupWidth = group.s.x;
    const groupHeight = group.s.y;

    ctx.canvas.width = groupWidth;
    ctx.canvas.height = groupHeight;
    ctx.translate(-groupX, -groupY);

    return ctx;
}

// Отдельная функция для рисования фигур
export function drawShapes(ctx, list) {
    for (let i = 0; i < list.length; ++i) {
        list[i].draw(ctx);
    }
}

export function infoShapes(list) {
    for (let i = 0; i < list.length; ++i) {
        list[i].info();
    }
}
