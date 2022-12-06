import {  CacheInterceptor, Injectable, NotFoundException, UseInterceptors } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
 
@Injectable() 
@UseInterceptors(CacheInterceptor)
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) { }

  create(createUserDto: CreateUserDto) {
    const user = new this.userModel(createUserDto)
    return user.save();
  }

  findAll() {
    return this.userModel.find()
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id)
    if(!user) {
      throw new NotFoundException('User not found')
    }
    return user
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate({ _id: id }, { $set: updateUserDto }, { new: true })
  }

  remove(id: string) {
    return this.userModel.deleteOne({_id: id}).exec()
  }
}
