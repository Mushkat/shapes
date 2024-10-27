// Функция извлечения нужной части JSON из всей входной строки.
export function extractJsonString(data) {
    // Ищем начало JSON части.
    const startIndex = data.indexOf('{');
    const endIndex = data.lastIndexOf('}') + 1;

    // Извлекаем JSON строку.
    const jsonString = data.slice(startIndex, endIndex);

    return jsonString;
}

// Функция для парсинга и обработки объектов.
export function processObjects(jsonString) {
    let parsedData;
    let shapes = []
    try {
        // Парсим извлеченный JSON.
        parsedData = JSON.parse(jsonString);
    } catch (error) {
        console.error("Ошибка парсинга JSON: ", error);
        return;
    }

    // Обрабатываем каждый объект.
    parsedData.objects.forEach(obj => {
        // Парсим внутреннюю строку JSON в поле "json".
        let objectDetails;
        try {
            objectDetails = JSON.parse(obj.json);
        } catch (error) {
            console.error("Ошибка парсинга объекта: ", error);
            return;
        }

        shapes.push(objectDetails);

    });
    return shapes;
}

// Вывод объектов JSON в консоль.
export function printJsonObjects(shapes) {
    for (let i = 0; i < shapes.length; i++) {
        console.log("Объект: ", shapes[i]);
    }
}

