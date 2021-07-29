const { table_role, table_users, table_app, idModel } = require("../modelCommon");
const tableName = 'UserRoles';
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(tableName, {
        ...idModel(sequelize, DataTypes),
        userId: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        roleId: {
            type: DataTypes.STRING(36),
            allowNull: false,
            references: {
                model: table_role,
                key: 'id'
            }
        },
        appId: {
            type: DataTypes.STRING(36),
            allowNull: false,
            references: {
                model: table_app,
                key: 'id'
            }
        }
    }, {
        timestamps: false,
        tableName: tableName
    });
};