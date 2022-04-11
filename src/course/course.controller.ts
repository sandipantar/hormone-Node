import { Body, Controller,NotFoundException,Post,Get,Param,Patch,Delete, BadRequestException } from '@nestjs/common';
import { Course } from './course.model';
import { CourseService } from './course.service';

@Controller('course')
export class CourseController {
    
    constructor(
        private readonly courseSrv:CourseService,
    ) {}

    //create new course
    @Post()
    async createCourse(@Body() course:Course) {
        course.couseSlug = course.couseName.replace(/ /g, '');
        const newCourse = await this.courseSrv.createCourse(course);
        if(!newCourse) {
            throw new BadRequestException('Course not created');
        }
        return newCourse;
    }
    
    //get all course
    @Get()
    async findAllCourse() {
        const allCourse = await this.courseSrv.findAllCourse();
        if(!allCourse) {
            throw new NotFoundException('Course not found');
        }
        return allCourse;        
    } 

    //get details of a course
    @Get('/:couseSlug')
    async findCourseBySlug(@Param("couseSlug") couseSlug : string)   {
        const showCourse = await this.courseSrv.findCourseBySlug(couseSlug);
        if(!showCourse) {
            throw new NotFoundException('Course not found');
        }
        return showCourse;
    }

    //update details of a course
    @Patch('/:couseSlug')
    async updateCourse( @Param('couseSlug') couseSlug: string, @Body() course:Course) {
        const update = await this.courseSrv.updateCourse(couseSlug, course);
        return update;
    }

    //delete a course
    @Delete('/:couseSlug')
    async deleteCourse( @Param("couseSlug") couseSlug: string) {
        const deletedBook = await this.courseSrv.deleteCourse(couseSlug);        
        return `Deleted course with Slug ${couseSlug}`;
    } 
}
