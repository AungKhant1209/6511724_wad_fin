"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";

export default function Home() {
  const [categoryList, setCategoryList] = useState([]);
  const [editMode, setEditMode] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  // Fetch categories directly from the relative API path
  async function fetchCategory() {
    const data = await fetch('/api/category'); // Direct API path
    const c = await data.json();
    const c2 = c.map((category) => {
      category.id = category._id; // Ensure id is set for each category
      return category;
    });
    setCategoryList(c2);
  }

  const startEdit = (category) => async () => {
    setEditMode(true);
    reset(category); // Fill the form with category data for editing
  };

  const deleteById = (id) => async () => {
    if (!confirm("Are you sure?")) return;

    await fetch(`/api/category/${id}`, { // Direct API path
      method: "DELETE",
    });
    fetchCategory(); // Refresh the category list after deletion
  };

  useEffect(() => {
    fetchCategory(); // Fetch categories when the component mounts
  }, []);

  function handleCategoryFormSubmit(data) {
    if (editMode) {
      // Use the category ID for updating
      fetch(`/api/category/${data.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then(() => {
        reset({ name: '', order: '' });
        setEditMode(false);
        fetchCategory(); // Refresh categories after submission
      });
      return;
    }

    fetch('/api/category', { // Direct API path for adding
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(() => {
      reset({ name: '', order: '' });
      fetchCategory(); // Refresh categories after adding
    });
  }

  return (
    <main>
      <div className="flex flex-row gap-4">
        <div className="flex-1 w-64">
          <form onSubmit={handleSubmit(handleCategoryFormSubmit)}>
            <div className="grid grid-cols-2 gap-4 w-fit m-4">
              <div>Category:</div>
              <div>
                <input
                  name="name"
                  type="text"
                  {...register("name", { required: true })}
                  className="border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>
              <div>Order:</div>
              <div>
                <input
                  name="order"
                  type="number"
                  {...register("order", { required: true, defaultValue: 0 })}
                  className="border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>
              <div className="col-span-2 text-right">
                {editMode ? (
                  <input
                    type="submit"
                    value="Update"
                    className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                  />
                ) : (
                  <input
                    type="submit"
                    value="Add"
                    className="bg-green-800 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
                  />
                )}
                {editMode && (
                  <button
                    onClick={() => {
                      reset({ name: '', order: '' });
                      setEditMode(false);
                    }}
                    className="ml-2 bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
        <div className="border m-4 bg-slate-300 flex-1 w-64">
          <ul>
            {categoryList.map((c) => (
              <li key={c._id}>
                <button className="border border-black p-1/2" onClick={startEdit(c)}>📝</button>{' '}
                <button className="border border-black p-1/2" onClick={deleteById(c._id)}>❌</button>{' '}
                <Link href={`/category/${c._id}`}>{c.name}</Link> [{c.order}]
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
