module.exports = (sequelize, DataTypes) => {
    const LoanWitness = sequelize.define("LoanWitness", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        residence: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phoneNumber: {
            type: DataTypes.STRING,
            isNumeric: true,
            allowNull: false
        }
    }, {tableName: "LoanWitnessInfo"})
    
    LoanWitness.associate = models => {
        LoanWitness.belongsTo(models.LoanBasic, {
            foreignKey: "loanId"
        })
    }

    return LoanWitness
}