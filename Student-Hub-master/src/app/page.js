"use client";

import { useEffect, useState } from "react";
import { supabase } from "./lib/superbase";
import { useRouter } from "next/navigation";

export default function Home() {
  const [students, setStudents] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    loadStudentList();
  }, []);

  async function loadStudentList() {
    try {
      const { data, error } = await supabase.from("Student").select();
      if (error) throw error;

      setStudents(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="bg-blue-200 flex flex-col w-[500px] items-center p-4 rounded-lg shadow-lg m-4">
        <strong className="text-lg text-gray-800 mb-3">Student Details</strong>

        {loading ? (
          <p className="text-gray-600">Loading student details...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : students.length === 0 ? (
          <p className="text-gray-600">No students found.</p>
        ) : (
          <div className="flex flex-col gap-3 w-full items-center">
            {students.map((stud, index) => (
              <div
                key={index}
                className="bg-gray-100 shadow-md h-auto w-[90%] rounded-lg p-3 border border-gray-300 text-center"
              >
                <h1 className="text-lg font-semibold text-gray-700">Name: {stud.name}</h1>
                <h1 className="text-md text-gray-600">USN: {stud.usn}</h1>
                <h1 className="text-md text-gray-600">Contact: {stud.phone}</h1>
                <h1 className="text-md text-gray-600">Gender: {stud.gender}</h1>
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
        onClick={() => router.push("/students/create")}
      >
        Click to Enter Student Details
      </button>
    </div>
  );
}
