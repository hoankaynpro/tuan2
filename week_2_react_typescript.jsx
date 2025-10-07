// ============================
// 📘 Week 2 Report (06/10 - 11/10)
// Topics: React + TypeScript, React Hook Form, Tanstack Query, Zustand
// ============================

// ============================
// 🧩 Task 1: React + TypeScript
// ============================

import React from 'react';

type Product = {
  id: number;
  name: string;
  price: number;
};

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div className="p-4 border rounded-xl shadow-md hover:shadow-lg">
      <h2 className="text-xl font-bold">{product.name}</h2>
      <p className="text-gray-500">Giá: {product.price}₫</p>
    </div>
  );
};

export const Task1 = () => {
  const product: Product = { id: 1, name: 'Cà phê Arabica', price: 45000 };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-3">Task 1 - React + TypeScript</h1>
      <ProductCard product={product} />
    </div>
  );
};

// ============================
// 🧩 Task 2: React Hook Form
// ============================

import { useForm } from 'react-hook-form';

type FormData = {
  name: string;
  email: string;
};

export const Task2 = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    alert(`Họ tên: ${data.name}\nEmail: ${data.email}`);
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-3">Task 2 - React Hook Form</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input {...register('name', { required: 'Vui lòng nhập họ tên' })} placeholder="Họ tên" className="border p-2 w-full rounded" />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

        <input {...register('email', { required: 'Vui lòng nhập email' })} placeholder="Email" className="border p-2 w-full rounded" />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">Gửi</button>
      </form>
    </div>
  );
};

// ============================
// 🧩 Task 3: Tanstack Query
// ============================

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchUsers = async () => {
  const res = await axios.get('https://jsonplaceholder.typicode.com/users');
  return res.data;
};

export const Task3 = () => {
  const { data, isLoading, error } = useQuery({ queryKey: ['users'], queryFn: fetchUsers });

  if (isLoading) return <p>Đang tải...</p>;
  if (error) return <p>Lỗi tải dữ liệu!</p>;

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-3">Task 3 - Tanstack Query</h1>
      <ul>
        {data.map((user: any) => (
          <li key={user.id} className="border-b py-2">{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

// ============================
// 🧩 Task 4: Zustand
// ============================

import { create } from 'zustand';

type CounterStore = {
  count: number;
  increase: () => void;
  decrease: () => void;
};

const useCounterStore = create<CounterStore>((set) => ({
  count: 0,
  increase: () => set((state) => ({ count: state.count + 1 })),
  decrease: () => set((state) => ({ count: state.count - 1 })),
}));

export const Task4 = () => {
  const { count, increase, decrease } = useCounterStore();

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-3">Task 4 - Zustand</h1>
      <p className="text-lg mb-3">Giá trị: {count}</p>
      <div className="space-x-3">
        <button className="bg-green-500 text-white px-3 py-1 rounded" onClick={increase}>Tăng</button>
        <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={decrease}>Giảm</button>
      </div>
    </div>
  );
};

// ============================
// ✅ App tổng hợp
// ============================

export default function Week2App() {
  return (
    <div className="p-5 space-y-8">
      <Task1 />
      <Task2 />
      <Task3 />
      <Task4 />
    </div>
  );
}
