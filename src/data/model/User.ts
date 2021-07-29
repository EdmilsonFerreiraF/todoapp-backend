export class User {
  constructor(
    private id: string,
    private firstName: string,
    private lastName: string,
    private nickname: string,
    private email: string,
    private password: string
  ) {};

  public getId(): string {
    return this.id;
  };

  public getFirstName(): string {
    return this.firstName;
  };
  public getLastName(): string {
    return this.lastName;
  };

  public getNickname(): string {
    return this.nickname;
  };

  public getEmail(): string {
    return this.email;
  };

  public getPassword(): string {
    return this.password;
  };
};