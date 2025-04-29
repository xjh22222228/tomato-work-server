import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import { dateTransformer } from '@/utils/transformerUtils'
import { DateEntity } from '@/entities/date.entity'

@Entity('reminders')
export class Reminder extends DateEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  uid: number

  @Column()
  content: string

  @Column({ type: 'bigint', transformer: dateTransformer() })
  date: BigInt

  @Column({
    type: 'tinyint',
    default: 1,
    comment: '事项类型, 1=待提醒, 2=已提醒',
  })
  type: number
}
