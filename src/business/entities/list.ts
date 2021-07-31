export enum Day {
    MONDAY = 0,
    TUESDAY = 1,
    WEDNESDAY = 2,
    THURSDAY = 3,
    FRIDAY = 4,
    SATURDAY = 5,
    SUNDAY = 6
};

export interface Task {
    id: string,
    userId: string,
    title: string,
    repeat: Day[],
    reminder: string,
    expiresAt: Date,
    subtasks: Task[],
    isFinished: false
}

export interface List {
    id: String,
    name: String,
    userId: String,
    tasks: Task[]
};