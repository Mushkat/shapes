// Читаем json с гитхаба по ссылке.
// Формат файлов аналогичен файлам, созданными сервером.
export async function fetchLine(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Читаем текстовый файл
        const text = await response.text();
        console.log(text);
        return text;
    } catch (error) {
        console.error('Ошибка загрузки файла:', error);
    }
}

