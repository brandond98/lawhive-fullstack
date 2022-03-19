import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectType, Field, InputType, ID } from '@nestjs/graphql';

export type PostDocument = Post & Document;

@ObjectType()
@Schema()
export class Post {
  @Field(() => ID)
  @Prop()
  _id: number;

  @Field()
  @Prop({ required: true, maxlength: 25 })
  title: string;

  @Field()
  @Prop({ required: true })
  description: string;

  @Field()
  @Prop({ default: 'started' })
  state: string;
}

@InputType()
export class CreatePostInput {
  @Field()
  title: string;

  @Field()
  description: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
