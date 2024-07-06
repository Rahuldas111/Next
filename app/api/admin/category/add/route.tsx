'use server'

import { NextResponse } from "next/server";
import  {models}  from "@/app/models";

export async function POST(req:any) {
  try {
    const {name} = await req.json();
    await models.Category.create({
      name
    })
    return NextResponse.json({message: "create category successfully", status:201});
  } catch (error) {
    return NextResponse.json({message: "Error occured while register"},{status: 500});
  }
}