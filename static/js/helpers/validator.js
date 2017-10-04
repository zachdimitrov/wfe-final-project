/* eslint-disable max-len */

function validateString(str, min, max, chars) {
    if (typeof str !== 'string' || str.length < min || str.length > max) {
        throw new Error(`Invalid username: Length must be between ${min} and ${max}`);
    }

    if (chars) {
        str = str.split('');
        if (str.some(function(char) {
                return chars.indexOf(char) < 0;
            })) {
            throw new Error(`Invalid username: Chars can be ${chars}`);
        }
    }
}

function validateEmail(email) {
    if (!email || email.length === 0) {
        throw new Error('Invalid email: Email cannot be empty');
    }
    // copied from http://emailregex.com/
    const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!pattern.test(email)) {
        throw new Error('Invalid email: Please use name@url.ext pattern');
    }
}

function validateUrl(url) {
    if (!url || url.length === 0) {
        return;
    }

    // copied from http://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-an-url#answer-5717133
    const pattern = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;
    if (!pattern.test(url)) {
        throw new Error('Invalid url');
    }
}

function validatePassword(password) {
    if (typeof password !== 'string' || password.length === 0) {
        const message = 'Invalid password: Password cannot be empty!';
        throw new Error(message);
    }
}

export {
    validateString,
    validateEmail,
    validateUrl,
    validatePassword,
};
