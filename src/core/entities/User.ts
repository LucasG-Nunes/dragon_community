export class User {
  username: string;
  authenticatedAt: Date;

  constructor(username: string, authenticatedAt: Date) {
    this.username = username;
    this.authenticatedAt = authenticatedAt;
  }
}
