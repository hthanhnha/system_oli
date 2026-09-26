import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ description: 'Tên sản phẩm' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Giá thị trường' })
  @IsNumber()
  @IsNotEmpty()
  marketPrice: number;

  @ApiProperty({ description: 'Mô tả sản phẩm' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'Thuộc thị trường gì' })
  @IsString()
  @IsNotEmpty()
  marketType: string;

  @ApiProperty({ description: 'Đường dẫn sản phẩm (vd: /product/honda)', required: false })
  @IsString()
  @IsOptional()
  path?: string;
}
