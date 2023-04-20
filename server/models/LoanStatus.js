module.exports = (sequelize, DataTypes) => {
    const LoanStatus = sequelize.define("LoanStatus", {
        remarks: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        paybackDate: {
            type: DataTypes.STRING,
            allowNull: true
        },
        dateReplied: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },  {tableName: "loanStatus"})

    LoanStatus.associate = models => {
        LoanStatus.belongsTo(models.LoanBasic, {
            foreignKey: "loanId",
        })
    }

    return LoanStatus
}