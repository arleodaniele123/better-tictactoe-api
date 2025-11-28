import { Controller, Post, Body } from '@nestjs/common';
import { InfoService } from './info.service';
import { UpdateInfoRequest } from './interfaces';
import { BaseResponse } from '../interfaces';
import { ValidateUserDto } from './dto/validate-user.dto';


@Controller('info')
export class InfoController {
  constructor(private readonly infoService: InfoService) {}

  @Post('/validate')
  getConfig(@Body() bodyRequest: UpdateInfoRequest): Promise<BaseResponse> {
    return this.infoService.validateInfo(bodyRequest);
  }

  @Post('validate-user')
  validateUser(@Body() body: ValidateUserDto) {
    return this.infoService.validateUser(body);
}

}
