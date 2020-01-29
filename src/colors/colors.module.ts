import { Module } from "@nestjs/common";
import { ColorsService } from "./colors.service";
import { ColorsController } from "./colors.controller";
import { ImagesModule } from "../images/images.module";

@Module({
  imports: [ImagesModule],
  providers: [ColorsService],
  controllers: [ColorsController]
})
export class ColorsModule {}
