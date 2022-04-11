import { Injectable,forwardRef,Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course } from './course.model';
import { CrsmoduleService } from '../crsmodule/crsmodule.service';

@Injectable()
export class CourseService {
    
    constructor(
        @InjectModel('Course')
        // @Inject(forwardRef(() => CrsmoduleService))
        // private crsmoduleSrvc: CrsmoduleService,
        private readonly courseModel:Model<Course>
    ) {}

    //create new Course
    async createCourse(crs:Course): Promise <any> { 
        const newCourse = new this.courseModel(crs);
        return await newCourse.save();
    }
    //create new Module
    async createModule(couseSlug: string,modd:any): Promise <any> {
        return await this.courseModel.findOneAndUpdate(
            {"couseSlug": couseSlug}, 
            {$push: { courseModule: modd} }
        );
    }
    
    async findAllCourse(): Promise<Course[]> {
        return await this.courseModel.find().exec();
    }
        
    async findCourseBySlug(couseSlug: string): Promise<Course> {
        return await this.courseModel.findOne({"couseSlug": couseSlug}).exec();
    }  

    async updateCourse(couseSlug: string, course: Course): Promise<Course> {
        return await this.courseModel.findOneAndUpdate( {"couseSlug": couseSlug}, 
        course, { upsert: true });
    }
    
    async updateCrsModCount(pCourseID: string, modID: string, moduleName: string): Promise<any> {
        return await this.courseModel.findOneAndUpdate( {"_id": pCourseID}, 
            {$push: { "courseModule": {
                            id:modID,
                            name:moduleName
                        } 
                    }}, 
            { upsert: true });
    }
    
    async deleteCourse(couseSlug: string): Promise<any> {
        return await this.courseModel.findOneAndRemove({"couseSlug": couseSlug});
    }
}
