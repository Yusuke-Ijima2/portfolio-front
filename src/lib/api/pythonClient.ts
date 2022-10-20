import applyCaseMiddleware from "axios-case-converter";
import axios from "axios";

const options = {
  ignoreHeaders: true,
};

const pythonClient = applyCaseMiddleware(
  axios.create({
    baseURL: "http://localhost:8080",
  }),
  options
);

export default pythonClient;
