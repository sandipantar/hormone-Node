import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Enrolledcourse } from './enrolledcourse.model';

@Injectable()
export class EnrolledcourseService {
    
    constructor(
        @InjectModel('Enrolledcourse')
        private readonly enrolledcourseModel:Model<Enrolledcourse>,
    ) {}

    //create new Student
    async createEnrollCourse(std:Enrolledcourse): Promise <Enrolledcourse | undefined> {
        const newEnrollCourse = new this.enrolledcourseModel(std);
        return await newEnrollCourse.save();
    }

    async allEnrollCourses(studentEmail: string) {
        return await this.enrolledcourseModel.find( { "studentEmail": studentEmail } ).exec();
    }
    async getSnglEnrlCrs(studentEmail: string,couseSlug: string) {
        return await this.enrolledcourseModel.findOne(
            {"studentEmail": studentEmail,"courseSlug":couseSlug}
        ).exec();
    }

    async updateExamStatusPre(modulesss: any[], studentEmail: string, couseSlug: string)  {
        return await this.enrolledcourseModel.findOneAndUpdate(
            {"studentEmail": studentEmail,"courseSlug":couseSlug}, 
            {$set: {"modules": modulesss}}
        );
    }
}
