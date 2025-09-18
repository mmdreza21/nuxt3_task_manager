export interface Task {
  id: string;
  title: string;
  desc?: string;
  priority: number;
  status: "Todo" | "Doing" | "ToReview" | "Done" | "Canceled";
  createdAt: string;
  doneAt?: string;
}

export interface CreateTaskDto {
  title: string;
  desc?: string;
  priority?: number;
  status: "Todo" | "Doing" | "ToReview" | "Done" | "Canceled";
}

export interface ChangeStatusDto {
  status: "Todo" | "Doing" | "ToReview" | "Done" | "Canceled";
}
