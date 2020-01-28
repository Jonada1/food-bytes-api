import { Controller, Get, Param } from '@nestjs/common';
import { ImagesService } from '../images/images.service';
import Vibrant = require('node-vibrant');
@Controller('colors')
export class ColorsController {
    constructor(private readonly imageService: ImagesService) {}
    @Get(':id')
    public async getColors(@Param('id') id: string) {
        const url = await (await this.imageService.getById(id)).url;
        return await Vibrant.from(url).getPalette();
    }
}
