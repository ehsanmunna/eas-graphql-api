const { createUpdateModel, idModel, table_users } = require("../modelCommon")
;

module.exports = function (sequelize, DataTypes) {
    return sequelize.define(table_users, {
        ...idModel(sequelize, DataTypes),
        userFullName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ...createUpdateModel(sequelize, DataTypes)
    }, {
        timestamps: false,
        tableName: table_users
    });
};