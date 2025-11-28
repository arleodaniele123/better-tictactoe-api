import { IsString, MinLength, MaxLength, IsInt, Min, Max, IsBoolean, ValidateIf, IsDateString } from 'class-validator';

export class ValidateUserDto {
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  name: string;

  @IsInt()
  @Min(1)
  @Max(150)
  age: number;

  @ValidateIf(o => o.age > 18)
  @IsBoolean()
  married: boolean;

  @IsDateString()
  dateOfBirth: string;
}
