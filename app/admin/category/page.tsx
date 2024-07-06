'use client'

import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminCategory(){
  const [error, setError] = useState<string | null>(null);
  const [categoryList, setCategryList] = useState([]);

  useEffect(()=>{
    getCategory();
  },[]);

  const getCategory = async () => {
    const resp: any = await fetch('../api/admin/category',{
      method: "GET",
    });

    if (resp.ok) {
      let data = await resp.json();
      setCategryList(data['category'])
    } else {
      const errorData = await resp.json();
      setError(errorData.message)
    }
  }

  const handleDelete = async (id: any) => {
    const confirmed = confirm("Are you sure?")
    if (confirmed) {
      const resp = await fetch(`../api/admin/category?id=${id}`,{
        method: 'DELETE'
      });

      if (resp.ok) {
        getCategory();
      } else {
        const errorData = await resp.json();
        setError(errorData.message)
      }
      
    }
    console.log('id = ', id);
    
  }

  return (
    <>
      <div className="pagetitle">
        <h1>Category</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link href='/admin'>Home</Link></li>
            <li className="breadcrumb-item active">Category</li>
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
                    <Link className="btn btn-primary" href="/admin/category/add">Add</Link>
                  </div>
                </h5>

                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categoryList?.length > 0 && categoryList?.map((element: any, index: number)=>{
                      return(
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td>{element.name}</td>
                          <td>
                            <Link className="btn btn-primary" href={`/admin/category/${element.id}`}>Edit</Link>
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