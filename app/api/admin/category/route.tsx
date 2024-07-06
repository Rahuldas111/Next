'use server'

import { NextRequest, NextResponse } from "next/server";
import  {models}  from "@/app/models";

export async function GET() {
  try {
    const category = await models.Category.findAll({
      order: [
        ['id', 'ASC'],
      ]
    });
    return NextResponse.json({category});
  } catch (error) {
    return NextResponse.json({message: "Internal server error"},{status: 500});
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // const id = request.nextUrl.searchParams.get('id');
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    const id = searchParams.get('id');
    const findCategory = await models.Category.findOne({
      where: {
        id: id
      },
      raw: true
    })
    if (findCategory) {
      await models.Category.destroy({
        where: {
          id: id
        }
      })
      return NextResponse.json({message: 'Category Deleted successfully!'}, {status: 200});
    } else {
      return NextResponse.json({message: "Category Not found!"}, {status: 400});
    }
    console.log('id =', id);
    
  } catch (error) {
    return NextResponse.json({message: "Internal server error"},{status: 500});
  }
}