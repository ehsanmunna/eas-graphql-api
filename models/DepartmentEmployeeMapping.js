const { idModel } = require("../modelCommon");
const table_name = 'DepartmentEmployeeMapping';
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(table_name, {
        ...idModel(sequelize, DataTypes),
        employeeId: {
            type: DataTypes.STRING(15),
            allowNull: false
        },
        departmentID: {
            type: DataTypes.STRING(50),
            allowNull: true,
        }
    }, {
        timestamps: false,
        tableName: table_name
    });
};