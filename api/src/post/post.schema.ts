import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectType, Field, InputType, ID } from '@nestjs/graphql';

export type PostDocument = Post & Document;

@Schema()
@ObjectType()
export class Post {
  @Field(() => ID)
  _id: number;

  @Field()
  @Prop({ required: true, maxlength: 25 })
  title: string;

  @Field()
  @Prop({ required: true })
  description: string;

  @Field()
  @Prop({ default: 'started', required: true })
  state: string;

  @Field()
  @Prop({ required: true })
  feeStructure: string;

  @Field()
  @Prop({ required: true })
  feeUnit: number;
}

@InputType()
export class CreatePostInput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  feeStructure: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
