import { Body, Controller,NotFoundException,Post,Get,Param,Patch, Delete, 
    BadRequestException,UseInterceptors, UploadedFile,Res,Header,Query } from '@nestjs/common';
import { Crsmodule } from './crsmodule.model';
import { CrsmoduleService } from './crsmodule.service';
import { CourseService } from '../course/course.service';
import { FileInterceptor } from '@nestjs/platform-express';
// import { diskStorage } from 'multer';
// import { editFileName, imageFileFilter } from '../utils/file-uploading.utils';

@Controller('crsmodule')
export class CrsmoduleController {
    
    constructor(
        private readonly crsmoduleSrvc:CrsmoduleService,
        private readonly courseSrv:CourseService
    ) {}

    // create new Module
    @Post()
    async createModule(@Body() mod:Crsmodule) {
        const newModule = await this.crsmoduleSrvc.createModule(mod);
        if(!newModule) {
            throw new BadRequestException('Module not created');
        }
        await this.courseSrv.updateCrsModCount(newModule.pCourseID,newModule._id,newModule.moduleName);
        return newModule;
    }
    
    //add questions to Module
    @Post('/question/:moduleID')
    async addQuestionToModule(@Param("moduleID") moduleID : string,@Body("moduleExam") qtns:any[]) {
        
        let uploaded = true;
        for(let i=0,n=qtns.length;i<n;i++) {
            const newQstn = await this.crsmoduleSrvc.addQuestionToModule(moduleID,qtns[i]);
            if(!newQstn) {
                uploaded = false;
            }
        }
        // let newQstn = await this.crsmoduleSrvc.addQuestionToModule(moduleID,qtns);

        if(uploaded) {
            return "All question uploaded";
        } else {
            return "Could not upload all, check the question set.";
        }

        // return qtns[0];
    }

    //add files to module
    @Post('/content/:moduleID')
    @UseInterceptors(FileInterceptor('file'))
    async uploadContent(@UploadedFile() file: Express.Multer.File,@Param("moduleID") moduleID : string) {
        await this.crsmoduleSrvc.uploadContent(file,moduleID);
        return "uploaded";
    }
    @Get('read-image')
    @Header('Content-Type','image/webp')
    async getContentStream(@Res() res,@Query('filename') filename){
        const file = await this.crsmoduleSrvc.getContentStream(filename);
        return file.pipe(res);
    }
    
    // get all modules of a course
    @Get('/:slug')
    async findModulesOfCourse(@Param("slug") slug : string)   {
        const showModule = await this.crsmoduleSrvc.findModulesOfCourse(slug);
        if(!showModule) {
            throw new NotFoundException('No Module found');
        }
        return showModule;
    }
    // get module details
    @Get('/modDetail/:modID')
    async getModuleDetails(@Param("modID") modID : string)   {
        const showModule = await this.crsmoduleSrvc.getModuleDetails(modID);
        if(!showModule) {
            throw new NotFoundException('Module not found');
        }
        return showModule;
    }

    //update details of a course module
    @Patch('/:modID')
    async updateModule( @Param('modID') modID: string, @Body('modDtl') modDtl: Crsmodule) {
        const update = await this.crsmoduleSrvc.updateModule(modID, modDtl);
        return update;
    }

    //delete a module in course
    @Delete('/:moduleId')
    async deleteModule( @Param("moduleId") moduleId : string) {
        const deletedMod = await this.crsmoduleSrvc.deleteModule(moduleId);  
        if(deletedMod) {     
            return "Deleted selected module";
        } 
    } 

}
