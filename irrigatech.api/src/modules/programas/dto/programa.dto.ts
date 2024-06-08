import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { TiempoDto } from "./tiempo.dto";
import { Weekday } from "src/enums/weekday";

export class ProgramaDto {

    @ApiProperty()
    @IsString()
    id: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    valvula: number;

    @ApiProperty({enum: Weekday})
    @IsEnum(Weekday)
    @IsNotEmpty()
    weekday: Weekday;

    @ApiProperty({type: TiempoDto})
    @IsNotEmpty()
    hora: TiempoDto;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    duracion: number;
}