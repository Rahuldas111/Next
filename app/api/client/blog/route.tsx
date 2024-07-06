'use server'

import { NextResponse } from "next/server";
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

// export async function DELETE(request: { nextUrl: { searchParams: { get: (arg0: string) => any; }; }; }) {
//   try {
//     const id = request.nextUrl.searchParams.get('id');
//     const findSubCategory = await models.SubCategory.findOne({
//       where: {
//         id: id
//       },
//       raw: true
//     })
//     if (findSubCategory) {
//       await models.SubCategory.destroy({
//         where: {
//           id: id
//         }
//       })
//       return NextResponse.json({message: 'SubCategory Deleted successfully!'}, {status: 200});
//     } else {
//       return NextResponse.json({message: "SubCategory Not found!"}, {status: 400});
//     }
    
//   } catch (error) {
//     return NextResponse.json({message: "Internal server error"},{status: 500});
//   }
// }