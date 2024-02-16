const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;


class Order extends Model { }

Order.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    customerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'customers',
            key: 'id'
        }
    },
    orderDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending'
    },
    totalPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    }
}, {
    sequelize: sequelizeInstance,
    modelName: 'order',
    tableName: 'orders',
    timestamps: true,
    freezeTableName: true 
});

module.exports = Order;