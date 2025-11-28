import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { UpdateInfoRequest as UpdateInfoRequestInterface } from './interfaces';
import { BaseResponse } from '../interfaces';
import { UpdateInfoRequest } from './models';

@Injectable()
export class InfoService {
  async validateInfo(
    rawData: UpdateInfoRequestInterface,
  ): Promise<BaseResponse> {
    const data = plainToClass(UpdateInfoRequest, rawData);
    const validationErrors = await validate(data);
    if (validationErrors.length > 0) {
      return {
        success: false,
        errors: validationErrors,
      };
    }
    return {
      success: true,
      data,
    };
  }

validateUser(data) {
  // Controllo lunghezza nome
  if (!data.name || data.name.length < 5 || data.name.length > 50) {
    return { valid: false, message: "Nome non valido: lunghezza tra 5 e 50 caratteri" };
  }

  // Controllo età
  const ageNumber = Number(data.age);
  if (isNaN(ageNumber) || ageNumber < 1 || ageNumber > 150) {
    return { valid: false, message: "Età non valida: deve essere tra 1 e 150" };
  }

  // Controllo married solo se età > 18
  if (ageNumber > 18 && data.married === undefined) {
    return { valid: false, message: "Il campo 'married' è obbligatorio se età > 18" };
  }

  // Controllo data di nascita coerente con età
  const birthDate = new Date(data.dateOfBirth);
  if (isNaN(birthDate.getTime())) {
    return { valid: false, message: "Data di nascita non valida" };
  }

  const today = new Date();
  let calculatedAge = today.getFullYear() - birthDate.getFullYear();
  if (
    today.getMonth() < birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())
  ) {
    calculatedAge--;
  }

  if (calculatedAge !== ageNumber) {
    return { valid: false, message: "Validazione errata: età non coerente con data di nascita" };
  }

  return { valid: true, message: "Validazione corretta: età valida" };
}


}
