const { idModel, createUpdateModel, table_Application } = require("../modelCommon");

const tableName = 'Letter';
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
        letterDraft: {
            type: DataTypes.STRING,
            allowNull: true
        },
        ...createUpdateModel(sequelize, DataTypes)
    }, {
        timestamps: false,
        tableName: tableName
    });
};
