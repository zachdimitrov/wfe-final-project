'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseData = require('./base/base.data');
var User = require('../dataModels/user.model');

var UsersData = function (_BaseData) {
    _inherits(UsersData, _BaseData);

    function UsersData(db) {
        _classCallCheck(this, UsersData);

        return _possibleConstructorReturn(this, (UsersData.__proto__ || Object.getPrototypeOf(UsersData)).call(this, db, User, User));
    }

    _createClass(UsersData, [{
        key: 'checkPassword',
        value: function checkPassword(username, password) {
            return this.collection.findOne({
                username: username
            }).then(function (user) {
                if (!user) {
                    throw new Error('Invalid user name');
                }

                if (user.password !== password) {
                    throw new Error('Invalid password');
                }

                return true;
            });
        }
    }, {
        key: 'findByUsername',
        value: function findByUsername(username) {
            return this.collection.findOne({
                username: username
            });
        }
    }]);

    return UsersData;
}(BaseData);

module.exports = UsersData;