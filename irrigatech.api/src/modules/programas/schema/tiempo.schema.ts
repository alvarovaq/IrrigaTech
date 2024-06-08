import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({_id: false})
export class Tiempo extends Document {
    @Prop({type: Number, required: true})
    hora: number;

    @Prop({type: Number, required: true})
    minuto: number;
}

export const TiempoSchema = SchemaFactory.createForClass(Tiempo);