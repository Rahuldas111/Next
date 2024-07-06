'use client'

import Link from "next/link"
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

interface InfoState {
  cat_id: string;
  sub_cat_id: string;
  title: string;
  description: string;
  image: string | File; // Ensure image is always typed as string
}

export default function AddBlog(){
  const router = useRouter()
  const [categoryList, setCategryList] = useState([]);
  const [subCategoryList, setSubCategryList] = useState([]);
  const [info, setInfo] = useState<InfoState>({cat_id: '', sub_cat_id: '', title: '', description: '', image: ''});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(()=>{
    getCategory();
  },[])

  const getCategory = async () => {
    const resp: any = await fetch('../../api/admin/category',{
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

  const getSubCat = async (id:string) => {
    const resp: any = await fetch(`../../api/admin/sub-cat-list-by-cat/${id}`,{
      method: "GET",
    });

    if (resp.ok) {
      let data = await resp.json();
      setSubCategryList(data['Subcategory']);
    } else {
      const errorData = await resp.json();
      setError(errorData.message)
    }
    
  }

  const handleInput = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    if (e.target.name ==='cat_id') {
      setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      if (e.target.value !=='') {
        getSubCat(e.target.value);
      } else {
        setSubCategryList([]);
      }
    } else if (e.target.name === 'image') {
      const inputElement = e.target as HTMLInputElement;
      if (inputElement.files?.[0]) {
        const file = inputElement.files[0];
        setInfo((prev) => ({ ...prev, image: file}));
      } else {
        setInfo((prev) => ({ ...prev, image: ''}));
      }
    } else {
      setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  }

  const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('cat_id', info.cat_id);
      formData.append('sub_cat_id', info.sub_cat_id);
      formData.append('title', info.title);
      formData.append('description', info.description);
      formData.append('image', info.image);

      const resp:any = await fetch('../../api/admin/blog/add',{
        method: "POST",
        body: formData
      });

      if (resp.ok) {
        setIsLoading(false)
        setError(null)
        router.replace('/admin/blog')
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
        <h1>Blog</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link href='/admin'>Home</Link></li>
            <li className="breadcrumb-item"><Link href='/admin/blog'>Blog</Link></li>
            <li className="breadcrumb-item active">Add</li>
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
                <h5 className="card-title">Blog Insert</h5>
                <form onSubmit={handleSubmit}>
                  <div className="row mb-3">
                    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Category Name</label>
                    <div className="col-sm-10">
                      <select id="inputState" className="form-select" name="cat_id" onChange={(e) => handleInput(e)}>
                        <option value='' key='0'>Choose Category</option>
                        {categoryList?.length > 0 && categoryList?.map((element: any, index: number)=>{
                          return(
                            <option key={index + 1} value={element.id}>{element.name}</option>
                          )
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">SubCategory Name</label>
                    <div className="col-sm-10">
                      <select id="inputState" className="form-select" name="sub_cat_id" onChange={(e) => handleInput(e)}>
                        <option value='' key='0'>Choose SubCategory</option>
                        {subCategoryList?.length > 0 && subCategoryList?.map((element: any, index: number)=>{
                          return(
                            <option key={index + 1} value={element.id}>{element.name}</option>
                          )
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Title</label>
                    <div className="col-sm-10">
                      <input type="text" className="form-control" id="title" name="title" onChange={(e) => handleInput(e)} />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Description</label>
                    <div className="col-sm-10">
                      <input type="text" className="form-control" id="description" name="description" onChange={(e) => handleInput(e)} />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Image</label>
                    <div className="col-sm-10">
                      <input type="file" className="form-control" id="image" name="image" onChange={(e) => handleInput(e)} />
                    </div>
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn btn-primary" disabled={isLoading}>{isLoading ? 'Loading...' : 'Insert'}</button>
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