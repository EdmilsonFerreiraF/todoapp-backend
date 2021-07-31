export class List {
  constructor(
    private id: string,
    private userId: string,
    private title: string,
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
};

export interface ListInputDTO {
  title: string,
  token: string,
};

export interface getListInputDTO {
  token: string
};