import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  Max,
} from 'class-validator'
import { Transform } from 'class-transformer'
import * as dayjs from 'dayjs'

export class CreateReminderDto {
  @IsNotEmpty()
  @IsString()
  content: string

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => {
    if (typeof value === 'number') return value

    try {
      return dayjs(value).valueOf()
    } catch (error) {
      return value
    }
  })
  date: number

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(2)
  type?: number = 1
}
