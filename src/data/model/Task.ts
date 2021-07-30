export class Task {
  constructor(
    private id: string = '',
    private userId: string,
    private title: string = '',
    private repeat: string[] = [''],
    private reminder: string = '',
    private expiresAt: string = '',
    private subtasks: Task[] = [],
    private isFinished: boolean = false,
  ) {};

  public getId(): string {
    return this.id;
  };

  public getUserId(): string {
    return this.userId;
  };

  public getTitle(): string {
    return this.title;
  };

  public getRepeat(): string[] {
    return this.repeat;
  };

  public getReminder(): string {
    return this.reminder;
  };

  public getExpiresAt(): string {
    return this.expiresAt;
  };

  public getSubtasks(): Task[] {
    return this.subtasks;
  };

  public getIsFinished(): boolean {
    return this.isFinished;
  };
};

export interface InputData {
  title: string,
}
export interface TaskInputDTO {
  inputData: InputData,
  token: string,
};

export interface getTaskInputDTO {
  token: string
};