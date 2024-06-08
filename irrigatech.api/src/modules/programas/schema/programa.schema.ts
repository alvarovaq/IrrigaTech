import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Weekday } from "src/enums/weekday";
import { Tiempo, TiempoSchema } from "./tiempo.schema";
import { v4 as uuidv4 } from 'uuid';

@Schema()
export class Programa extends Document {
    @Prop({type: String, default: uuidv4})
    id: string;

    @Prop({type: Number, required: true})
    valvula: number;

    @Prop({type: Number, enum: Weekday, required: true})
    weekday: Weekday;
    
    @Prop({type: TiempoSchema, required: true})
    hora: Tiempo;

    @Prop({type: Number, required: true})
    duracion: number;
}

export const ProgramaSchema = SchemaFactory.createForClass(Programa);