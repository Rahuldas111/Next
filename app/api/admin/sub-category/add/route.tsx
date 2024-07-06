'use server'

import { NextResponse } from "next/server";
import  {models}  from "@/app/models";

export async function POST(req:any) {
  try {
    const {cat_id, name} = await req.json();
    
    await models.SubCategory.create({
      cat_id,
      name
    })
    return NextResponse.json({message: "create category successfully", status:201});
  } catch (error) {
    console.log('eeror = ', error);
    
    return NextResponse.json({message: "Internal server error"},{status: 500});
  }
}