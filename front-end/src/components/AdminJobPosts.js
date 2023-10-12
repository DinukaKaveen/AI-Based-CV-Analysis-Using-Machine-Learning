import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";

function AdminJobPosts() {
  const [jobposts, setJobposts] = useState([]);

  useEffect(() => {
    loadJobposts();
  }, []);

  const loadJobposts = async () => {
    const result = await axios.get("/get_job_posts");
    setJobposts(result.data);
  };

  const deleteJobPost = async (id) => {
    await axios.delete(`/delete_job_post/${id}`);
    loadJobposts();
  };

  const columns = [
    {
      name: "Job ID",
      selector: (row) => row[0],
      sortable: true,
      width: "85px",
    },
    {
      name: "Job Title",
      selector: (row) => row[1],
      sortable: true,
      width: "200px",
    },
    {
      name: "Salary",
      selector: (row) => row[2],
      sortable: true,
      width: "100px",
    },
    {
      name: "Open Date",
      selector: (row) => row[3],
      sortable: true,
      width: "150px",
    },
    {
      name: "End Date",
      selector: (row) => row[4],
      sortable: true,
      width: "150px",
    },
    {
      name: "Job Descriptioon",
      selector: (row) => row[5],
      sortable: true,
      width: "150px",
    },
    {
      name: "Action",
      width: "215px",
      selector: (row) => (
        <div>
          <a
            href={`edit_job_post/${row[0]}`}
            type="button"
            className="text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 font-medium rounded-lg px-2.5 py-1.5 text-sm text-center mr-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400"
          >
            <i className="fa-solid fa-edit"></i>
          </a>

          <button
            type="button"
            onClick={() => deleteJobPost(row[0])}
            className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 font-medium rounded-lg px-2.5 py-1.5 text-sm text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600"
          >
            <i className="fa-solid fa-trash"></i>
          </button>
          <a
            href="/admin/UserPurchases"
            type="button"
            className="px-3 py-2 text-sm font-medium text-center mr-2 mb-2 text-white bg-blue-700 rounded-lg hover:bg-blue-800 dark:bg-blue-800 dark:hover:bg-blue-700"
          >
            Purchases
          </a>
        </div>
      ),
    },
  ];

  const [searchText, setSearchText] = useState("");

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const filteredData = jobposts.filter(
    (item) =>
      item[1].toLowerCase().includes(searchText.toLowerCase()) ||
      item[2].toLowerCase().includes(searchText.toLowerCase()) ||
      item[3].toLowerCase().includes(searchText.toLowerCase()) ||
      item[4].toLowerCase().includes(searchText.toLowerCase()) ||
      item[5].toLowerCase().includes(searchText.toLowerCase()) ||
      item[0]
        .toString()
        .toLowerCase()
        .includes(searchText.toString().toLowerCase())
  );

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
                    Job Posts
                  </span>
                </div>
              </li>
            </ol>
          </nav>
          <h2 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-gray-700">
            Job Posts
          </h2>
          <br />

          <a
            href="/admin/create_job_post"
            type="button"
            className="text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-100 mr-2 mb-2 border border-gray-200 dark:border-gray-400"
          >
            <i className="fa-solid fa-plus"></i>&nbsp;Create New Job
          </a>

          <DataTable
            columns={columns}
            data={filteredData}
            fixedHeader
            responsive
            highlightOnHover
            pagination
            subHeader
            subHeaderComponent={
              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      ></path>
                    </svg>
                  </div>
                  <input
                    value={searchText}
                    onChange={handleSearch}
                    type="search"
                    id="search"
                    className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-50 dark:border-gray-300 dark:placeholder-gray-500 dark:text-gray-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search"
                  />
                </div>
              </div>
            }
          ></DataTable>
        </div>
      </div>
    </div>
  );
}

export default AdminJobPosts;
