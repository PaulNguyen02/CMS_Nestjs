import { Expose } from "class-transformer";
export class GetBaseDto{
    @Expose({ name: 'createdAt' })
    createdAt: Date;

    @Expose({ name: 'createdBy' })
    createdBy: string;
}