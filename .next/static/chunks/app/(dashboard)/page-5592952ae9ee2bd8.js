(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[130],{5680:function(e,t,n){Promise.resolve().then(n.bind(n,2280))},2280:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return c}});var s=n(7437),u=n(2265),a=n(6463);function c(){(0,a.useRouter)();let[e,t]=(0,u.useState)(null),[n,c]=(0,u.useState)();(0,u.useEffect)(()=>{r()},[]);let r=async()=>{let e=await fetch("/api/client/blog",{method:"GET"});e.ok?c((await e.json()).blog):t((await e.json()).message)};return(0,s.jsx)("div",{className:"row gx-4 gx-lg-5 justify-content-center",children:(0,s.jsx)("div",{className:"col-md-10 col-lg-8 col-xl-7",children:(0,s.jsx)("div",{className:"d-flex justify-content-end mb-4",children:(0,s.jsx)("a",{className:"btn btn-primary text-uppercase",href:"#!",children:"Older Posts →"})})})})}},6463:function(e,t,n){"use strict";var s=n(1169);n.o(s,"usePathname")&&n.d(t,{usePathname:function(){return s.usePathname}}),n.o(s,"useRouter")&&n.d(t,{useRouter:function(){return s.useRouter}})}},function(e){e.O(0,[971,23,744],function(){return e(e.s=5680)}),_N_E=e.O()}]);