const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true, allowNull: false,},
    password: {type: DataTypes.STRING, allowNull: false,},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Car = sequelize.define('car', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    brand: {type: DataTypes.STRING, allowNull: false},
    model: {type:DataTypes.STRING, allowNull: false, unique: true},
    cost: {type:DataTypes.DECIMAL, allowNull:false},
    description: {type: DataTypes.STRING, required:true, unique:true},
    YearOfPublication: {type:DataTypes.INTEGER, required: true},
    CarUrl: {type: DataTypes.STRING, required:true}
})

const CarcassType = sequelize.define('CarcassType', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    carcass: {type: DataTypes.STRING, unique: true, allowNull: false,}
})

const FAQ = sequelize.define('FAQ',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    question: {type: DataTypes.STRING, unique: true, allowNull: false,},
    answer: {type: DataTypes.STRING, unique: true, allowNull: false,}
})

const News = sequelize.define('News',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, unique: true, allowNull: false,},
    description: {type: DataTypes.STRING, allowNull: false,},
    newsUrl: {type: DataTypes.STRING, allowNull: false,}
})

Car.hasOne(CarcassType)
CarcassType.belongsTo(Car)

module.exports = {
    User,
    Car,
    CarcassType,
    News,
    FAQ
}