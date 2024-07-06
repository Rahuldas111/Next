'use server'

import { NextResponse } from "next/server";
import  {models}  from "@/app/models";
import { readdir, unlink, writeFile } from "fs/promises";
import path from 'path'

export async function POST(req:any) {
  try {
    const form = await req.formData();
    const cat_id = form.get('cat_id');
    const sub_cat_id = form.get('sub_cat_id');
    const title = form.get('title');
    const description = form.get('description');
    const image = form.get('image');
    const byteLength = await image.arrayBuffer();
    const bufferData = await Buffer.from(byteLength);
    const imageName = `${new Date().getTime()}${path.extname(image.name)}`;
    const pathOfImage = `./public/blog/${imageName}`;
    writeFile(pathOfImage,bufferData);

    // slug
    // Text.toLowerCase()
    // .replace(/[^\w ]+/g, "")
    // .replace(/ +/g, "-")
    console.log(title.toLowerCase().replace(/[^\w ]+/g, "").replace(/ +/g, "-"));
    
    await models.Blog.create({
      cat_id,
      sub_cat_id,
      title,
      description,
      image: imageName,
      slug: title.toLowerCase().replace(/[^\w ]+/g, "").replace(/ +/g, "-")
    })
    return NextResponse.json({message: "create blog successfully", status:201});
  } catch (error) {    
    console.log('error = ', error);
    
    return NextResponse.json({message: "Internal server error"},{status: 500});
  }
}