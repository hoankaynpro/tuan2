import React from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { create } from 'zustand';

// Task 1 - React + TypeScript
type Product = { id: number; name: string; price: number; };
const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
  <div style={{border:'1px solid #ccc',borderRadius:10,padding:10,margin:10}}>
    <h3>{product.name}</h3>
    <p>Giá: {product.price}₫</p>
  </div>
);
export const Task1 = () => {
  const product: Product = { id: 1, name: 'Cà phê Arabica', price: 45000 };
  return (<div><h2>Task 1 - React + TypeScript</h2><ProductCard product={product} /></div>);
};

// Task 2 - React Hook Form
type FormData = { name: string; email: string; };
export const Task2 = () => {
  const { register, handleSubmit, formState:{errors} } = useForm<FormData>();
  const onSubmit = (data: FormData) => alert(JSON.stringify(data,null,2));
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Task 2 - React Hook Form</h2>
      <input {...register('name',{required:'Nhập tên'})} placeholder='Tên' />
      {errors.name && <p style={{color:'red'}}>{errors.name.message}</p>}
      <input {...register('email',{required:'Nhập email'})} placeholder='Email' />
      {errors.email && <p style={{color:'red'}}>{errors.email.message}</p>}
      <button type='submit'>Gửi</button>
    </form>
  );
};

// Task 3 - Tanstack Query
const fetchUsers = async () => (await axios.get('https://jsonplaceholder.typicode.com/users')).data;
export const Task3 = () => {
  const { data, isLoading, error } = useQuery({queryKey:['users'],queryFn:fetchUsers});
  if(isLoading) return <p>Đang tải...</p>;
  if(error) return <p>Lỗi tải dữ liệu!</p>;
  return (<div><h2>Task 3 - Tanstack Query</h2><ul>{data.map((u:any)=><li key={u.id}>{u.name}</li>)}</ul></div>);
};

// Task 4 - Zustand
type CounterStore = { count: number; increase: ()=>void; decrease: ()=>void; };
const useCounterStore = create<CounterStore>((set)=>({
  count:0, increase:()=>set(s=>({count:s.count+1})), decrease:()=>set(s=>({count:s.count-1})),
}));
export const Task4 = () => {
  const { count, increase, decrease } = useCounterStore();
  return (<div><h2>Task 4 - Zustand</h2><p>Giá trị: {count}</p><button onClick={increase}>Tăng</button><button onClick={decrease}>Giảm</button></div>);
};

// Tổng hợp
export default function Week2App(){
  return (<div style={{padding:20}}><Task1/><Task2/><Task3/><Task4/></div>);
}
