module.exports = (sequelize, DataTypes) => {
    const WorkInfo = sequelize.define("WorkInfo", {
        incomeSource: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT('medium'),
            allowNull: false,
        },
        workplace: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },{
        tableName: "userWorkInfo"
    })

    WorkInfo.associate = models => {
        WorkInfo.belongsTo(models.User, {
            foreignKey : "userId"
        })
    }

    return WorkInfo;
}