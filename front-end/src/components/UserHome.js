import React from "react";

function UserHome() {
  return (
    <div style={{ padding: "50px", paddingTop: "100px" }}>
      <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
          Job Title
        </h5>
        <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
          Salary: 1000-2000 | Open Date: 2023/10/10 | End Date: 2023/10/20
        </p>
        <div className="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
          <a
            href="#"
            className="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
          >
            <div className="text-left">
              <div className="-mt-1 font-sans text-sm font-semibold">
                View | Apply Job
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default UserHome;
