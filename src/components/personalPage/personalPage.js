import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import PersonalGists from "./personalGists";
// import superagent from "superagent";

const PersonalPage = (props) => {
  const [token, setToken] = useState(null);
  console.log(props.location.search);
  useEffect(() => {
    fetch(
      `https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token${props.location.search}&client_id=f56ba0f02a8e6a969c2c&client_secret=b22aed608c8186a342afe041d43636853a4f5340`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
      }
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        setToken(data.access_token);
      })
      .catch((err) => console.error(err));
  }, []);
  console.log(token);

  if (token) {
    return <PersonalGists token={token} />;
  } else return <div>loading</div>;
};

PersonalPage.propTypes = {
  props: PropTypes.any,
  location: PropTypes.object,
};

export default PersonalPage;

// superagent
//   .post(
//     "https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token"
//   )
//   .send({
//     client_id: "f56ba0f02a8e6a969c2c",
//     client_secret: "b22aed608c8186a342afe041d43636853a4f5340",
//     code: props.location.search.substring(6),
//   })
//   .set("X-API-Key", "foobar")
//   .set("accept", "application/json")
//   .end(function (res) {
//     console.log(res.body);
//   });
