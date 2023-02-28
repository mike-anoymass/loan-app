module.exports = (sequelize, DataTypes) => {
    const ContactInfo = sequelize.define("ContactInfo", {
        mobile: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isNumeric: true,
                len: [9,14]
            }
        },
        telephone: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            }
        },
    },{
        tableName: "userContactInfo"
    })

    ContactInfo.associate = models => {
        ContactInfo.belongsTo(models.User, {
            foreignKey : "userId"
        })
    }

    return ContactInfo;
}