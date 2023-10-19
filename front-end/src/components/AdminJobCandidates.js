import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function AdminJobCandidates() {
  const { id } = useParams();
  const [jobresumes, setJobresumes] = useState([]);
  const [resumedetails, setResumedetails] = useState([]);

  useEffect(() => {
    viewCandidates();
  }, []);

  const viewCandidates = async () => {
    const view = await axios.get(`/get_job_resume/${id}`);
    setJobresumes(view.data);
  };

  const viewResume = async (id) => {
    const view = await axios.get(`/get_resume/${id}`);
    setResumedetails(view.data);
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
              <li>
                <div className="flex items-center">
                  <svg
                    aria-hidden="true"
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
                  <a
                    href="/admin/job_posts"
                    className="ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 md:ml-2 dark:text-gray-400 dark:hover:text-gray"
                  >
                    Job Posts
                  </a>
                </div>
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
                    Applied Candidates
                  </span>
                </div>
              </li>
            </ol>
          </nav>
          <h2 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-gray-700">
            Applied Candidates
          </h2>
          <br />

          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Score (%)
                </th>
                <th scope="col" className="px-6 py-3">
                  View Resume
                </th>
              </tr>
            </thead>
            <tbody>
              {jobresumes
                .slice() // Create a copy of the array to avoid modifying the original
                .sort((a, b) => b[13] - a[13]) // Sort by the "Score (%)" column in descending order
                .map((resumes) => (
                  <tr
                    key={resumes.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="px-6 py-4">{resumes[2]}</td>
                    <td className="px-6 py-4">{resumes[3]}</td>
                    <td className="px-6 py-4">{resumes[13]}</td>
                    <td className="px-6 py-4 text-left">
                      <button
                        onClick={() => viewResume(resumes[0])}
                        data-modal-target="defaultModal"
                        data-modal-toggle="defaultModal"
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Resume Details
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
                                Resume Details
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
                                <div className="mb-6">
                                  <label
                                    htmlFor="first_name"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray"
                                  >
                                    Name
                                  </label>
                                  <input
                                    type="text"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    value={resumedetails.name}
                                    disabled
                                  />
                                </div>
                                <div className="mb-6">
                                  <label
                                    htmlFor="last_name"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray"
                                  >
                                    LinkedIn
                                  </label>
                                  <input
                                    type="text"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    value={resumedetails.linkedin}
                                    disabled
                                  />
                                </div>
                                <div className="mb-6">
                                  <label
                                    htmlFor="age"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray"
                                  >
                                    Skills
                                  </label>
                                  <textarea
                                    rows="5"
                                    value={resumedetails.skills}
                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    disabled
                                  ></textarea>
                                </div>
                                <div className="mb-6">
                                  <label
                                    htmlFor="phone"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray"
                                  >
                                    Language
                                  </label>
                                  <input
                                    type="tel"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    value={resumedetails.language}
                                    disabled
                                  />
                                </div>
                                <div className="mb-6">
                                  <label
                                    htmlFor="age"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray"
                                  >
                                    Degree
                                  </label>
                                  <textarea
                                    rows="5"
                                    value={resumedetails.degree}
                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    disabled
                                  ></textarea>
                                </div>
                                <div className="mb-6">
                                  <label
                                    htmlFor="age"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray"
                                  >
                                    Certification
                                  </label>
                                  <textarea
                                    rows="5"
                                    value={resumedetails.certification}
                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    disabled
                                  ></textarea>
                                </div>
                                <div className="mb-6">
                                  <label
                                    htmlFor="age"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray"
                                  >
                                    Worked As
                                  </label>
                                  <textarea
                                    rows="5"
                                    value={resumedetails.worked_as}
                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    disabled
                                  ></textarea>
                                </div>
                                <div className="mb-6">
                                  <label
                                    htmlFor="age"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray"
                                  >
                                    Companies Worked
                                  </label>
                                  <textarea
                                    rows="5"
                                    value={resumedetails.companies_worked}
                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    disabled
                                  ></textarea>
                                </div>
                                <div className="mb-6">
                                  <label
                                    htmlFor="last_name"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray"
                                  >
                                    Resume Score (%)
                                  </label>
                                  <input
                                    type="text"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    value={resumedetails.resume_score}
                                    disabled
                                  />
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminJobCandidates;
