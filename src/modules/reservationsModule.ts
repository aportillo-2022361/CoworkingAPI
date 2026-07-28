export interface Reservation {
  id?: number;
  user_id: number;
  desk_id: number;
  start_time: Date | string;
  end_time: Date | string;
  status?: string;
}