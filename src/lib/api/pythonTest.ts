import pythonClient from "./pythonClient";

export const pythonTest = () => {
  return pythonClient.get("/scraping-data");
};
