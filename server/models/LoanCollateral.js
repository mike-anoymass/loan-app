module.exports = (sequelize, DataTypes) => {
    const LoanCollateral = sequelize.define("LoanCollateral", {
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        valuation: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isNumeric: true
            }
        },
        monthlyEarning: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isNumeric: true
            }
        }
    }, {tableName: "loanCollaterals"})

    LoanCollateral.associate = models => {
        LoanCollateral.belongsTo(models.LoanBasic, {
            foreignKey: "loanId",
        })
    }

    return LoanCollateral
}