"use client"

import React, { useEffect, useState, FormEvent } from "react";
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import Link from "next/link";
import "./../style.css";

const SignIn = () => {
  const router = useRouter()
  const [info, setInfo] = useState({ email:'', password:'' })
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(()=>{
    if (status === 'authenticated') {
      if (session?.user?.roles === 'Admin') {
        router.replace('/admin')
      }
      if (session?.user?.roles === 'User') {
        router.replace('/')
      }
    }
  },[session, status, router])


  function handleInput(e: any) {
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true)
    setError(null)
    try {
      const resp:any = await signIn('credentials',{
        email: info.email,
        password: info.password,
        redirect: false
      })

      if (resp.error) {
        setError(resp?.error)
        setIsLoading(false);
        return;
      }
      
      if (status === 'authenticated') {
        if (session?.user?.roles === 'Admin') {
          router.replace('/admin')
        }
        if (session?.user?.roles === 'User') {
          router.replace('/')
        }
      }
    } catch (error:any) {
      setError(error?.message);
      setIsLoading(false);
    }
    
  }
  return (
    <body>
      <div className="container">
        <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">              
                <div className="card mb-3">
                  <div className="card-body">
                    {error && <div style={{ color: 'red', textAlign:'center' }}>{error}</div>}
                    <div className="pt-4 pb-2">
                      <h5 className="card-title text-center pb-0 fs-4">Login</h5>
                      <p className="text-center small">Enter your email & password to login</p>
                    </div>

                    <form onSubmit={handleSubmit} className="row g-3 needs-validation">
                      <div className="col-12">
                        <label htmlFor="yourUsername" className="form-label">Email</label>
                        <div className="input-group has-validation">
                          <span className="input-group-text" id="inputGroupPrepend">@</span>
                          <input type="email" name="email" className="form-control" id="email" onChange={(e) => handleInput(e)} />
                          <div className="invalid-feedback">Please enter your email.</div>
                        </div>
                      </div>

                      <div className="col-12">
                        <label htmlFor="yourPassword" className="form-label">Password</label>
                        <input type="password" name="password" className="form-control" id="password" onChange={(e) => handleInput(e)} />
                        <div className="invalid-feedback">Please enter your password!</div>
                      </div>

                      <div className="col-12">
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" name="remember" value="true" id="rememberMe" />
                          <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                        </div>
                      </div>
                      <div className="col-12">
                        <button className="btn btn-primary w-100" type="submit" disabled={isLoading}>{isLoading ? 'Loading...' : 'Login'}</button>
                      </div>
                      {/* <div className="col-12 text-center">
                        <p className="small mb-0">--OR--</p>
                      </div>
                      <div className="col-12">
                        <button className="btn btn-dark w-100" type="submit" disabled={isLoading}>{isLoading ? 'Loading...' : 'Login with GitHub'}</button>
                      </div> */}
                      <div className="col-12">
                        <p className="small mb-0">Dont have account? <Link href="/signup">Create an account</Link></p>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </body>
  )
}

export default SignIn;