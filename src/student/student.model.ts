import * as mongoose from 'mongoose';
// const Schema = mongoose.Schema

export const StudentSchema = new mongoose.Schema({
    studentID: {type:String, required: false},
    studentName: {type:String, required: true},
    stdFHName: {type:String, required: false},
    studentPicture: {type:String, required: false},
    studentAddress: {
        address:{type:String, required: false},
        city:{type:String, required: false},
        pin:{type:Number, required: false},
    },
    studentDob: {type:Date, required: false},
    studentGender: {type:String, required: false},
    studentEmail: {type:String, required: true,unique:true},
    studentPassword: {type:String, required: false},
    source: {type:String, required: false},
    studentPhone: {
        mobile:{type:Number, required: false},
        whatsapp:{type:Number, required: false},
    },
    studentProfDtls: {
        medRegNo:{type:String, required: false},
        practiceArea:{type:String, required: false},
        eduQualification:{type:String, required: false},
    },
    enrolledCourses:[{
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
            preStatus: {type:Boolean, required: false},
            postStatus: {type:Boolean, required: false},
            finalStatus: {type:Boolean, required: false},
            preNumber: {type:Number, required: false},
            postNumber: {type:Number, required: false},
            preNumber2: {type:Number, required: false},
            postNumber2: {type:Number, required: false},
            preNumber3: {type:Number, required: false},
            postNumber3: {type:Number, required: false},
            finalNumber: {type:Number, required: false},
            preTime: {type:Number, required: false},
            postTime: {type:Number, required: false},
            finalTime: {type:Number, required: false},
        }],
        paymentStatus: {type:String, required: false},
        paid: {type:Number, required: false},
    }],
    studentPermission: {type:Boolean, required: false},
    studentCreated: {type:Date, default: () => Date.now()},
    studentUpdated: {type:Date, default: () => Date.now()}     
});

export interface Student {
    _id: string;
    studentID: string;
    studentName: string;
    stdFHName: string;
    studentPicture: string;
    studentAddress: {
        address: string;
        city: string;
        pin: number;
    },
    studentDob: Date;
    studentGender: string;
    studentEmail: string;
    studentPassword: string;
    source: string;
    studentPhone: {
        mobile: number;
        whatsapp: number;
    };
    studentProfDtls: {
        medRegNo: string;
        practiceArea: string;
        eduQualification:string;
    };
    enrolledCourses:[{
        courseName: string;
        courseSlug: string;
        fullCourseTaken: boolean;
        modules:[{
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
            }];
            preStatus: boolean;
            postStatus: boolean;
            finalStatus: boolean;
            preNumber: number;
            postNumber: number;
            finalNumber: number;
            postNumber2: number;
            finalNumber2: number;
            postNumber3: number;
            finalNumbe3r: number;
            preTime: number;
            postTime: number;
            finalTime: number;
        }];
        paymentStatus: string;
        paid: number;
    }];
    studentPermission: boolean;
    studentCreated: Date;
    studentUpdated: Date;
}