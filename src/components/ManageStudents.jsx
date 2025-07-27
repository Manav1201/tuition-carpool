import React from 'react';

const ManageStudents = () => {
  const students = [
    {
      id: 1,
      name: 'Rohan Gupta',
      batch: 'B101',
      subject: 'Maths',
      time: '5 PM - 6 PM',
    },
    {
      id: 2,
      name: 'Sanya Mehra',
      batch: 'B202',
      subject: 'Science',
      time: '6 PM - 7 PM',
    },
    // Tu aur dummy data daal sakta hai
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-blue-700 mb-6">📋 Manage Students</h2>

      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded">
          <thead className="bg-blue-100 text-blue-800">
            <tr>
              <th className="px-4 py-2 text-left">Student Name</th>
              <th className="px-4 py-2 text-left">Batch</th>
              <th className="px-4 py-2 text-left">Subject</th>
              <th className="px-4 py-2 text-left">Time</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="border-t">
                <td className="px-4 py-2">{student.name}</td>
                <td className="px-4 py-2">{student.batch}</td>
                <td className="px-4 py-2">{student.subject}</td>
                <td className="px-4 py-2">{student.time}</td>
                <td className="px-4 py-2">
                  <button className="text-red-500 hover:underline">Remove</button>
                  {/* Future me Edit bhi add kar sakte ho */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageStudents;
