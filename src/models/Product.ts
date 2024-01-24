import { DataTypes, Sequelize} from "sequelize"
import { User } from "./User";
const env = process.env.NODE_ENV || 'development';

const config=require(__dirname + "/../config/config.json")[env]
export const sequelize=new Sequelize(config.database, config.username, config.password, config)
export const Product=sequelize.define('Product',{
id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true,
    allowNull:false
},
product_name:{
    type:DataTypes.STRING,
    allowNull:false
},
product_category:{
    type: DataTypes.STRING,
    allowNull: false
},
product_orgin:{
    type: DataTypes.STRING,
    allowNull: false
},
product_price:{
    type: DataTypes.STRING,
    allowNull: false
},
product_coverImg:{
    type: DataTypes.STRING,
    allowNull:true
},
product_Imgs:{
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull:true
},
user_created:{
    type:DataTypes.INTEGER,
    references:{
        model:"Users",
        key:"id"
    }
},
createdAt:{
    type:DataTypes.NOW,
    allowNull: false   
},
updatedAt:{
    type:DataTypes.DATE,
    allowNull:true
}
})


Product.belongsTo(User,{foreignKey:"id"})
User.hasMany(Product,{foreignKey:"id"})
