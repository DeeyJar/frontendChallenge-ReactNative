import { ITask } from "../dto/ITask";

export interface CardComponentProps {
    data: ITask[];
    emptyMessage: string;
    onToggleComplete?: (id: number, completed: boolean) => void;
    onRequestDelete?: (id: number) => void;
    onPressItem?: (task: ITask) => void;
    separateCompleted?: boolean;
    bottomPadding?: number;
    isCompleting?: (id: number) => boolean;
    isDeleting?: (id: number) => boolean;
    refreshing?: boolean;
    onRefresh?: () => void;
}