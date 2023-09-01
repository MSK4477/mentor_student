import { connect } from "mongoose"
import dotenv from "dotenv"
dotenv.config()
const userName = process.env.DB_USERNAME
const password = process.env.DB_PASSWORD
const clusterName = process.env.DB_CLUSTERNAME
const dbName = process.env.DB_NAME
const cloudMongoUrl = `mongodb+srv://${userName}:${password}@${clusterName}/${dbName}?retryWrites=true&w=majority`
// const localDbUrl = "mongodb://127.0.0.1:27017/student-mentor"

const DbToConnect  = async () =>{
try{
   await connect(cloudMongoUrl ,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
       
    })

     console.log("succesfully connected to DB")

}catch(err){
    console.error("can't connect to DB", err)
}


}
export default DbToConnect