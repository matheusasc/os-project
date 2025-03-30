export interface ChecklistItem {
  id: number;
  description: string;
  checked: boolean;
}

export interface OrderService {
  id?: number;
  technician: string;
  description: string;
  date: Date | string;
  status: 'open' | 'in_progress' | 'completed';
  checklist: ChecklistItem[];
  photo?: string; // URL ou base64 da foto
}
