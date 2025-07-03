export class PaginationDto<T>{
  data: T[];
  total: number;
  page: number;
  lastPage: number;

  constructor(partial: Partial<PaginationDto<T>>) {
    Object.assign(this, partial);
  }
}