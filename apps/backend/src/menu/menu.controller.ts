import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Request, ForbiddenException, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Menu')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Thêm menu mới (Chỉ Admin)' })
  @ApiResponse({ status: 201, description: 'Menu được tạo thành công' })
  async create(@Request() req: any, @Body() createMenuDto: CreateMenuDto) {
    if (req.user.role !== 'admin') throw new ForbiddenException('Chỉ Admin mới có quyền thêm Menu');
    const data = await this.menuService.create(createMenuDto);
    return { success: true, message: 'Bạn đã thêm thành công menu', data };
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách menu (Ai cũng xem được)' })
  @ApiResponse({ status: 200, description: 'Trả về danh sách menu' })
  @ApiQuery({ name: 'page', required: false, description: 'Trang hiện tại (mặc định: 1)' })
  @ApiQuery({ name: 'limit', required: false, description: 'Số lượng trên 1 trang (mặc định: 10)' })
  async findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const result = await this.menuService.findAll(pageNum, limitNum);
    return { success: true, message: 'Lấy danh sách menu thành công', ...result };
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Sửa thông tin menu (Chỉ Admin)' })
  async update(@Request() req: any, @Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
    if (req.user.role !== 'admin') throw new ForbiddenException('Chỉ Admin mới có quyền sửa Menu');
    const data = await this.menuService.update(id, updateMenuDto);
    return { success: true, message: 'Bạn đã cập nhật thành công menu', data };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Xóa menu (Chỉ Admin)' })
  async remove(@Request() req: any, @Param('id') id: string) {
    if (req.user.role !== 'admin') throw new ForbiddenException('Chỉ Admin mới có quyền xóa Menu');
    await this.menuService.remove(id);
    return { success: true, message: 'Bạn đã xóa thành công menu' };
  }
}
