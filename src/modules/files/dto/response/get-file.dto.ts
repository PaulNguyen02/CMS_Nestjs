import { Expose, Transform} from "class-transformer";
import { ConfigService } from '@nestjs/config';
import { GetBaseDto } from "@/common/dto/get-base.dto";
const WEB_HOST = process.env.WEB_HOST || 'http://localhost:3000'
export class GetFileDto{
    @Expose({ name: 'id' })
    id: string;
    
    @Expose({ name: 'url' })
    @Transform(({ value }) => WEB_HOST + value)
    url: string;
}
export class DetailFile extends GetBaseDto{
    @Expose({ name: 'id' })
    id: string;

    @Expose({ name: 'original_name' })
    originalName: string;

    @Expose({ name: 'url' })
    @Transform(({ value }) => WEB_HOST + value)
    url: string;

    @Expose({ name: 'member_id' })
    memberId: string; 
}