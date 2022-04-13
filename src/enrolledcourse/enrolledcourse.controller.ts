import { Body, Controller,NotFoundException,Post,Get,Param,Patch,Delete, BadRequestException } from '@nestjs/common';
import { Enrolledcourse } from './enrolledcourse.model';
import { EnrolledcourseService } from './enrolledcourse.service';

@Controller('enrolledcourse')
export class EnrolledcourseController {
    
    constructor(
        private readonly enrolledcourseService:EnrolledcourseService,
    ) {}

    //create new enrolledcourse
    @Post()
    async createEnrollCourse(@Body() enrolledcourse:Enrolledcourse) {
        const newEnrollCourse = await this.enrolledcourseService.createEnrollCourse(enrolledcourse);
        if(!newEnrollCourse) {
            throw new BadRequestException('Enrolledcourse not created');
        }
        return newEnrollCourse; 
    }

    //get details of all enrolled courses
    @Get('/:studentEmail')
    async allEnrollCourses(@Param("studentEmail") studentEmail : string)   {
        const showEnCrss = await this.enrolledcourseService.allEnrollCourses(studentEmail);
        if(!showEnCrss) {
            throw new NotFoundException('Student not found');
        }
        return showEnCrss;
    }
    //get details of a single enrolled courses
    // @Get('/enrolled/single/:studentEmail/:crsSlug')
    @Get('/single/:studentEmail/:crsSlug')
    async getSnglEnrlCrs(@Param("studentEmail") studentEmail : string,@Param("crsSlug") crsSlug : string)   {
        const showSinEnCrss = await this.enrolledcourseService.getSnglEnrlCrs(studentEmail,crsSlug);
        if(!showSinEnCrss) {
            throw new NotFoundException('This course was not enrolled by the student');
        }        
        return showSinEnCrss;
    }
    //update pre exam status
    @Patch('/examStatPre/:studentEmail/:exam_couseSlug/:exam_modID')
    async updateExamStatusPre( 
        @Param('studentEmail') studentEmail: string,
        @Param('exam_couseSlug') exam_couseSlug: string,
        @Param('exam_modID') exam_modID: string
    ) {
        const newModss = [];
        const showSinEnCrss = await this.enrolledcourseService.getSnglEnrlCrs(studentEmail,exam_couseSlug);
        for(let i=0,nn=showSinEnCrss.modules.length;i<nn;i++) {
            if(showSinEnCrss.modules[i].modID === exam_modID){
                showSinEnCrss.modules[i].preStatus = true;
            }
            newModss.push(showSinEnCrss.modules[i]);
        }
        const statPre = await this.enrolledcourseService.updateExamStatusPre(newModss,studentEmail,exam_couseSlug);
        return statPre;
    }
    //update pre exam status
    @Patch('/preExamSubmit/:studentEmail/:exam_couseSlug/:exam_modID')
    async preExamSubmit( 
        @Param('studentEmail') studentEmail: string,
        @Param('exam_couseSlug') exam_couseSlug: string,
        @Param('exam_modID') exam_modID: string,
        @Body('preAns') preAns: string[],
        @Body('preScore') preScore: number
    ) {
        const newModss = [];
        const showSinEnCrss = await this.enrolledcourseService.getSnglEnrlCrs(studentEmail,exam_couseSlug);
        for(let i=0,nn=showSinEnCrss.modules.length;i<nn;i++) {
            if(showSinEnCrss.modules[i].modID === exam_modID){
                for(let j=0;j<10;j++) {
                    showSinEnCrss.modules[i].preQusetions[j].priAnswer = preAns[j];
                }
                showSinEnCrss.modules[i].preNumber = preScore;
            }
            newModss.push(showSinEnCrss.modules[i]);
        }
        const statPre = await this.enrolledcourseService.updateExamStatusPre(newModss,studentEmail,exam_couseSlug);
        return statPre;
    }
}