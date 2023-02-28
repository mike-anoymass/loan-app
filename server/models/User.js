module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        googleId : {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        }, 
        email : {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        name : {
            type: DataTypes.STRING(60),
            allowNull: false,
            validate: {
                len: [4, 60]
            }
        },
        givenName : {
            type: DataTypes.STRING(60),
            allowNull: false,
            validate: {
                len: [2, 60]
            }
        },
        familyName : {
            type: DataTypes.STRING(60),
            allowNull: false,
            validate: {
                len: [2, 60]
            }
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: true
            }
        }, 
        role: {
            type: DataTypes.STRING,
            defaultValue: "applicant",
            allowNull: false,
        }, 
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false,
        },
    }, {
        tableName: "users"
    })

    User.associate = models => {

        User.hasOne(models.LoanBasic, {
            foreignKey: "userId",
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        })

        User.hasOne(models.WorkInfo, {
            foreignKey: "userId",
            onDelete: "cascade",
            onUpdate: "cascade"   
        })

        User.hasOne(models.UserAttachment, {
            foreignKey: "userId",
            onDelete: "cascade",
            onUpdate: "cascade" 
        })

        User.hasOne(models.ContactInfo, {
            foreignKey: "userId",
            onDelete: "cascade",
            onUpdate: "cascade"   
        })

        User.hasOne(models.BasicInfo, {
            foreignKey: "userId",
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        })
    
    }

    return User
}