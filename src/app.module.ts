import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module'; 
import { Module } from '@nestjs/common'; 
 
@Module({
  imports: [   
    MongooseModule.forRoot(process.env.MONGO_URI), 
    UsersModule
  ],
  controllers: [], 
})
export class AppModule { }
