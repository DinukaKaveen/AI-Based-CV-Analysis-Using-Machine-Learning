import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";

function AdminJobPosts() {
  const [jobposts, setJobposts] = useState([]);
  const [jobpost, setJobpost] = useState([]);
  const [fileContent, setFileContent] = useState("");

  useEffect(() => {
    loadJobposts();
  }, []);

  const loadJobposts = async () => {
    const result = await axios.get("/get_job_posts");
    setJobposts(result.data);
  };

  const viewJobpost = async (id) => {
    const view = await axios.get(`/get_job_post/${id}`);
    setJobpost(view.data);
  };

  const fetchFileContent = (filename) => {
    axios
      .get(`/filecontent/${filename}`)
      .then((response) => {
        setFileContent(response.data.content);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleButtonClick = (id, filename) => {
    viewJobpost(id);
    fetchFileContent(filename);
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
      width: "100px",
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
      width: "150px",
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
      name: "Action",
      width: "270px",
      selector: (row) => (
        <div>
          <button
            type="button"
            onClick={() => handleButtonClick(row[0], row[5])}
            data-modal-target="defaultModal"
            data-modal-toggle="defaultModal"
            className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 font-medium rounded-lg px-2.5 py-1.5 text-sm text-center mr-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600"
          >
            <i className="fa-solid fa-eye"></i>
          </button>
          <div
            id="defaultModal"
            tabIndex="-1"
            aria-hidden="true"
            className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full"
          >
            <div className="relative w-full h-full max-w-2xl md:h-auto">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-100">
                <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-300">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-700">
                    Job ID: {jobpost.job_id}
                  </h3>
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-400 dark:hover:text-white"
                    data-modal-hide="defaultModal"
                  >
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>

                <div className="p-6 space-y-6">
                  <form>
                    <div className="grid gap-6 mb-6 md:grid-cols-2">
                      <div>
                        <label
                          htmlFor="first_name"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray"
                        >
                          Job Title
                        </label>
                        <input
                          type="text"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          value={jobpost.job_title}
                          disabled
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="last_name"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray"
                        >
                          Salary
                        </label>
                        <input
                          type="text"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          value={jobpost.salary}
                          disabled
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="age"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray"
                        >
                          Job Open Date
                        </label>
                        <input
                          type="text"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          value={jobpost.open_date}
                          disabled
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="phone"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray"
                        >
                          Job End Date
                        </label>
                        <input
                          type="tel"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          value={jobpost.end_date}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="mb-6">
                      <label
                        htmlFor="address"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray"
                      >
                        Job Description
                      </label>
                      <textarea
                        id="address"
                        rows="10"
                        value={fileContent}
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        disabled
                      ></textarea>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

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
            type="button"
            href={`/admin/applied_candidates/${row[0]}`}
            className="px-3 py-2 text-sm font-medium text-center mr-2 mb-2 text-white bg-blue-700 rounded-lg hover:bg-blue-800 dark:bg-blue-800 dark:hover:bg-blue-700"
          >
            Candidates
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
      item[0]
        .toString()
        .toLowerCase()
        .includes(searchText.toString().toLowerCase()) ||
      item[1].toLowerCase().includes(searchText.toLowerCase()) ||
      item[2].toLowerCase().includes(searchText.toLowerCase()) ||
      item[3].toLowerCase().includes(searchText.toLowerCase()) ||
      item[4].toLowerCase().includes(searchText.toLowerCase())
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
