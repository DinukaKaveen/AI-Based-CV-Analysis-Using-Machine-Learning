import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function UserViewJob() {
  const { id } = useParams();
  const [jobpost, setJobpost] = useState([]);
  const [fileContent, setFileContent] = useState("");

  const viewJobpost = useCallback(async () => {
    const view = await axios.get(`/get_job_post/${id}`);
    setJobpost(view.data);
  }, [id]);

  const fetchFileContent = useCallback(() => {
    axios
      .get(`/filecontent/${jobpost.file_name}`)
      .then((response) => {
        setFileContent(response.data.content);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [jobpost.file_name]);

  useEffect(() => {
    viewJobpost();
    fetchFileContent();
  }, [viewJobpost, fetchFileContent]);

  return (
    <div style={{ padding: "50px", paddingTop: "100px" }}>
      <nav className="flex mb-4" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <a
              href="/"
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
              Home
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
                Job Details
              </span>
            </div>
          </li>
        </ol>
      </nav>
      <h5 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-gray-700">
        Apply Job
      </h5>
      <p>{jobpost.open_date}</p>
      <br />
      <br />

      <b>Job End Date: </b>{jobpost.end_date}
      <br />
      <br />
      <b>Job Profile: </b>{jobpost.job_title}
      <br />
      <br />
      <b>Salary: </b>{jobpost.salary}
      <br />
      <br />
      <b>Job Description: </b>
      <br />
      {fileContent}
    </div>
  );
}

export default UserViewJob;
