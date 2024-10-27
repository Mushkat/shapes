import {Ellipse, Line} from './elements.js';

// Генерирация массивов элементов фигуры из объектов JSON.
export function findObjects(shapes) {
    let lines = [];
    let backLines = [];
    let ellipses = [];
    let backEllipses = [];
    const group = shapes[0];

    for (let i = 0; i < shapes.length; ++i) {
        let shape = shapes[i];

        if (shape.n === 'group') {
            continue;
        }

        if (shape.n === 'geometry/segment') {
            let tempLines = segmentProcess(shape, group);
            if (shape.a.lineDash === 'solid') {
                lines = lines.concat(tempLines);
            } else {
                backLines = backLines.concat(tempLines);
            }

        } else if (shape.n === 'geometry/ellipse') {
            let ellipse = ellipseProcess(shape)
            if (shape.a.lineDash === 'solid') {
                ellipses.push(ellipse);
            } else {
                backEllipses.push(ellipse);
            }
        }
    }
    return [group, lines, backLines, ellipses, backEllipses];
}

// Обработка объекта 'geometry/segment'.
// Возвращает линии с глобальными координатами.
function segmentProcess(shape, group) {
    const shapeCenterX = shape.p.x + shape.s.x / 2;
    const shapeCenterY = shape.p.y + shape.s.y / 2;

    // Получение списка локальных точек.
    const pString = shape.a.points.split(';');
    const pNum = [];
    for (let j = 0; j < pString.length; ++j) {
        const temp = pString[j].split(',');
        for (let k = 0; k < temp.length; ++k) {
            pNum.push(parseFloat(temp[k]));
        }
    }

    const lines = [];
    for (let j = 0; j < pNum.length; j += 4) {
        // Масштабируем точки относительно размеров `shape`.
        let x1 = shape.p.x + pNum[j] * shape.s.x;
        let y1 = shape.p.y + pNum[j + 1] * shape.s.y;
        let x2 = shape.p.x + pNum[j + 2] * shape.s.x;
        let y2 = shape.p.y + pNum[j + 3] * shape.s.y;

        // Применяем поворот относительно центра фигуры `shape`.
        const rotatedPoint1 = rotatePoint(x1, y1, shapeCenterX, shapeCenterY, shape.r);
        const rotatedPoint2 = rotatePoint(x2, y2, shapeCenterX, shapeCenterY, shape.r);

        // Создаем линию с новыми координатами.
        const line = new Line(
            rotatedPoint1.x,
            rotatedPoint1.y,
            rotatedPoint2.x,
            rotatedPoint2.y,
            shape.a.lineWidth,
            shape.a.strokeStyle,
            shape.a.lineDash
        );
        lines.push(line);
    }

    return lines;
}

// Обработка объекта 'geometry/ellipse'
function ellipseProcess(shape) {
    let startX = shape.p.x;
    let startY = shape.p.y;
    let width = shape.s.x;
    let height = shape.s.y;
    const centerX = startX + width / 2;
    const centerY = startY + height / 2;
    const radiusX = shape.s.x / 2;
    const radiusY = shape.s.y / 2;
    const rotation = shape.r;
    let strokeStyle = shape.a.strokeStyle;
    let lineWidth = shape.a.lineWidth;
    let lineDash = shape.a.lineDash;
    return new Ellipse(centerX, centerY, radiusX, radiusY, rotation, strokeStyle, lineWidth, lineDash);
}

// Функция для поворота точки относительно центра элемента.
export function rotatePoint(x, y, centerX, centerY, angle) {

    const cosTheta = Math.cos(angle);
    const sinTheta = Math.sin(angle);

    const dx = x - centerX;
    const dy = y - centerY;

    const rotatedX = dx * cosTheta - dy * sinTheta + centerX;
    const rotatedY = dx * sinTheta + dy * cosTheta + centerY;

    return {x: rotatedX, y: rotatedY};
}
