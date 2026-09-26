import { Controller, Post, Body, Get, UseGuards, Request, ForbiddenException, Inject, forwardRef, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AuthService } from '../auth/auth.service';
import { RegisterDto } from '../auth/dto/register.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  @ApiOperation({ summary: 'Đăng ký tài khoản người dùng mới' })
  @ApiResponse({ status: 201, description: 'Tạo tài khoản và trả về JWT Access Token' })
  @ApiResponse({ status: 400, description: 'Dữ liệu không hợp lệ hoặc Email đã tồn tại' })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Lấy thông tin người dùng đang đăng nhập' })
  @ApiResponse({ status: 200, description: 'Trả về thông tin cá nhân của User từ Token' })
  @ApiResponse({ status: 401, description: 'Chưa đăng nhập hoặc Token hết hạn' })
  async getProfile(@Request() req: any) {
    return { success: true, message: 'Lấy thông tin cá nhân thành công', data: req.user };
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Lấy danh sách tất cả tài khoản (Chỉ Admin)' })
  @ApiResponse({ status: 200, description: 'Trả về danh sách tài khoản' })
  @ApiResponse({ status: 401, description: 'Chưa đăng nhập hoặc Token hết hạn' })
  @ApiResponse({ status: 403, description: 'Không có quyền truy cập (yêu cầu Admin)' })
  @ApiQuery({ name: 'page', required: false, description: 'Trang hiện tại (mặc định: 1)' })
  @ApiQuery({ name: 'limit', required: false, description: 'Số lượng trên 1 trang (mặc định: 10)' })
  async getAllUsers(
    @Request() req: any,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    if (req.user.role !== 'admin') {
      throw new ForbiddenException('Bạn không có quyền xem thông tin này, yêu cầu tài khoản Admin');
    }
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const result = await this.authService.getAllUsers(pageNum, limitNum);
    return { success: true, message: 'Lấy danh sách tài khoản thành công', ...result };
  }
}
