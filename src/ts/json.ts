
const Space = '&emsp;&emsp;';

const EscapedKey = {
    '<': '&lt;',
    '>': '&gt;',
    // '<': '<',
    // '>': '>',
    '&': '&amp;',
    // '/': '&#x2F;',
    // '"': '&quot;',
    // '\'': '&#x27;'
};
let nowSpace = '';

/**
 * 將json 轉成 html
 * @param {String or Object} str
 * @return {String} html
 */
export function jsonToHtml(data): string {
    if (!data) {
        return data;
    }
    nowSpace = '';
    if (data.constructor === Object) {
        return toHtml(data);
    }
    if (data.constructor === Array) {
        return toHtml(data);
    }
    if (typeof data === 'string') {
        try {
            return toHtml(JSON.parse(data.replace(/\n/g, '\\\\n')));
        } catch (e) {
            return data;
        }
    }
    return data;
}

/**
 * 防止XSS
 * @param {String}
 * @return {String}
 */
function escaped(str: string): string {
    return String(str).replace(/[<>&]/g, escapMatch);
}

function escapMatch(m) {
    return EscapedKey[m];
}

function toHtml(data): string {
    if (!data) {
        return getValue(data);
    }
    if (data.constructor === Object) {
        return objectToHtml(data);
    } else if (data.constructor === Array) {
        return arrayToHtml(data);
    } else {
        return getValue(data);
    }
}

function objectToHtml(obj): string {
    let html = '{<br>';
    let hasData = false;
    nowSpace += Space;

    // tslint:disable-next-line:forin
    for (let i in obj) {
        hasData = true;
        html += nowSpace + getName(i) + '&emsp;:&emsp;' + toHtml(obj[i]) + ',<br>';
    }
    nowSpace = nowSpace.replace(Space, '');
    html += nowSpace + '}';
    if (hasData) {
        return html;
    } else {
        return '{}';
    }
}

function arrayToHtml(array): string {
    let nowrap = array.length < 3 ? '' : '<br>';
    let html = '[' + nowrap;
    nowSpace += Space;
    let thatSpace = (nowrap && nowSpace);
    let temp = [];
    // tslint:disable-next-line:forin
    for (let i in array) {
        temp[i] = toHtml(array[i]);
    }
    html += thatSpace + temp.join(',' + nowrap + thatSpace);
    nowSpace = nowSpace.replace(Space, '');
    thatSpace = (nowrap && nowSpace);
    html += nowrap + thatSpace + ']';
    return html;
}

function getName(text): string {
    return '<span>"' + escaped(text) + '"</span>';
}

function getValue(text): string {
    if (typeof text === 'string') {
        return '<span style="color:#690">"' + escaped(text) + '"</span>';
    } else {
        return '<span style="color:#a11">' + escaped(text) + '</span>';
    }
}

