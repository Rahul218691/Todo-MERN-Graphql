import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import {ApolloServer} from 'apollo-server-express';
import typeDefs from './typeDefs';
import resolvers from './resolvers';






async function initServer(){
	const app = express();
	app.use(cors());
	dotenv.config();
	const apolloServer = new ApolloServer({typeDefs,resolvers});
	await apolloServer.start();
	apolloServer.applyMiddleware({app});
	app.use((req,res) =>{
		res.send('Server Runnning');
	})
	const PORT = process.env.PORT || 5000;

	try {
		await mongoose.connect(process.env.MONGO_URI);
		console.log('Mongodb connected');
	} catch(error) {
		console.log(error)
	}

	app.listen(PORT,()=>{
		console.log(`App listening to port ${PORT}`)
	})
}

initServer();