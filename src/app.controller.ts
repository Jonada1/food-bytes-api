import { Controller, Get, Param, Res } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("uploads/:fileId")
  async serveAvatar(@Param("fileId") fileId, @Res() res): Promise<any> {
    res.sendFile(fileId, { root: "uploads" });
  }
}
