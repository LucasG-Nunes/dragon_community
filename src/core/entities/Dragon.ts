export class Dragon {
  id: string;
  name: string;
  type: string;
  createdAt: Date;

  constructor(id: string, name: string, type: string, createdAt: Date) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.createdAt = createdAt;
  }
}
