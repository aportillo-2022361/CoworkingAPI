export interface AccessLog {
  id?: number;
  user_id: number;
  access_type: 'CARD' | 'CODE';
  access_code: string;
  granted: boolean;
  entry_time?: Date;
}