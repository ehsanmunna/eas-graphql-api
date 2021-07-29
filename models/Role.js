const { idModel, table_role } = require("../modelCommon");

module.exports = function (sequelize, DataTypes) {
    return sequelize.define(table_role, {
        ...idModel(sequelize, DataTypes),
        name: {
            type: DataTypes.STRING(150),
            allowNull: false
        }
    }, {
        timestamps: false,
        tableName: table_role
    });
};