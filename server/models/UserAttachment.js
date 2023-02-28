module.exports = (sequelize, DataTypes) => {
    const UserAttachment = sequelize.define("UserAttachment", {
        fileName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },{
        tableName: "userAttachments"
    })

    UserAttachment.associate = models => {
        UserAttachment.belongsTo(models.User, {
            foreignKey : "userId"
        })
    }

    return UserAttachment;
}