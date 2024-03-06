/**
 * Удаляет HTML-теги из строки и возвращает очищенный текст
 * @param {string} value - Строка с HTML-тегами
 * @returns {string} - Очищенный текст без HTML-тегов
 */
function stripTags(value) {
    const div = document.createElement('div');
    div.innerHTML = value.replace("'","").replace("\"","");
    return div.textContent || div.innerText || '';
}

export function getCurrentDateTime() {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
    const day = String(now.getDate()).padStart(2, '0');

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
}

export function validateField(type, value) {
    let final = "";
    let fieldName = "";
    switch (type) {
        case "name":
            fieldName = "Имя"
            break;
        case "last_name":
            fieldName = "Фамилия"
            break;
        case "second_name":
            fieldName = "Отчество"
            break;
        case "email":
            fieldName = "Email"
            break;
        case "phone":
            fieldName = "Телефон"
            break;
        case "password":
            fieldName = "Пароль"
            break;
        case "oldPassword":
            fieldName = "Старый пароль"
            break;
        case "city":
            fieldName = "Город"
            break;
        case "street":
            fieldName = "Улица"
            break;
        case "flat":
            fieldName = "Квартира"
            break;
        case "floor":
            fieldName = "Этаж"
            break;
        case "entrance":
            fieldName = "Подъезд"
            break;
        case "house":
            fieldName = "Дом"
            break;
    }
    // Дополнительные проверки в зависимости от типа поля
    switch (type) {
        case "name":
        case "last_name":
        case "middle_name": {
            // Проверка наличия цифр
            if (/\d/.test(value)) {
                return {
                    message: value,
                    id: type,
                    error: `Поле "${fieldName}" не должно содержать цифр`
                }
            }
            // Форматирование первой буквы
            final = stripTags(value.trim());
            break;
        }
        case "email": {
            // Проверка формата email
            if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value)) {
                return {
                    message: value,
                    id: type,
                    error: 'Поле "Email" должно быть в формате example@example.com'
                }
            }
            const result = stripTags(value);
            final = result.trim().toLowerCase();
            break;
        }
        case "phone": {
            const cleanedValue = stripTags(value).replace(/[\s()-]/g, "");
            // Проверка на заполненность поля телефона
            if (!cleanedValue) {
                return {
                    message: value,
                    id: type,
                    error: 'Поле "Телефон" обязательно для заполнения'
                }
            }
            // Проверка формата телефона
            if (!/^(\+?7|8)\d{10}$/.test(cleanedValue)) {
                return {
                    message: value,
                    id: type,
                    error: 'Некорректный номер телефона'
                }
            }
            // Форматирование телефона
            // final = cleanedValue.replace(/^(\+?7|8)(\d{3})(\d{3})(\d{2})(\d{2})$/, "+7($2)$3-$4-$5");
            final = cleanedValue.replace(/^(\+?7|8)(\d{3})(\d{3})(\d{2})(\d{2})$/, "+7$2$3$4$5");
            break;
        }
        case "city":
        case "street": {
            const stripped = stripTags(value);
            let formatted;
            if (stripped.includes('-')) {
                // Город указан через дефис
                formatted = stripped
                    .trim()
                    .split('-')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                    .join('-');
            } else if (stripped.includes(' ')) {
                // Город указан через пробел
                formatted = stripped
                    .trim()
                    .split(' ')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                    .join(' ');
            } else {
                // Город не содержит ни дефиса, ни пробела
                formatted = stripped.charAt(0).toUpperCase() + stripped.slice(1).toLowerCase();
            }
            final = formatted;
            break;
        }
        case "house": {
            if (!/^(\d+[а-яА-Я]?)$/.test(value)) {
                // message: 'Поле "Дом" указано в неправильном формате'
                return {
                    message: value,
                    id: type,
                    error: 'Поле Дом указано в неправильном формате'
                }
            } else {
                final = stripTags(value)
            }
            break;
        }
        case "korp": {
            if (value.trim()) {
                // Применение функции stripTags к полю korp
                const strippedKorp = stripTags(value);
                final = strippedKorp.trim();
            }
            break;
        }
        case "entrance":
        case "floor":
        case "flat": {
            if (value) {
                // Проверка на наличие букв в поле entrance
                if (!/^\d+$/.test(value)) {
                    return {
                        message: value,
                        id: type,
                        error: `Поле ${fieldName} не должно содержать буквы`
                    }
                } else {
                    // Применение функции stripTags к полю entrance
                    const strippedEntrance = stripTags(value);
                    final = strippedEntrance.trim();
                }
            }
            break;
        }
        case "sms":
        case "message":
        case "title":
        case "description":
        case "search": {
            final = stripTags(value);
            break;
        }
        case "password":
        case "confirm_password":
        case "birth_datetime": {
            final = value;
            break;
        }
        case "price": {
            final = stripTags(value).replace(/\D/g, "");
            break;
        }
        default:
            break;
    }
    return {
        message: final
    };
}
