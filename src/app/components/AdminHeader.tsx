"use client";

export function AdminHeader() {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      <form action="/user/logout" method="post">
        <button
          type="submit"
          className="bg-navy-blue text-white hover:bg-opacity-90 font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </form>
    </div>
  );
}
