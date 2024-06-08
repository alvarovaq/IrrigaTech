import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class TiempoDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    hora: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    minuto: number;
}