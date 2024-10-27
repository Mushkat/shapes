import {GithubLinks} from './githubLinks.js';
import {extractJsonString, processObjects, printJsonObjects} from './parseJson.js';
import {findObjects} from "./findObjects.js";
import {setupCanvas, drawShapes, infoShapes} from "./drawing.js";

async function main() {

    // Получение строки из файла.
    const rawData = GithubLinks.Hexagonal_prism;

    // Получения массива объектов из строки.
    const jsonData = extractJsonString(rawData);
    const shapes = processObjects(jsonData);

    // Вывод объектов при необходимости.
    // printJsonObjects(shapes);

    // Получяем все необходимые массивы для рисования фигуры.
    let [group, lines, backLines, ellipses, backEllipses] = findObjects(shapes);

    // Вывод информации о получившихся массивов.
    if (lines) {
        console.log("Lines: ")
        infoShapes(lines);
    }
    if (backLines) {
        console.log("Back Lines: ")
        infoShapes(backLines);
    }
    if (ellipses) {
        console.log("Ellipse: ")
        infoShapes(ellipses);
    }
    if (backEllipses) {
        console.log("Back Ellipse: ")
        infoShapes(backEllipses);
    }

    // Отрисовка объектов в html с помощью canvas.
    // При необходимости убрать комментарии и запустить html, так как рисуется через DOM.
    // let ctx = setupCanvas(group);
    // if(lines){
    //     drawShapes(ctx, lines);
    // }
    // if(backLines){
    //     drawShapes(ctx, backLines);
    // }
    // if(ellipses){
    //     drawShapes(ctx, ellipses);
    // }
    // if(backEllipses){
    //     drawShapes(ctx, backEllipses);
    // }

}

main();
