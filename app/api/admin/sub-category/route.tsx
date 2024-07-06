'use server'

import { NextRequest, NextResponse } from "next/server";
import  {models}  from "@/app/models";

export async function GET() {
  try {
    const subcategory = await models.SubCategory.findAll({
      include: [
        { model: models.Category }
      ],
      order: [
        ['id', 'ASC'],
      ]
    });
    return NextResponse.json({subcategory});
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
    const findSubCategory = await models.SubCategory.findOne({
      where: {
        id: id
      },
      raw: true
    })
    if (findSubCategory) {
      await models.SubCategory.destroy({
        where: {
          id: id
        }
      })
      return NextResponse.json({message: 'SubCategory Deleted successfully!'}, {status: 200});
    } else {
      return NextResponse.json({message: "SubCategory Not found!"}, {status: 400});
    }
    
  } catch (error) {
    return NextResponse.json({message: "Internal server error"},{status: 500});
  }
}