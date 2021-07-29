const createUpdateModel = (sequelize, DataTypes) => {
    return {
        createdBy: {
            type: DataTypes.STRING(10),
            allowNull: true
        },
        createdOn: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.fn('GETDATE')
        },
        updatedBy: {
            type: DataTypes.STRING(10),
            allowNull: true
        },
        updatedOn: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: sequelize.fn('GETDATE')
        }
    }
}

const idModel = (sequelize, DataTypes) => {
    return {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true
        }
    }
}

module.exports = {
    table_app: 'App',
    table_users: 'Users',
    table_role: 'Role',
    table_Application_type: 'applicationType',
    table_Application_status: 'applicationStatus',
    table_Application: 'application',
    createUpdateModel: createUpdateModel,
    idModel: idModel
}