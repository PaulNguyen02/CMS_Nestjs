import { GetFollowusDto } from "./dto/get-followus.dto";
import { CreateFollowusDto } from "./dto/create-followus.dto";
export interface IFollowUsService{
    create(dto: CreateFollowusDto): Promise<GetFollowusDto>;
    get(): Promise<GetFollowusDto[]>
    delete(follow_us_id: string): Promise<GetFollowusDto>
}