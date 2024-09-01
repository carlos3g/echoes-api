import { Match } from '@app/shared/validators/match.validator';
import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class ChangePasswordRequest {
  @ApiProperty({ minLength: 8 })
  @Length(8)
  public currentPassword!: string;

  @ApiProperty({ minLength: 8 })
  @Length(8)
  public password!: string;

  @ApiProperty({ minLength: 8 })
  @Length(8)
  @Match('password', { message: 'Passwords do not match' })
  public passwordConfirmation!: string;
}