import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PostDocument = Post & Document;

@Schema()
export class Post {
  @Prop({ required: true, maxlength: 25 })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: 'started' })
  state: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
