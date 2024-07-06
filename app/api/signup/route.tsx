'use server'
import { NextResponse } from "next/server";
import  {models}  from "@/app/models";
import bcrypt from "bcrypt";

export async function POST(req:any){
  try {
    const {name,email,password} = await req.json();
    const hashedPassword = await bcrypt.hashSync(password, 10);
    const user = await models.User.findOne({
      where : {
        email: email
      }
    });
    if (user) {
      return NextResponse.json({message: "email is already exist !"},{status: 409});
    }
    await models.User.create({
      name,
      email,
      password: hashedPassword,
      role_id: 2
    })    
    return NextResponse.json({message: "user created successfully", status:201});
  } catch (error) {
    return NextResponse.json({message: "Error occured while register"},{status: 500});
  }
}