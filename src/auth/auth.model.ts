import * as mongoose from 'mongoose';
const Schema = mongoose.Schema


export const AdminSchema = new mongoose.Schema({
    adminName: {type:String, required: true,unique:true,index:true,sparse:true},
    adminEmail: {type:String, required: true},
    adminPhone: {type:String, required: false},
    adminPic: {type:String, default: false},
    adminPswd: {type:String, required: true},
    adminSplzn: {type:String, required: false},
    adminRating: [{
        rating : {type:Number,required: false},
        user: {type:String,required: false} 
    }],
    adminStat: {type:Boolean, default: true},
    adminCreated: {type:Date, default: false}     
});

export interface Admin {
    id: string;
    adminName: string;
    adminEmail: string;
    adminPhone: string;
    adminPic: string;
    adminPswd: string;
    adminSplzn: string;
    adminRating : [{  
        rating : {type:string},
        user: {type:number}, 
    }];
    adminStat: boolean;
    adminCreated: Date;
}


