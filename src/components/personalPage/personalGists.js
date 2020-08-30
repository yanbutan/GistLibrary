import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import IndividualGist from "./individualGist";

export default function PersonalGists({ token }) {
  const [personalGists, setPersonalGists] = useState(null);
  useEffect(() => {
    fetch("https://api.github.com/gists", {
      method: "GET",
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPersonalGists(data);
      });
  }, []);

  if (personalGists) {
    return (
      <section className="flex flex-col justify-center">
        {/* Gists */}
        {!personalGists || personalGists.length === 0 ? (
          <div>
            <div>Whoops Sorry. No Gists Broski :(</div>
          </div>
        ) : (
          <>
            {personalGists.map((gist, index) => (
              <IndividualGist data={gist} key={index} />
            ))}
          </>
        )}

        {/* Bottom Pagination */}
        <div></div>
      </section>
    );
  } else return <div>Loading</div>;
}

PersonalGists.propTypes = {
  token: PropTypes.string,
};
