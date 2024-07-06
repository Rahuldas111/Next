'use client'

import Link from "next/link"
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

export default function UpdateCategory({ params }: { params: { id: string } }){
  const router = useRouter()
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params.id) {
      setId(params.id);
    }
    getCategory(params.id);
  },[params])

  const getCategory = async (id:string) => {
    const resp: any = await fetch(`../../api/admin/category/${id}`,{
      method: "GET",
    });

    if (resp.ok) {
      let data = await resp.json();
      setName(data['category'].name);
    } else {
      const errorData = await resp.json();
      setError(errorData.message)
    }
    
  }

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);    
  }

  const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = {
        name,
      }
      const resp:any = await fetch(`../../api/admin/category/${id}`,{
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (resp.ok) {
        setIsLoading(false)
        setError(null)
        setName('');
        router.replace('/admin/category')
      } else {
        const errorData = await resp.json();
        setError(errorData.message)
        setIsLoading(false);
      }
      
    } catch (error:any) {
      setError(error?.message);
      setIsLoading(false);
    }
  }
  return (
    <>
      <div className="pagetitle">
        <h1>Category</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link href='/admin'>Home</Link></li>
            <li className="breadcrumb-item"><Link href='/admin/category'>Category</Link></li>
            <li className="breadcrumb-item active">Update</li>
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
                <h5 className="card-title">Category Update</h5>
                <form onSubmit={handleSubmit}>
                  <div className="row mb-3">
                    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Name</label>
                    <div className="col-sm-10">
                      <input type="text" className="form-control" id="name" name="name" value={name} onChange={(e) => handleInput(e)} />
                    </div>
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn btn-primary" disabled={isLoading}>{isLoading ? 'Loading...' : 'Update'}</button>
                    <button type="reset" className="btn btn-secondary">Reset</button>
                  </div>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}