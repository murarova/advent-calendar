import {
  TASK_CATEGORY,
  TASK_CONTEXT,
  TaskOutputType,
  albumScreenmMonthOrder,
} from "../constants/constants";

export interface TextData {
  id: string;
  text: string;
}

export interface ImageData {
  id: string;
  uri?: string;
  width?: number;
  height?: number;
}

export interface TextImageData extends TextData {
  image: ImageData | null;
}

export type AlbumScreenMonth = (typeof albumScreenmMonthOrder)[number];

export interface MonthlyData extends TextImageData {
  month: AlbumScreenMonth;
}

export type MonthlyTasks = Record<AlbumScreenMonth, TextImageData>;

export interface SummaryData extends TextData {
  rate: number;
}

export interface PlanData extends TextData {
  isDone: boolean;
  month?: string;
}

export interface PlanScreenData extends PlanData {
  context: TaskContext;
}

export type TaskContext = (typeof TASK_CONTEXT)[keyof typeof TASK_CONTEXT];

export type PlansCollection = {
  [key in TaskContext]?: PlanScreenData[];
};

export type SummaryCollection = {
  [key in TaskContext]?: PlanScreenData[];
};

export interface TaskConfig {
  category?: string;
  context: TaskContext;
  grade: number;
  taskOutputType: TaskOutputType;
  text: string;
  title: string;
}
export type TaskGategory = (typeof TASK_CATEGORY)[keyof typeof TASK_CATEGORY];

export interface TaskProgress {
  totalTasks: number;
  doneTasks: number;
  donePercentage: number;
}
