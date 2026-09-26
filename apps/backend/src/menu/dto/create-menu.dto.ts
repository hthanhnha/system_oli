import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMenuDto {
  @ApiProperty({ description: 'Tên menu (Ví dụ: Trang chủ)' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Đường dẫn URL (Ví dụ: /home)' })
  @IsString()
  @IsNotEmpty()
  path: string;

  @ApiProperty({ description: 'Trạng thái hiển thị (Mặc định: true)', required: false })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
