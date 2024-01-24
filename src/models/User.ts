import { DataTypes, Sequelize} from "sequelize"

const env = process.env.NODE_ENV || 'development';
const config=require(__dirname + "/../config/config.json")[env]
export const sequelize=new Sequelize(config.database, config.username, config.password, config)

export const User=sequelize.define('Users',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    name:{
        type: DataTypes.STRING,
        allowNull:false
    },
    password:{
        type: DataTypes.STRING,
        allowNull:false
    },
    nickName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
        validate:{
            isEmail:true
        }
    },
    wishList: DataTypes.ARRAY(DataTypes.STRING),
   
},
{
    tableName:"Users"
}
)  

