'use server'

import { NextRequest, NextResponse } from "next/server";
import  {models}  from "@/app/models";

export async function GET(request: NextRequest,{ params }: { params: { id: string } }) {
  try {
    const { id } = params;      
    const Subcategory = await models.SubCategory.findAll({
      where: {
        cat_id: id
      }
    });
    return NextResponse.json({Subcategory});
  } catch (error) {
    return NextResponse.json({message: "Error occured while register"},{status: 500});
  }
}