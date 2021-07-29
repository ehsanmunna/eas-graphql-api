const { idModel, table_app } = require("../modelCommon");

module.exports = function (sequelize, DataTypes) {
    return sequelize.define(table_app, {
        ...idModel(sequelize, DataTypes),
        name: {
            type: DataTypes.STRING(150),
            allowNull: false
        }
    }, {
        timestamps: false,
        tableName: table_app
    });
};