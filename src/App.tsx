import { useState } from "react";
import "./App.css";
import { read, utils } from "xlsx";

function App() {
  const [data, setData] = useState<any[]>([]);

  const handleFileUpload = (e: any) => {
    console.log("Tipo do evento: " + typeof e);

    const reader = new FileReader();
    reader.readAsBinaryString(e.target.files[0]);
    reader.onload = (e) => {
      if (e !== null && e.target !== null) {
        const data = e.target.result;
        const workbook = read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const parsedData = utils.sheet_to_json(sheet);
        setData(parsedData);
      }
    };
  };

  return (
    <>
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={(e) => handleFileUpload(e)}
      />

      {
        data.length > 0 && (
          console.log(data)
        )
      }

      {data.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              {Object.keys(data[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((value: any, index) => (
                  <td key={index}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default App;
