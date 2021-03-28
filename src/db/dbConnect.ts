import mongoose from 'mongoose' 
import { config } from "dotenv";
config();//process.env

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@clusterwebradio.fb0mk.mongodb.net/WebradioData?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});
// Connexion à la base de donnée sur mongoCloud
mongoose.connection.on('connected', (err: any) => {
  if (err) {
    if(err) throw err;
  } else {
    console.log('MongoDB cloud is running...');
  }
})

module.exports = mongoose;