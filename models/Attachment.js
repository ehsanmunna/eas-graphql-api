const { idModel, createUpdateModel } = require("../modelCommon");

const tableName = 'Attachment';

module.exports = function (sequelize, DataTypes) {
    return sequelize.define(tableName, {
        ...idModel(sequelize, DataTypes),
        refereanceId: {
            type: DataTypes.STRING(36),
            allowNull: false
        },
        referanceTable: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        attachmentDescription: {
            type: DataTypes.STRING(150),
            allowNull: true
        },
        attachmentId: {
            type: DataTypes.STRING,
            allowNull: true
        },
        ...createUpdateModel(sequelize, DataTypes)
    }, {
        timestamps: false,
        tableName: tableName
    });
};
