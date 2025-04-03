"use client"
import React from "react";
import { useState } from "react";
import InputField from "@/app/components/InputField";
import { supabase } from "@/app/lib/superbase";

export default function CreatStudent() {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [gender, setGender] = useState("");
    const [usn, setUsn] = useState("");

    return (
        <div className="min-h-screen bg-gray-200 flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold text-blue-500">Create Student</h1>

            <InputField
                type="text"
                value={usn}
                placeholder="Student USN"
                onChange={(e) => setUsn(e.target.value)}
            />
            <InputField
                type="text"
                value={name}
                placeholder="Student Name"
                onChange={(e) => setName(e.target.value)}
            />
            <InputField
                type="number"
                value={age}
                placeholder="Student Age"
                onChange={(e) => setAge(e.target.value)}
            />
            <InputField
                type="email"
                value={email}
                placeholder="Student email"
                onChange={(e) => setEmail(e.target.value)}
            />
            <InputField
                type="text"
                value={phone}
                placeholder="Student Phone No."
                onChange={(e) => setPhone(e.target.value)}
            />
            <InputField
                type="text"
                value={address}
                placeholder="Student Address"
                onChange={(e) => setAddress(e.target.value)}
            />
            <InputField
                type="text"
                value={gender}
                placeholder="Student Gender"
                onChange={(e) => setGender(e.target.value)}
            />

            <button
                onClick={async (event) => {
                    if (usn === "" || name === "" || email === "" || phone === "" || address === "" || gender === "") {
                        alert("All fields are mandatory");
                        return;
                    }
                    try {
                        const { data, error } = await supabase.from('Student').insert([
                            {
                                name: name,
                                usn: usn,
                                phone: phone,
                                email: email,
                                address: address,
                                gender
                            }
                        ]).select();
                        if (error) {
                            throw error;
                        }
                        alert(`Student Profile Created \n ${JSON.stringify(data)}`);
                    } catch (e) {
                        alert(`Error:${JSON.stringify(e)}`)
                    }
                }}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
                Submit
            </button>
        </div>
    );
}
