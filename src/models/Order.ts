import { DataTypes, Sequelize} from "sequelize"
import { User } from "./User";
import { Product } from "./Product";
const env = process.env.NODE_ENV || 'development';

const config=require(__dirname + "/../config/config.json")[env]
export const sequelize=new Sequelize(config.database, config.username, config.password, config)

export const Order=sequelize.define('Order',{
id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true,
    allowNull:false
},
order_products:{
    type:DataTypes.ARRAY(DataTypes.STRING),
    allowNull:false
},
order_status:{
type:DataTypes.STRING,
allowNull: false,   
},
order_created:{
    type:DataTypes.INTEGER,
    references:{
        model:User,
        key:"id"
    }
},
order_addressOne:{
    type:DataTypes.ARRAY(DataTypes.STRING),
    allowNull:false
},
order_adressTwo:{
    type:DataTypes.ARRAY(DataTypes.STRING),
    allowNull:false

},
createdAt:{
    type:DataTypes.DATE,
    allowNull: true   
},
updatedAt:{
    type:DataTypes.DATE,
    allowNull:true
}
})

User.hasMany(Order,{foreignKey:"id"})
Order.belongsTo(User,{foreignKey:"id"})
