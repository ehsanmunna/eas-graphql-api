const { idModel, createUpdateModel } = require("../modelCommon");

const tableName = 'File';

module.exports = function (sequelize, DataTypes) {
    return sequelize.define(tableName, {
        ...idModel(sequelize, DataTypes),
        fileDescription: {
            type: DataTypes.STRING,
            allowNull: true
        },
        fileName: {
            type: DataTypes.STRING(250),
            allowNull: true
        },
        extension: {
            type: DataTypes.STRING(10),
            allowNull: true
        },
        mimeType: {
            type: DataTypes.STRING(10),
            allowNull: true
        },
        ...createUpdateModel(sequelize, DataTypes)
    }, {
        timestamps: false,
        tableName: tableName
    });
};
