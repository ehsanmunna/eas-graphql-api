const { idModel } = require("../modelCommon");
const tableName = 'ApproveAutority';
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(tableName, {
        ...idModel(sequelize, DataTypes),
        employeeId: {
            type: DataTypes.STRING(15),
            allowNull: false
        }
    }, {
        timestamps: false,
        tableName: tableName
    });
};