'use server'

import { NextRequest, NextResponse } from "next/server";
import  {models}  from "@/app/models";

export async function GET() {
  try {
    const blog = await models.Blog.findAll({
      include: [
        { model: models.Category },
        { model: models.SubCategory }
      ],
      order: [
        ['id', 'ASC'],
      ]
    });
    
    return NextResponse.json({blog});
  } catch (error) {
    return NextResponse.json({message: "Internal server error"},{status: 500});
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    const id = searchParams.get('id');
    // const id = request.nextUrl.searchParams.get('id');
    const findBlog = await models.Blog.findOne({
      where: {
        id: id
      },
      raw: true
    })
    if (findBlog) {
      await models.Blog.destroy({
        where: {
          id: id
        }
      })
      return NextResponse.json({message: 'Blog Deleted successfully!'}, {status: 200});
    } else {
      return NextResponse.json({message: "Blog Not found!"}, {status: 400});
    }
    
  } catch (error) {
    return NextResponse.json({message: "Internal server error"},{status: 500});
  }
}