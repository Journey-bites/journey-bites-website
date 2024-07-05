export enum InputType {
  TEXT = 'text',
  PASSWORD = 'password',
}

export enum OrderBy {
  ASC = 'asc',
  DESC = 'desc',
}

// TODO: add the values after api ready
export enum OrderStatus {
  PENDING, // 待處理
  // VALID, // 已成立
  // TRACKING, // 任務進行中
  COMPLETED, // 任務完成
  CANCELED, // 訂單已取消
  INVALID, // 訂單不成立
}