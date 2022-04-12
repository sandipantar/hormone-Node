import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MailService } from '../mail/mail.service';
import { Model } from 'mongoose';
import { Student } from './student.model';

@Injectable()
export class StudentService {
    
    constructor(
        @InjectModel('Student')
        private readonly studentModel:Model<Student>,
        private mailService: MailService
    ) {}

    //create new Student
    async createStudent(std:Student): Promise <Student | undefined> {
        // const token = Math.floor(1000 + Math.random() * 9000).toString();
        const newStudent = new this.studentModel(std);
        // await this.mailService.sendUserConfirmation(newStudent, token);
        return await newStudent.save();
    }
    
    async findAllStudent(): Promise<Student[] | undefined> {
        return await this.studentModel.find().exec();
    }
    
    async findStudentByEmail(studentEmail: string): Promise<Student | undefined> {
        return await this.studentModel.findOne({"studentEmail": studentEmail}).exec();
    }
    
    async getSnglEnrlCrs(studentEmail: string,couseSlug: string) {
        return await this.studentModel.findOne(
            {"studentEmail": studentEmail,"enrolledCourses.$.courseSlug":couseSlug}
            ).exec();
    }
    
    async updateStudent(studentEmail: string, std: Student): Promise<Student> {
        return await this.studentModel.findOneAndUpdate({"studentEmail": studentEmail}, std, { upsert: true });
    }
    async addCourse(studentEmail: string, enrolledCourse: any) {
        return await this.studentModel.findOneAndUpdate(
            {"studentEmail": studentEmail},
            { $push: { enrolledCourses: enrolledCourse  } }
        );        
    }
    async updateExamStatusP(studentEmail: string ,exam_couseSlug: string, exam_modID: string) {
        return await this.studentModel.findOneAndUpdate(
            {
                "studentEmail": studentEmail,
                "enrolledCourses.courseSlug":exam_couseSlug,
                "enrolledCourses.modules._id": exam_modID
            }, 
            {$set: {"enrolledCourses.$.modules.preStatus": true}}
        );
    }
    async examSubmit(studentEmail: string ,exam_couseSlug: string, exam_modID: string,modd: any): Promise<any> {
        return await this.studentModel.findOneAndUpdate(
            {
                "studentEmail": studentEmail,
                // "enrolledCourses.courseSlug":exam_couseSlug,
                // "enrolledCourses.courseSlug.modules": exam_modID,
            }, 
            {$set: {"enrolledCourses.courseSlug.modules": modd}},
            // {modules:modd},
            { upsert: true }
        );
    }
    
    async deleteStudent(studentEmail: string) {
        return await this.studentModel.findOneAndRemove({"studentEmail": studentEmail});
    }

}
