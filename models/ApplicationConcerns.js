const { idModel,
    createUpdateModel,
    table_Application,
    table_Application_type,
    table_Application_status
} = require("../modelCommon");

const tableName = 'ApplicationConcerns';

module.exports = function (sequelize, DataTypes) {
    return sequelize.define(tableName, {
        ...idModel(sequelize, DataTypes),
        applicationId: {
            type: DataTypes.STRING(36),
            allowNull: false,
            references: {
                model: table_Application,
                key: 'id'
            }
        },
        concernedEmployeeId: {
            type: DataTypes.STRING(10),
            allowNull: true
        },
        applicationStatusId: {
            type: DataTypes.STRING(36),
            allowNull: true,
            references: {
                model: table_Application_status,
                key: 'id'
            }
        },
        remarks: {
            type: DataTypes.STRING(500),
            allowNull: true
        },
        orderNo: {
            type: DataTypes.SMALLINT,
            allowNull: false,
        },
        // attachments: {
        //     type: DataTypes.ARRAY,
        //     allowNull: true,
        // },
        ...createUpdateModel(sequelize, DataTypes)
    }, {
        timestamps: false,
        tableName: tableName
    });
};