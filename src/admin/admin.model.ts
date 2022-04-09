import * as mongoose from 'mongoose';
const Schema = mongoose.Schema


export const AdminSchema = new mongoose.Schema({
    adminName: {type:String, required: true,unique:true,index:true,sparse:true},
    adminEmail: {type:String, required: false},
    adminPhone: {type:String, required: false},
    adminPic: {type:String, required: false},
    adminPswd: {type:String, required: false},
    adminSplzn: {type: String, enum: ["Admin", "Modarator", "Teacher"]},
    adminRating: [{
        rating : {type:Number,required: false},
        user: {type:String,required: false} 
    }],
    adminStat: {type:Boolean, required: false},
    degree: {type:String, required: false,default:"MBBS"},
    position: {type:String, required: false,default:"Professor"},
    location: {type:String, required: false,default:"Kolkata"},
    adminCreated: {type:Date, default: () => Date.now()}     
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
    degree: string;
    position: string;
    location: string;
    adminCreated: Date;
}