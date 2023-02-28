module.exports = (sequelize, DataTypes) => {
    const LoanBasic = sequelize.define("LoanBasic", {
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isNumeric: true
            }
        },
        loanFor: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3,255]
            }
        }
    }, {tableName: "loanBasics"})

    LoanBasic.associate = models => {
        LoanBasic.belongsTo(models.User, {
            foreignKey: "userId",
        })

        LoanBasic.belongsTo(models.LoanTerm, {
            foreignKey: "termId",
        })

        LoanBasic.hasOne(models.LoanCollateral, {
            foreignKey: "loanId",
            onDelete: "cascade",
            onUpdate: "cascade"
        })

        LoanBasic.hasOne(models.LoanBankInfo, {
            foreignKey: "loanId",
            onDelete: "cascade",
            onUpdate: "cascade"
        })

         LoanBasic.hasOne(models.LoanWitness, {
            foreignKey: "loanId",
            onDelete: "cascade",
            onUpdate: "cascade"
        })

    }

    return LoanBasic
}