import { truncate } from 'fs';
import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;
import { Course, CourseSchema } from '../course/course.model';

export const CrsmoduleSchema = new mongoose.Schema({
    pCourseID: { type: Schema.Types.ObjectId, ref: 'Course' },
    pCourseSlug: {type:String,required: false},
    pCourseName: {type:String,required: false},
    modID : {type:String,required: false},
    moduleName : {type:String,required: false},
    modulePrice: {
        corporatePrice:{type:Number,required: false},
        selfPrice:{type:Number,required: false}
    },
    moduleContent: [{
        name : {type:String,required: false},
        location : {type:String,required: false}
    }],
    moduleExam: [{
        qstnImage : {type:String,required: false},
        question : {type:String,required: false},
        option1 : {type:String,required: false},
        option2 : {type:String,required: false},
        option3 : {type:String,required: false},
        option4 : {type:String,required: false},
        answer : {type:String,required: false},
    }],
    examTime: {
        preTest : {type:Number,required: false},
        postTest : {type:Number,required: false},
        exitTest : {type:Number,required: false}
    },
    moduleTeacher: {type:String, required: false}
});

export interface Crsmodule {
    _id: string;
    pCourseID: string;
    pCourseSlug: string;
    pCourseName: string;
    modID: string;
    moduleName : string;
    modulePrice : {  
        corporatePrice : number;
        selfPrice : number;
    };
    moduleContent : [ {  
        name : string;
        location : string;
    } ];
    moduleExam : [{  
        qstnImage : string;
        question : string;
        option1 : string;
        option2 : string;
        option3 : string;
        option4 : string;
        answer : string;
    }];
    examTime: {
        preTest : number;
        postTest : number;
        exitTest : number;
    };
    moduleTeacher: string;
}