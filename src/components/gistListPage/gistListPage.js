import React, { useEffect, useState } from "react";
// import catAndHumanIllustration from "../../images/cat-and-human-illustration.svg";
import Gist from "./gist";

export default function GistListPage() {
  const [fetchedData, setFetchedData] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem("starredGists")) {
      localStorage.setItem("starredGists", JSON.stringify([]));
    }
    fetch("https://api.github.com/gists/public")
      .then((response) => response.json())
      .then((data) => {
        console.log("Data : ", data);
        setFetchedData(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  //   console.log(fetchedData[0].html_url);
  return (
    <section className="flex flex-col justify-center">
      {/* Gists */}
      {!fetchedData || fetchedData.length === 0 ? (
        <div>
          <div>Whoops Sorry. No Gists Broski :(</div>
        </div>
      ) : (
        <>
          {fetchedData.map((gist, index) => (
            <Gist data={gist} key={index} />
          ))}
        </>
      )}

      {/* Bottom Pagination */}
      <div></div>
    </section>
  );
}
