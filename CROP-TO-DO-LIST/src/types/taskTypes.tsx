export interface TaskType{
    text:string;
    columnId:number;
    uid: number;
    dueDate?: string;
    priority: 'low' | 'medium' | 'high';
    createdAt: string;
    isEditing?: boolean;
}

