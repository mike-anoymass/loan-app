module.exports = (sequelize, DataTypes) => {
    const BasicInfo = sequelize.define("BasicInfo", {
        fullName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        gender: {
            type: DataTypes.STRING(7),
            allowNull: false,
            validate: {
                len: [3,10],
                isIn: [['Male', 'Female']]
            }
        },

    },{
        tableName: "userBasicInfo"
    })

    BasicInfo.associate = models => {
        BasicInfo.belongsTo(models.User, {
            foreignKey : "userId",
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        })
    }

    return BasicInfo;
}