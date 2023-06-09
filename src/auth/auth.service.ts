import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
  constructor(private userService: UserService,
    private jwtService: JwtService) {}

    async validateUser(email: string, pass: string): Promise<any> {
      const user = await this.userService.findOneByEmail(email);
      
      if (user) {
        const isPasswordValid = await bcrypt.compare(pass, user.password);
        
        if (isPasswordValid) {
          const { password, ...result } = user;
          return result;
        }
      }
      
      return null;
    }

  async login(user: any) {
    const payload = { username: user.name, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}