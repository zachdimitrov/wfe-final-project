'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _require = require('mongodb'),
    ObjectID = _require.ObjectID;

var BaseData = function () {
    function BaseData(db, ModelClass, validator) {
        _classCallCheck(this, BaseData);

        this.db = db;
        this.ModelClass = ModelClass;
        this.validator = validator;
        this.collectionName = this._getCollectionName();
        this.collection = this.db.collection(this.collectionName);
    }

    _createClass(BaseData, [{
        key: 'getAll',
        value: function getAll() {
            return this.collection.find({}).toArray();
        }
    }, {
        key: 'findById',
        value: function findById(id) {
            return this.collection.findOne({
                _id: new ObjectID(id)
            });
        }
    }, {
        key: 'findOptions',
        value: function findOptions(options) {
            return this.collection.find(options).toArray();
        }
    }, {
        key: 'updateById',
        value: function updateById(model) {
            model._id = new ObjectID(model._id);
            return this.collection.updateOne({
                _id: model._id
            }, model);
        }
    }, {
        key: 'create',
        value: function create(model) {
            if (!this._isModelValid(model)) {
                return Promise.reject('Validation for ' + this.collectionName + ' failed!');
            }

            return this.collection.insert(model);
        }
    }, {
        key: '_isModelValid',
        value: function _isModelValid(model) {
            return this.validator.isValid(model);
        }
    }, {
        key: '_getCollectionName',
        value: function _getCollectionName() {
            return this.ModelClass.name.toLowerCase() + 's';
        }
    }]);

    return BaseData;
}();

module.exports = BaseData;