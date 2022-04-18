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
    async createEnrollCourse(
        @Body("enrolledCourses") enrolledcourse:Enrolledcourse
    ) {
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
            if(showSinEnCrss.modules[i]._id == exam_modID){
                showSinEnCrss.modules[i].preStatus = true;
            }
            newModss.push(showSinEnCrss.modules[i]);
        }
        const statPre = await this.enrolledcourseService.updateExamStatusPre(newModss,studentEmail,exam_couseSlug);
        return statPre;
    }
    //update pre exam submit
    @Patch('/preExamSubmit/:studentEmail/:exam_couseSlug/:exam_modID/:score')
    async preExamSubmit( 
        @Param('studentEmail') studentEmail: string,
        @Param('exam_couseSlug') exam_couseSlug: string,
        @Param('exam_modID') exam_modID: string,
        @Param('score') score: number,
        @Body('priiiiAns') preAns: string[],
    ) {
        const newModss = [];
        const showSinEnCrss = await this.enrolledcourseService.getSnglEnrlCrs(studentEmail,exam_couseSlug);
        for(let i=0,nn=showSinEnCrss.modules.length;i<nn;i++) {
            if(showSinEnCrss.modules[i]._id == exam_modID){
                for(let j=0;j<10;j++) {
                    showSinEnCrss.modules[i].preQusetions[j].priAnswer = preAns[j];
                }
                showSinEnCrss.modules[i].preNumber = score;
            }
            newModss.push(showSinEnCrss.modules[i]);
        }
        const statPre = await this.enrolledcourseService.updateExamStatusPre(newModss,studentEmail,exam_couseSlug);
        return statPre;
    }
    //update post exam status
    @Patch('/examStatPost/:studentEmail/:exam_couseSlug/:exam_modID')
    async updateExamStatusPost( 
        @Param('studentEmail') studentEmail: string,
        @Param('exam_couseSlug') exam_couseSlug: string,
        @Param('exam_modID') exam_modID: string
    ) {
        const newModss = [];
        const showSinEnCrss = await this.enrolledcourseService.getSnglEnrlCrs(studentEmail,exam_couseSlug);
        for(let i=0,nn=showSinEnCrss.modules.length;i<nn;i++) {
            if(showSinEnCrss.modules[i]._id == exam_modID){
                showSinEnCrss.modules[i].postStatus = true;
            }
            newModss.push(showSinEnCrss.modules[i]);
        }
        const statPre = await this.enrolledcourseService.updateExamStatusPre(newModss,studentEmail,exam_couseSlug);
        return statPre;
    }
    //update pre exam submit
    @Patch('/postExamSubmit/:studentEmail/:exam_couseSlug/:exam_modID/:score')
    async postExamSubmit( 
        @Param('studentEmail') studentEmail: string,
        @Param('exam_couseSlug') exam_couseSlug: string,
        @Param('exam_modID') exam_modID: string,
        @Param('score') score: number,
        @Body('priiiiAns') preAns: string[],
    ) {
        const newModss = [];
        const showSinEnCrss = await this.enrolledcourseService.getSnglEnrlCrs(studentEmail,exam_couseSlug);
        for(let i=0,nn=showSinEnCrss.modules.length;i<nn;i++) {
            if(showSinEnCrss.modules[i]._id == exam_modID){
                for(let j=0;j<10;j++) {
                    showSinEnCrss.modules[i].preQusetions[j].postAnswer = preAns[j];
                }
                showSinEnCrss.modules[i].postNumber = score;
            }
            newModss.push(showSinEnCrss.modules[i]);
        }
        const statPre = await this.enrolledcourseService.updateExamStatusPre(newModss,studentEmail,exam_couseSlug);
        return statPre;
    }
    //update final exam status
    @Patch('/examStatFinal/:studentEmail/:exam_couseSlug/:exam_modID')
    async updateExamStatusFinal( 
        @Param('studentEmail') studentEmail: string,
        @Param('exam_couseSlug') exam_couseSlug: string,
        @Param('exam_modID') exam_modID: string
    ) {
        const newModss = [];
        const showSinEnCrss = await this.enrolledcourseService.getSnglEnrlCrs(studentEmail,exam_couseSlug);
        for(let i=0,nn=showSinEnCrss.modules.length;i<nn;i++) {
            if(showSinEnCrss.modules[i]._id == exam_modID){
                showSinEnCrss.modules[i].finalStatus = true;
            }
            newModss.push(showSinEnCrss.modules[i]);
        }
        const statPre = await this.enrolledcourseService.updateExamStatusPre(newModss,studentEmail,exam_couseSlug);
        return statPre;
    }
    //update final exam submit
    @Patch('/finalExamSubmit/:studentEmail/:exam_couseSlug/:exam_modID/:score')
    async finalExamSubmit( 
        @Param('studentEmail') studentEmail: string,
        @Param('exam_couseSlug') exam_couseSlug: string,
        @Param('exam_modID') exam_modID: string,
        @Param('score') score: number,
        @Body('priiiiAns') preAns: string[],
    ) {
        const newModss = [];
        const showSinEnCrss = await this.enrolledcourseService.getSnglEnrlCrs(studentEmail,exam_couseSlug);
        for(let i=0,nn=showSinEnCrss.modules.length;i<nn;i++) {
            if(showSinEnCrss.modules[i]._id == exam_modID){
                for(let j=0;j<10;j++) {
                    showSinEnCrss.modules[i].finalQusetions[j].finalAnswer = preAns[j];
                }
                showSinEnCrss.modules[i].finalNumber = score;
            }
            newModss.push(showSinEnCrss.modules[i]);
        }
        const statPre = await this.enrolledcourseService.updateExamStatusPre(newModss,studentEmail,exam_couseSlug);
        return statPre;
    }
}
