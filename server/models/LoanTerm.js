module.exports = (sequelize, DataTypes) => {
    const LoanTerm = sequelize.define("LoanTerm", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: false
        },
        termName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        percentage: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isNumeric: true
            }
        },
    }, {tableName: "loanTerms"})

    LoanTerm.associate = models => {
        LoanTerm.hasMany(models.LoanBasic, {
            foreignKey: "termId",
            onDelete: "cascade",
            onUpdate: "cascade"
        })
    }

    return LoanTerm
}