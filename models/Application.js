const { idModel,
    createUpdateModel,
    table_Application,
    table_Application_type,
    table_Application_status
} = require("../modelCommon");

module.exports = function (sequelize, DataTypes) {
    return sequelize.define(table_Application, {
        ...idModel(sequelize, DataTypes),
        employeeId: {
            type: DataTypes.STRING(15),
            allowNull: false
        },
        applicationTypeId: {
            type: DataTypes.STRING(36),
            allowNull: false,
            references: {
                model: table_Application_type,
                key: 'id'
            }
        },
        applicationBody: {
            type: DataTypes.STRING,
            allowNull: false
        },
        applicationStatusId: {
            type: DataTypes.STRING(36),
            allowNull: false,
            references: {
                model: table_Application_status,
                key: 'id'
            }
        },
        semesterId: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        letterDone: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        ...createUpdateModel(sequelize, DataTypes)
    }, {
        timestamps: false,
        tableName: table_Application
    });
};