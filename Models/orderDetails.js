const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;

class OrderDetail extends Model { }

OrderDetail.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'orders', 
            key: 'id'
        }
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'products', 
            key: 'id'
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
}, {
    sequelize: sequelizeInstance,
    modelName: 'orderDetail',
    tableName: 'orderDetails',  // Sequelize automatically pluralizes model names for the table name
    timestamps: true,
    freezeTableName: true 
});

module.exports = OrderDetail;