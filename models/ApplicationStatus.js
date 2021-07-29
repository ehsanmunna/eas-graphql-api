
const { idModel, table_Application_status } = require("../modelCommon");
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(table_Application_status, {
        ...idModel(sequelize, DataTypes),
        statusName: {
            type: DataTypes.STRING(150),
            allowNull: false
        }
    }, {
        timestamps: false,
        tableName: table_Application_status
    });
};

// var a = {name: 'munna'}
// var b = {age: '34'}

// var munna = {...a, ...b}
// // {name: 'munna', age: '34'}