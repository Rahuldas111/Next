'use server'

import { NextRequest, NextResponse } from "next/server";
import  {models}  from "@/app/models";

export async function GET(request: NextRequest,{ params }: { params: { id: string } }) {
  try {
    const { id } = params;      
    const Subcategory = await models.SubCategory.findOne({
      where: {
        id: id
      }
    });
    return NextResponse.json({Subcategory});
  } catch (error) {
    return NextResponse.json({message: "Error occured while register"},{status: 500});
  }
}

export async function PUT(request: NextRequest,{ params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const { cat_id, name } = await request.json();
    const findSubCategory = await models.SubCategory.findOne({
      where: {
        id: id
      },
      raw: true
    })
    if (findSubCategory) {
      await models.SubCategory.update({
        cat_id: cat_id,
        name: name
      },{
        where: {
          id: id
        }
      })
      return NextResponse.json({message: 'SubCategory updated successfully!'}, {status: 200});
    } else {
      return NextResponse.json({message: "SubCategory Not found!"}, {status: 400});
    }
  } catch (error) {
    return NextResponse.json({message: "Internal server Error"},{status: 500});
  }
}