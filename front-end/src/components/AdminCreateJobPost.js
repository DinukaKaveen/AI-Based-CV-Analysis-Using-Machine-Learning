import React, { useState } from "react";
import axios from "axios";

function AdminCreateJobPost() {
  const [Message, setMessage] = useState("");
  const [jobDetails, setJobDetails] = useState({
    job_title: "",
    salary: "",
    open_date: "",
    end_date: "",
    file: null,
  });

  const onInputChange = (e) => {
    setJobDetails({ ...jobDetails, [e.target.name]: e.target.value });
  };
  const onFileChange = (e) => {
    setJobDetails({ ...jobDetails, file: e.target.files[0] });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("job_title", jobDetails.job_title);
    formData.append("salary", jobDetails.salary);
    formData.append("open_date", jobDetails.open_date);
    formData.append("end_date", jobDetails.end_date);
    formData.append("file", jobDetails.file);

    await axios
      .post("http://localhost:5000/upload_jd", formData)
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((error) => {
        setMessage(error);
      });
  };

  return (
    <div>
      <div className="p-4 sm:ml-64">
        <div className="p-4 mt-14">
          <nav className="flex mb-4" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <a
                  href="/admin/home"
                  className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                  </svg>
                  Dashboard
                </a>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">
                    Create New Job
                  </span>
                </div>
              </li>
            </ol>
          </nav>
          <h2 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-gray-700">
            Create New Job
          </h2>
          <br />

          <div>{Message}</div>
          <br />

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="job_title"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray"
                >
                  Job Title
                </label>
                <input
                  type="text"
                  id="job_title"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name="job_title"
                  value={jobDetails.job_title}
                  onChange={(e) => onInputChange(e)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="salary"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray"
                >
                  Salary
                </label>
                <input
                  type="text"
                  id="salary"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name="salary"
                  value={jobDetails.salary}
                  onChange={(e) => onInputChange(e)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="open_date"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray"
                >
                  Open Date
                </label>
                <input
                  type="date"
                  id="open_date"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name="open_date"
                  value={jobDetails.open_date}
                  onChange={(e) => onInputChange(e)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="end_date"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray"
                >
                  End Date
                </label>
                <input
                  type="date"
                  id="end_date"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name="end_date"
                  value={jobDetails.end_date}
                  onChange={(e) => onInputChange(e)}
                  required
                />
              </div>
            </div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray">
              Job Description
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  name="file"
                  type="file"
                  accept=".docx"
                  className="hidden"
                  onChange={(e) => onFileChange(e)}
                />
              </label>
            </div>
            <br />

            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminCreateJobPost;
