const { idModel, createUpdateModel, table_Application_type } = require("../modelCommon");

module.exports = function (sequelize, DataTypes) {
    return sequelize.define(table_Application_type, {
        ...idModel(sequelize, DataTypes),
        applicationTypeName: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        applicationInstruction: {
            type: DataTypes.STRING,
            allowNull: true
        },
        applicationFormat: {
            type: DataTypes.STRING,
            allowNull: true
        },
        canShowRemarks: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        createdBy: {
            type: DataTypes.STRING(10),
            allowNull: true
        },
        ...createUpdateModel(sequelize, DataTypes)
    }, {
        timestamps: false,
        tableName: table_Application_type
    });
};
