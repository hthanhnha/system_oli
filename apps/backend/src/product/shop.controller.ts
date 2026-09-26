import { Controller, Get, Post, Body, UseGuards, Request, ForbiddenException, Query, Delete, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ShopService } from './shop.service';
import { CreateProductDto } from './dto/create-product.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Product')
@Controller('shop/products')
export class ShopController {
  constructor(private readonly shopService: ShopService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Tạo sản phẩm mới (Chỉ Admin)' })
  @ApiResponse({ status: 201, description: 'Sản phẩm được tạo thành công' })
  @ApiResponse({ status: 403, description: 'Không có quyền truy cập (yêu cầu Admin)' })
  async create(@Request() req: any, @Body() createProductDto: CreateProductDto) {
    if (req.user.role !== 'admin') {
      throw new ForbiddenException('Chỉ Admin mới có quyền tạo sản phẩm');
    }
    const data = await this.shopService.create(createProductDto);
    return { success: true, message: 'Bạn đã thêm thành công sản phẩm', data };
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách tất cả sản phẩm (Ai cũng xem được)' })
  @ApiResponse({ status: 200, description: 'Trả về danh sách sản phẩm' })
  @ApiQuery({ name: 'page', required: false, description: 'Trang hiện tại (mặc định: 1)' })
  @ApiQuery({ name: 'limit', required: false, description: 'Số lượng trên 1 trang (mặc định: 10)' })
  async findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const result = await this.shopService.findAll(pageNum, limitNum);
    return { success: true, message: 'Lấy danh sách sản phẩm thành công', ...result };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Xóa sản phẩm (Chỉ Admin)' })
  @ApiResponse({ status: 200, description: 'Sản phẩm được xóa thành công' })
  @ApiResponse({ status: 403, description: 'Không có quyền truy cập (yêu cầu Admin)' })
  async remove(@Request() req: any, @Param('id') id: string) {
    if (req.user.role !== 'admin') {
      throw new ForbiddenException('Chỉ Admin mới có quyền xóa sản phẩm');
    }
    await this.shopService.remove(id);
    return { success: true, message: 'Bạn đã xóa thành công sản phẩm' };
  }
}
