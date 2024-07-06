'use server'

import { NextRequest, NextResponse } from "next/server";
import  {models}  from "@/app/models";

export async function GET(request: NextRequest,{ params }: { params: { id: string } }) {
  try {
    const { id } = params;      
    const category = await models.Category.findOne({
      where: {
        id: id
      }
    });
    return NextResponse.json({category});
  } catch (error) {
    return NextResponse.json({message: "Error occured while register"},{status: 500});
  }
}

export async function PUT(request: NextRequest,{ params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const { name } = await request.json();
    const findCategory = await models.Category.findOne({
      where: {
        id: id
      },
      raw: true
    })
    if (findCategory) {
      await models.Category.update({
        name: name
      },{
        where: {
          id: id
        }
      })
      return NextResponse.json({message: 'Category updated successfully!'}, {status: 200});
    } else {
      return NextResponse.json({message: "Category Not found!"}, {status: 400});
    }
  } catch (error) {
    return NextResponse.json({message: "Internal server Error"},{status: 500});
  }
}