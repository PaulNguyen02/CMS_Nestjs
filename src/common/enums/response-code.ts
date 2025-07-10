export enum ResponseCode {
  SUCCESS = "Thành công",
  SERVER_ERROR = "Server lỗi",
  VALIDATION_ERROR = "Hãy kiểm tra lại dữ liệu gửi",
}

export enum ErrorMessage {
  NOT_EMPTY = 'không được để trống',
  MUST_BE_STRING = 'phải là kiểu chuỗi',
  MUST_BE_NUMBER = 'phải là kiểu số',
  MUST_BE_BOOLEAN = 'phải là kiểu luận lý',
  MUST_BE_UUID = 'phải là kiểu uuid',
}