'use client'

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminBlog(){
  const [error, setError] = useState<string | null>(null);
  const [blogList, setBlogList] = useState([]);

  useEffect(()=>{
    getBlog();
  },[]);

  const getBlog = async () => {
    const resp: any = await fetch('../api/admin/blog',{
      method: "GET",
    });

    if (resp.ok) {
      let data = await resp.json();
      console.log('blog = ', data);
      
      setBlogList(data['blog'])
    } else {
      const errorData = await resp.json();
      setError(errorData.message)
    }
  }

  const handleDelete = async (id: any) => {
    const confirmed = confirm("Are you sure?")
    if (confirmed) {
      const resp = await fetch(`../api/admin/blog?id=${id}`,{
        method: 'DELETE'
      });
      if (resp.ok) {
        getBlog();
      } else {
        const errorData = await resp.json();
        setError(errorData.message)
      }
    }
  }

  return (
    <>
      <div className="pagetitle">
        <h1>Blog</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link href='/admin'>Home</Link></li>
            <li className="breadcrumb-item active">Blog</li>
          </ol>
        </nav>
      </div>
      <section className="section">
        <div className="row">
          <div className="col-lg-12">

            {error && <div className="alert alert-danger alert-dismissible fade show" role="alert">
              {error}
              <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>}
            <div className="card">
              <div className="card-body">
                <h5 className="card-title" style={{display:'flex', justifyContent:'space-between'}}>
                  <div>List</div>
                  <div>
                    <Link className="btn btn-primary" href="/admin/blog/add">Add</Link>
                  </div>
                </h5>

                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Title</th>
                      <th scope="col">Category Name</th>
                      <th scope="col">Sub Cat Name</th>
                      <th scope="col">Image</th>
                      <th scope="col">Description</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {blogList?.length > 0 && blogList?.map((element: any, index: number)=>{
                      return(
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td>{element.title}</td>
                          <td>{element.Category.name}</td>
                          <td>{element.SubCategory.name}</td>
                          <td>
                            <Image src={`${process.env.NEXT_PUBLIC_API_URL}/blog/${element.image}`} alt={element.image} width="100" height="100" />
                          </td>
                          <td>{element.description}</td>
                          <td>
                            <Link className="btn btn-primary" href={`/admin/sub-category/${element.id}`}>Edit</Link>
                            <button type="button" className="btn btn-danger" onClick={() => handleDelete(element.id)}>Delete</button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}