import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin } from './admin.model';

@Injectable()
export class AdminService {
    
    constructor(
        @InjectModel('Admin')
        private readonly adminModel:Model<Admin>,
    ) {}

    //create new admin
    async createAdmin(admin:Admin): Promise <any> {
        const newAdmin = new this.adminModel(admin);
        return await newAdmin.save();
    }
    
    async findAllAdmin(): Promise<Admin[]> {
        return await this.adminModel.find().exec();
    }
    
    async findAdminByEmail(adminEmail: string): Promise<Admin> {
        return await this.adminModel.findOne({"adminEmail": adminEmail}).exec();
    }
    
    async getTeachers(): Promise<Admin[]> {
        return await this.adminModel.find(
            { "adminSplzn": "Teacher" }
        ).exec();
        // return await this.adminModel.findOne({"adminEmail": adminEmail}).exec();
    }
    
    async updateAdmin(adminEmail: string, admin: Admin): Promise<any> {
        return await this.adminModel.findOneAndUpdate({"adminEmail": adminEmail}, admin, {new: true});
    }
    
    async deleteAdmin(adminEmail: string): Promise<any> {
        return await this.adminModel.findOneAndRemove({"_id": adminEmail});
    }
}
