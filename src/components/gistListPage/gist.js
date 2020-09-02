import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { convertDate } from "../../helpers/helperFunctions";

const Gist = ({ data }) => {
  const [rawUrl, setRawUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [starred, setStarred] = useState(false);

  const handleStar = (id) => {
    setStarred(!starred);
    let localData = localStorage.getItem("starredGists");
    let starredGists = localData ? JSON.parse(localData) : [];

    if (starredGists.includes(id)) {
      console.log("Triggered");
      const index = starredGists.indexOf(id);
      if (index > -1) {
        starredGists.splice(index, 1);
      }
    } else {
      starredGists.push(id);
    }
    localStorage.setItem("starredGists", JSON.stringify(starredGists));
  };

  useEffect(() => {
    // Checks if item is favourited on mount
    let localData = localStorage.getItem("starredGists");
    let starredGists = localData ? JSON.parse(localData) : [];
    if (starredGists.includes(data.id)) {
      console.log("triggered");
      setStarred(true);
    }

    // Fetching of raw text data for this gist
    fetch(Object.values(data.files)[0].raw_url)
      .then((response) => response.text())
      .then((data) => {
        setRawUrl(data);
      })
      .catch((err) => console.log(err));

    setLoading(false);
  });

  // console.log(data);
  if (!loading) {
    return (
      <div className="relative flex flex-col text-black my-8">
        <span className="flex flex-row items-center">
          <a
            className="flex flex-row items-center cursor-pointer text-blue-700 hover:text-blue-500 mr-2"
            href={data.owner.html_url}
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={data.owner.avatar_url}
              className="rounded-full w-10 h-10 mr-2"
            />
            {data.owner.login}
          </a>
          /
          <a
            className="cursor-pointer text-blue-700 hover:text-blue-500 ml-2 font-semibold"
            href={data.html_url}
            target="_blank"
            rel="noreferrer"
          >
            {Object.keys(data.files)[0]}
          </a>
          <button
            onClick={() => handleStar(data.id)}
            type="button"
            className={`absolute focus:outline-none right-0 w-6 h-6 ${
              starred ? "text-green-500" : "text-gray-600"
            } hover:text-green-500`}
          >
            <svg
              className="fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
            >
              <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" />
            </svg>
          </button>
        </span>
        <span className="text-sm text-gray-600 space-x-2 mt-2">
          <text>Created on {convertDate(data.created_at.slice(0, 10))}</text> ,
          <text>
            last updated on {convertDate(data.updated_at.slice(0, 10))}
          </text>
        </span>
        {data.description && (
          <span className="text-sm text-gray-700">{data.description}</span>
        )}
        <div className="flex flex-row text-sm text-gray-700 space-x-4 my-4">
          <a
            href={data.html_url}
            target="_blank"
            rel="noreferrer"
            className="flex flex-row justify-center items-center"
          >
            <svg
              className="fill-current w-4 h-4 mr-1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
            >
              <path d="M149.9 349.1l-.2-.2-32.8-28.9 32.8-28.9c3.6-3.2 4-8.8.8-12.4l-.2-.2-17.4-18.6c-3.4-3.6-9-3.7-12.4-.4l-57.7 54.1c-3.7 3.5-3.7 9.4 0 12.8l57.7 54.1c1.6 1.5 3.8 2.4 6 2.4 2.4 0 4.8-1 6.4-2.8l17.4-18.6c3.3-3.5 3.1-9.1-.4-12.4zm220-251.2L286 14C277 5 264.8-.1 252.1-.1H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V131.9c0-12.7-5.1-25-14.1-34zM256 51.9l76.1 76.1H256zM336 464H48V48h160v104c0 13.3 10.7 24 24 24h104zM209.6 214c-4.7-1.4-9.5 1.3-10.9 6L144 408.1c-1.4 4.7 1.3 9.6 6 10.9l24.4 7.1c4.7 1.4 9.6-1.4 10.9-6L240 231.9c1.4-4.7-1.3-9.6-6-10.9zm24.5 76.9l.2.2 32.8 28.9-32.8 28.9c-3.6 3.2-4 8.8-.8 12.4l.2.2 17.4 18.6c3.3 3.5 8.9 3.7 12.4.4l57.7-54.1c3.7-3.5 3.7-9.4 0-12.8l-57.7-54.1c-3.5-3.3-9.1-3.2-12.4.4l-17.4 18.6c-3.3 3.5-3.1 9.1.4 12.4z" />
            </svg>
            {Object.keys(data.files).length}{" "}
            {Object.keys(data.files).length > 1 ? "files" : "file"}
          </a>
          {/* <a href={data.owner.html_url} target="_blank" rel="noreferrer"></a> */}
          <a
            className="flex flex-row justify-center items-center"
            href={data.comments_url}
            target="_blank"
            rel="noreferrer"
          >
            <svg
              className="fill-current w-4 h-4 mr-1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
            >
              <path d="M532 386.2c27.5-27.1 44-61.1 44-98.2 0-80-76.5-146.1-176.2-157.9C368.3 72.5 294.3 32 208 32 93.1 32 0 103.6 0 192c0 37 16.5 71 44 98.2-15.3 30.7-37.3 54.5-37.7 54.9-6.3 6.7-8.1 16.5-4.4 25 3.6 8.5 12 14 21.2 14 53.5 0 96.7-20.2 125.2-38.8 9.2 2.1 18.7 3.7 28.4 4.9C208.1 407.6 281.8 448 368 448c20.8 0 40.8-2.4 59.8-6.8C456.3 459.7 499.4 480 553 480c9.2 0 17.5-5.5 21.2-14 3.6-8.5 1.9-18.3-4.4-25-.4-.3-22.5-24.1-37.8-54.8zm-392.8-92.3L122.1 305c-14.1 9.1-28.5 16.3-43.1 21.4 2.7-4.7 5.4-9.7 8-14.8l15.5-31.1L77.7 256C64.2 242.6 48 220.7 48 192c0-60.7 73.3-112 160-112s160 51.3 160 112-73.3 112-160 112c-16.5 0-33-1.9-49-5.6l-19.8-4.5zM498.3 352l-24.7 24.4 15.5 31.1c2.6 5.1 5.3 10.1 8 14.8-14.6-5.1-29-12.3-43.1-21.4l-17.1-11.1-19.9 4.6c-16 3.7-32.5 5.6-49 5.6-54 0-102.2-20.1-131.3-49.7C338 339.5 416 272.9 416 192c0-3.4-.4-6.7-.7-10C479.7 196.5 528 238.8 528 288c0 28.7-16.2 50.6-29.7 64z" />
            </svg>
            {data.comments} comments
          </a>
          <a className="absolute right-0 py-1 px-2 mb-2 rounded-lg bg-teal-700 text-white text-xs text-center">
            {Object.values(data.files)[0].language}
          </a>
        </div>
        {/* <a href={data.owner.html_url} target="_blank" rel="noreferrer"></a> */}
        <a
          href={data.html_url}
          target="_blank"
          rel="noreferrer"
          className="cursor-pointer hover:border-blue-600 max-h-64 w-full overflow-auto border-2 border-gray-800 shadow rounded-md py-4 px-6 text-sm"
        >
          <pre>
            <code
              className={`language-${Object.values(data.files)[0].language}`}
            >
              {rawUrl}
            </code>
          </pre>
        </a>
      </div>
    );
  } else return <div>Loading</div>;
};

Gist.propTypes = {
  data: PropTypes.object,
};

export default Gist;
