export class PasswordChangeRequest {
  public constructor(input: PasswordChangeRequest) {
    Object.assign(this, input);
  }

  public token!: string;

  public userId!: number;

  public usedAt!: Date | null;

  public createdAt!: Date;
}
