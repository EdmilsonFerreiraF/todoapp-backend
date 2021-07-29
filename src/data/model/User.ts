export class User {
  constructor(
    private id: string,
    private firstName: string,
    private lastName: string,
    private username: string,
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

  public getUsername(): string {
    return this.username;
  };

  public getEmail(): string {
    return this.email;
  };

  public getPassword(): string {
    return this.password;
  };
};