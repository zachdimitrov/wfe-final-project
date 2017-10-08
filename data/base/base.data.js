const { ObjectID } = require('mongodb');

class BaseData {
    constructor(db, ModelClass, validator) {
        this.db = db;
        this.ModelClass = ModelClass;
        this.validator = validator;
        this.collectionName = this._getCollectionName();
        this.collection = this.db.collection(this.collectionName);
    }

    getAll() {
        return this.collection.find({})
            .toArray();
    }

    findById(id) {
        return this.collection.findOne({
            _id: new ObjectID(id),
        });
    }

    findOptions(options) {
        return this.collection.find(options)
            .toArray();
    }

    updateById(model) {
        model._id = new ObjectID(model._id);
        return this.collection.updateOne({
            _id: model._id,
        }, model);
    }

    create(model) {
        if (!this._isModelValid(model)) {
            return Promise
                .reject(`Validation for ${this.collectionName} failed!`);
        }

        return this.collection.insert(model);
    }

    _isModelValid(model) {
        return this.validator.isValid(model);
    }

    _getCollectionName() {
        return this.ModelClass.name.toLowerCase() + 's';
    }
}

module.exports = BaseData;
