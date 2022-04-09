import { truncate } from 'fs';
import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;
import { Crsmodule,CrsmoduleSchema } from '../crsmodule/crsmodule.model';

export const CourseSchema = new mongoose.Schema({
    couseName: {type:String, required: true},
    couseSlug: {type:String, required: false},
    courseModule:[{
        id:{ type: Schema.Types.ObjectId, ref: 'Crsmodule' },
        name:{type:String, required: true}
    }], 
    noSingleModule: {type:Boolean, required: false},
    coursePrice: {
        corporatePrice:{type:Number,required: false},
        selfPrice:{type:Number,required: false}
    },
    couseTenure: {type:Number, required: false},
    courseCreated: {type:Date, default: () => Date.now()}     
});

export interface Course {
    _id: string;
    couseName: string;
    couseSlug: string;
    courseModule:[{
        id:string;
        name:string;
    }];
    noSingleModule: boolean;
    coursePrice: {
        corporatePrice:number;
        selfPrice:number;
    };
    couseTenure: number;
    courseCreated: Date;
}