import * as mongoose from 'mongoose';
// const Schema = mongoose.Schema


export const EnrolledcourseSchema = new mongoose.Schema({
    studentEmail: {type:String, required: false},
    studentName: {type:String, required: false},
    courseName: {type:String, required: false},
    courseSlug: {type:String, required: false},
    fullCourseTaken: {type:Boolean, required: false},
    modules:[{
        modID : {type:String, required: false},
        moduleName : {type:String, required: false},
        preQusetions:[{  
            question : {type:String, required: false},
            option1 : {type:String, required: false},
            option2 : {type:String, required: false},
            option3 : {type:String, required: false},
            option4 : {type:String, required: false},
            oriAnswer : {type:String, required: false},
            priAnswer : {type:String, required: false},
            postAnswer : {type:String, required: false},
        }],
        finalQusetions:[{  
            question : {type:String, required: false},
            option1 : {type:String, required: false},
            option2 : {type:String, required: false},
            option3 : {type:String, required: false},
            option4 : {type:String, required: false},
            oriAnswer : {type:String, required: false},
            finalAnswer : {type:String, required: false},
        }],
        preStatus: {type:Boolean, required: false},
        postStatus: {type:Boolean, required: false},
        finalStatus: {type:Boolean, required: false},
        preNumber: {type:Number, required: false},
        postNumber: {type:Number, required: false},
        postNumber2: {type:Number, required: false},
        postNumber3: {type:Number, required: false},
        finalNumber: {type:Number, required: false},
        finalNumber2: {type:Number, required: false},
        finalNumber3: {type:Number, required: false},
        preTime: {type:Number, required: false},
        postTime: {type:Number, required: false},
        finalTime: {type:Number, required: false},
        moduleTeacher: {type:String, required: false}
    }],
    paymentStatus: {type:String, required: false},
    paid: {type:Number, required: false},   
});

export interface Enrolledcourse {
    _id: string;
    studentEmail: string;
    studentName: string;
    courseName: string;
    courseSlug: string;
    fullCourseTaken: boolean;
    modules:[{
        _id: string;
        modID : string;
        moduleName : string;
        preQusetions:[{  
            question : string;
            option1 : string;
            option2 : string;
            option3 : string;
            option4 : string;
            oriAnswer : string;
            priAnswer : string;
            postAnswer : string;
        }],
        finalQusetions:[{  
            question : string;
            option1 : string;
            option2 : string;
            option3 : string;
            option4 : string;
            oriAnswer : string;
            finalAnswer : string;
        }],
        preStatus: boolean;
        postStatus: boolean;
        finalStatus: boolean;
        preNumber: number;
        postNumber: number;
        postNumber2: number;
        postNumber3: number;
        finalNumber: number;
        finalNumber2: number;
        finalNumber3: number;
        preTime: number;
        postTime: number;
        finalTime: number;
        moduleTeacher: string;
    }],
    paymentStatus: string;
    paid: number;   
}