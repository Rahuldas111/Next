"use client"

import React, { FormEvent, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "./../style.css"

const SignUp = () => {
  const router = useRouter()
  const [info, setInfo] = useState({ name:'', email:'', password:'' });
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
    if (info.name === '' || info.email === '' || info.password === '') {
      setIsLoading(false);
      setError('Please fill all details!');
      return 
    }
    try {
      const resp = await fetch("api/signup",{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(info)
      });

      if (resp.ok) {
        setIsLoading(false)
        setError(null)
        router.replace('/signin')
      } else {
        const errorData = await resp.json();
        setError(errorData.message)
        setIsLoading(false);
      }
    } catch (error) {
      
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
                      <h5 className="card-title text-center pb-0 fs-4">Create an Account</h5>
                      <p className="text-center small">Enter your personal details to create account</p>
                    </div>

                    <form className="row g-3 needs-validation" onSubmit={handleSubmit}>
                      <div className="col-12">
                        <label htmlFor="yourName" className="form-label">Your Name</label>
                        <input type="text" name="name" className="form-control" id="name" onChange={(e) => handleInput(e)} />
                        <div className="invalid-feedback">Please, enter your name!</div>
                      </div>

                      <div className="col-12">
                        <label htmlFor="yourEmail" className="form-label">Your Email</label>
                        <div className="input-group has-validation">
                          <span className="input-group-text" id="inputGroupPrepend">@</span>
                          <input type="email" name="email" className="form-control" id="email" onChange={(e) => handleInput(e)} />
                          <div className="invalid-feedback">Please enter a valid Email adddress!</div>
                        </div>
                      </div>

                      <div className="col-12">
                        <label htmlFor="yourPassword" className="form-label">Password</label>
                        <input type="password" name="password" className="form-control" id="password" onChange={(e) => handleInput(e)} />
                        <div className="invalid-feedback">Please enter your password!</div>
                      </div>

                      <div className="col-12">
                        <div className="form-check">
                          <input className="form-check-input" name="terms" type="checkbox" value="" id="acceptTerms" />
                          <label className="form-check-label" htmlFor="acceptTerms">I agree and accept the <a href="#">terms and conditions</a></label>
                          <div className="invalid-feedback">You must agree before submitting.</div>
                        </div>
                      </div>
                      <div className="col-12">
                        <button className="btn btn-primary w-100" type="submit" disabled={isLoading}>{isLoading ? 'Loading...' : 'Create Account'}</button>
                      </div>
                      <div className="col-12">
                        <p className="small mb-0">Already have an account? <Link href='/signin'>Log in</Link></p>
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

export default SignUp;