import { GetInformationDto } from "./dto/get-information.dto";
import { CreateInformationDto } from "./dto/create-information.dto";
import { UpdateInformationDto } from "./dto/update-information.dto";
export interface IInformationService{
    create(dto: CreateInformationDto): Promise<GetInformationDto>;
    update (information_id: string, dto: UpdateInformationDto): Promise<GetInformationDto>
    get(): Promise<GetInformationDto[]>
    delete(information_id: string): Promise<GetInformationDto>
}