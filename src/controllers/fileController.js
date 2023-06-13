import fs from "fs";
import csvParser from "csv-parser";
import sendResponse from "../utils/response.js";

export default function handleFileUpload(req, res) {
  const { file } = req;

  try {
    if (!file) throw "Error: Empty request!";

    const data = [];

    fs.createReadStream(file.path)
      .pipe(csvParser())
      .on("data", (row) => {
        data.push(row);
      })
      .on("end", () => {
        fs.unlinkSync(file.path);
        sendResponse(res, 200, "Success: uploaded file!");
      });
  } catch (err) {
    return sendResponse(res, 400, err);
  }
}
