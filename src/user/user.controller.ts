import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UpdateUserDto } from 'src/dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Public } from 'src/auth/constants';
import { User } from './user.entity';

@Controller('users')
@ApiTags('Users') // Ajoute une étiquette "Users" à la documentation Swagger
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Récupère tous les utilisateurs' })
  @ApiResponse({ status: 200, description: 'Liste de tous les utilisateurs', type: User, isArray: true })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Récupère un utilisateur par son ID' })
  @ApiResponse({ status: 200, description: 'L\'utilisateur', type: User })
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Get('email/:email')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Récupère un utilisateur par son adresse email' })
  @ApiResponse({ status: 200, description: 'L\'utilisateur', type: User })
  findOneByEmail(@Param('email') email: string) {
    return this.userService.findOneByEmail(email);
  }

  @Post()
  @ApiOperation({ summary: 'Crée un nouvel utilisateur' })
  @ApiResponse({ status: 201, description: 'L\'utilisateur a été créé avec succès', type: User })
  @Public() // Indique que cette route est publique (accessible sans authentification)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Met à jour un utilisateur' })
  @ApiResponse({ status: 200, description: 'L\'utilisateur a été mis à jour avec succès', type: User })
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Supprime un utilisateur' })
  @ApiResponse({ status: 200, description: 'L\'utilisateur a été supprimé avec succès' })
  remove(@Param('id') id: number) {
    return this.userService.remove(id);
  }
}
