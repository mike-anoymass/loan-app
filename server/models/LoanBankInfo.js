module.exports = (sequelize, DataTypes) => {
    const LoanBankInfo = sequelize.define("LoanBankInfo", {
        bankName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        accountName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        accountNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3,40]
            }
        }
    },  {tableName: "loanBankInfo"})

    LoanBankInfo.associate = models => {
        LoanBankInfo.belongsTo(models.LoanBasic, {
            foreignKey: "loanId",
        })
    }

    return LoanBankInfo
}