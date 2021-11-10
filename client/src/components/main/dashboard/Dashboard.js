import '../../../index.css';

const Dashboard = () => {

  const downloadCSV = () => {
    fetch("http://localhost:5000/api/download/csv", {
      method: "POST",
      // headers: {'Content-Type': 'application/json'}
    }).then((response) => {
      if (response.status !== 200) {
        throw new Error(response.error);
      }
      response.text().then((data) => {

        const blob = new Blob([data]);
        const blobURL = window.URL.createObjectURL(blob);
        //create anchor tag;
        let anchorTag = document.createElement('a');
        anchorTag.download = 'testFile.csv';
        anchorTag.href = blobURL;
        anchorTag.click();
        setTimeout(() => {
          window.URL.revokeObjectURL(blobURL);
        }, 100);
      });
    });
  }
  return (<div>
    <div className="charts__right">
      <div className="charts__right__title">
        <div>
          <h1>CSV File Download: GET METHOD</h1>
          <p>Download <strong> CSV </strong> File from server using <strong> GET </strong> Method </p>
          <br />
          <button onClick={() => window.location.href = 'http://localhost:5000/api/download/csv'}>Download</button>
        </div>
      </div>
    </div>

    <div className="charts__right">
      <div className="charts__right__title">
        <div>
          <h1>CSV File Download: POST METHOD</h1>
          <p>Download <strong> CSV </strong> File from server using <strong> GET </strong> Method </p>
          <br />
          <button onClick={downloadCSV}>Download</button>
        </div>
      </div>
    </div>

  </div>)
};

export default Dashboard;