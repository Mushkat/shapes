// Попытка отрисовки объекта 'pencil' как кривых Безье.
// Не используется в программе
export const getBezierBasis = (i, n, t) => {
    // Факториал
    function f(n) {
        return (n <= 1) ? 1 : n * f(n - 1);
    };

    // считаем i-й элемент полинома Берштейна
    return (f(n) / (f(i) * f(n - i))) * Math.pow(t, i) * Math.pow(1 - t, n - i);
}

export const getBezierCurve = (arr, step) => {
    if (step == undefined) {
        step = 0.01;
    }

    var res = new Array()

    for (var t = 0; t < 1 + step; t += step) {
        if (t > 1) {
            t = 1;
        }

        var ind = res.length;

        res[ind] = new Array(0, 0);

        for (var i = 0; i < arr.length; i++) {
            var b = getBezierBasis(i, arr.length - 1, t);

            res[ind][0] += arr[i][0] * b;
            res[ind][1] += arr[i][1] * b;
        }
    }

    return res;
}

export const drawLines = (ctx, arr) => {

    let i = 0;

    const delayDraw = () => {
        if (i >= arr.length - 1) {
            return;
        }

        ctx.moveTo(arr[i][0], arr[i][1]);
        ctx.lineTo(arr[i + 1][0], arr[i + 1][1]);
        ctx.stroke();

        ++i;

        delayDraw();
    }

    delayDraw();
}

export const drawPencil = (ctx, shape) => {
    const points = shape.a.curve.split(';').map(point => point.split(',').map(Number));
    let flow = getBezierCurve(points, 0.01);
    drawLines(ctx, flow, 1);
}