import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { GoogleStrategy } from "./google.strategy";
import { JwtStrategy } from "./jwt.strategy";
import { UserModule } from "../user/user.module";
import { UserService } from "../user/user.service";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    MongooseModule.forRoot("mongodb://localhost:27017/food-bytes"),
    UserModule
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, JwtStrategy]
})
export class AuthModule {}
