import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Crsmodule } from './crsmodule.model';
// import { CourseService } from '../course/course.service';
import { BlobServiceClient, BlockBlobClient } from '@azure/storage-blob';

@Injectable()
export class CrsmoduleService {
    azureConnection = "DefaultEndpointsProtocol=https;AccountName=hormonestorage;AccountKey=0s1RE9h0bOLqEqfQjN9kg2cd5LzgyiUJSiqXDPpFPZbtaCbgXBG2Qj1y7PZCpjtY4KLulCen8oq9a6WmdO3pmQ==;EndpointSuffix=core.windows.net";
    containerName = "contents";
    
    constructor(
        @InjectModel('Crsmodule')
        // @Inject(forwardRef(() => CourseService))
        // private courseSrv: CourseService,
        private readonly crsmoduleModel:Model<Crsmodule>
    ) {}

    //create new Module
    async createModule(crs:Crsmodule): Promise <any> { 
        const newCourse = new this.crsmoduleModel(crs);
        return await newCourse.save();
    }
    //add questions to Module
    async addQuestionToModule(moduleID: string,qstn:any): Promise <any> {
        return await this.crsmoduleModel.findOneAndUpdate(
            {"_id": moduleID}, 
            {$push: { "moduleExam": qstn }}, { upsert: true }
        );
    }
    
    async findModulesOfCourse(couseSlug: string) {
        return await this.crsmoduleModel.find(
            {"pCourseSlug": couseSlug}
        ).exec();
    }
    async getModuleDetails(modID: string) {
        return await this.crsmoduleModel.find(
            {"_id": modID}
        ).exec();
    }
    
    async updateModule(moduleId: string, modDtl: Crsmodule): Promise<Crsmodule> {
        return await this.crsmoduleModel.findOneAndUpdate({"_id": moduleId}, modDtl, { upsert: true });
    }

    async deleteModule(moduleId: string): Promise<any> {    
        return await this.crsmoduleModel.findOneAndRemove({"_id": moduleId});
    }



    getBlobClient(contentName:string):BlockBlobClient{
        const blobClientService = BlobServiceClient.fromConnectionString(this.azureConnection);
        const containerClient = blobClientService.getContainerClient(this.containerName);
        const blobClient = containerClient.getBlockBlobClient(contentName);
        return blobClient;
    }
     
    async uploadContent(file:Express.Multer.File, moduleId: string){
        const blobClient = this.getBlobClient(file.originalname);
        await blobClient.uploadData(file.buffer);
        const conURL = "https://hormonestorage.blob.core.windows.net/contents/"+file.originalname;
        return await this.crsmoduleModel.findOneAndUpdate(
            {"_id": moduleId}, 
            {$push: { moduleContent: {
                name : file.originalname,
                location : conURL
            }} 
            }
        );
    }
    
    async getContentStream(fileName: string){
        const blobClient = this.getBlobClient(fileName);
        const blobDownloaded = await blobClient.download();
        return blobDownloaded.readableStreamBody;
    }

}
