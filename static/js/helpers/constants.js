const ALLOW_CHARS =
    'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890_.';
const USERNAME_MIN_LENGTH = 3;
const USERNAME_MAX_LENGTH = 30;
const ADMINS = ['admin', 'zach'];
const TITLE_MIN_LENGTH = 3;
const TITLE_MAX_LENGTH = 45;
const ROLE = {
    ADMIN: 'admin',
    REGULAR: 'regular',
};
const ID_LOCAL_STORAGE = 'signed-in-user-id';
const CURRENT_POST = 'current-post-object';
const API_URLS = {
    userLogin: '/api/login/',
    userRegister: '/api/register/',
    posts: '/api/posts/',
};
const KEY = {
    HTTP_HEADER: 'x-auth-key',
    STORAGE_USERNAME: 'username',
    STORAGE_AUTH: 'authKey',
};

export {
    ALLOW_CHARS,
    USERNAME_MIN_LENGTH,
    USERNAME_MAX_LENGTH,
    TITLE_MIN_LENGTH,
    TITLE_MAX_LENGTH,
    ADMINS,
    ROLE,
    KEY,
    ID_LOCAL_STORAGE,
    CURRENT_POST,
    API_URLS,
};
