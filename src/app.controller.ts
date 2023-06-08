import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { Public } from './auth/constants';

@Controller()
@ApiTags('Auth') // Ajoute une étiquette "Auth" à la documentation Swagger
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('auth/login')
  @ApiOperation({ summary: 'Authentification utilisateur' })
  @ApiBody({
    description: 'Email et mot de passe de l\'utilisateur',
    schema: {
      properties: {
        email: {
          type: 'string',
          example: 'john.doe@example.com',
        },
        password: {
          type: 'string',
          example: 'MotDePasse123',
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Utilisateur authentifié' })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}