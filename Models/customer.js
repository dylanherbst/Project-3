const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;

class Customer extends Model {}

Customer.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    emailId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: sequelizeInstance,
    modelName: 'customers', // Sequelize automatically pluralizes model names for the table name
    timestamps: true,
    freezeTableName: true // Prevents Sequelize from pluralizing the table name
});

module.exports = Customer;
