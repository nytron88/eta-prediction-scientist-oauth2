import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { PageLayout } from "../components/page-layout";
import Chart from "react-google-charts";
import { getServerResources } from "../services/server-data";

export const ScientistPage = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [accessToken, setAccessToken] = useState("");
  
  const [message, setMessage] = useState("")

  const [binsDisplay, setBinsDisplay] = useState([
    ["Category", "Value"],
    ["Sum Bin 1", 0],
    ["Sum Bin 2", 0],
    ["Sum Bin 3", 0],
    ["Sum Bin 4", 0],
    ["Sum Bin 5", 0],
    ["Sum Bin 6", 0],
    ["Sum Bin 7", 0],
    ["Sum Bin 8", 0],
    ["Sum Bin 9", 0],
    ["Sum Bin 10", 0],
  ])

  useEffect(() => {
    const getAccessToken = async () => {
      const token = await getAccessTokenSilently();
      setAccessToken(token);
    }

    getAccessToken();

  }, [getAccessTokenSilently])

  useEffect(() => {
    const interval = setInterval(updateTable, 1000);
    return () => clearInterval(interval);
  });

  
  const updateTable = async () => {
    const {data, errorData} = await getServerResources(accessToken);
    
    const dataServerOne = data[0];
    const errorServerOne = errorData[0];
    const dataServerTwo = data[1];
    const errorServerTwo = errorData[1];

    if (dataServerOne.message === "You don't have access to this resource") {
      setMessage("You don't have access to this resource!")
    } else if (errorServerOne) {
      setMessage(errorServerOne)
    } else if (errorServerTwo) {
      setMessage(errorServerTwo)
    }
    else {
      setMessage("Scientist Page")
      const finalSum = [];
      // const messageLength = Math.min(dataServerOne.message.length, dataServerTwo.message.length);
      
      if (dataServerOne.message.length > dataServerTwo.message.length) {
        for (let i = 0; i < dataServerOne.message.length; i++) {
          finalSum.push(dataServerOne.message[i] + dataServerTwo.message[0]);
        }
        const newBinsDisplay = [["Category", "Value"]];
        for (let i = 0; i < finalSum.length; i++) {
        newBinsDisplay.push([`Sum Bin ${i + 1}`, finalSum[i]]);
        }
        setBinsDisplay(newBinsDisplay);
      } else if (dataServerTwo.message.length > dataServerOne.message.length){
        for (let i = 0; i < dataServerTwo.message.length; i++) {
          finalSum.push(dataServerTwo.message[i] + dataServerOne.message[0]);
        }
        const newBinsDisplay = [["Category", "Value"]];
        for (let i = 0; i < finalSum.length; i++) {
        newBinsDisplay.push([`Sum Bin ${i + 1}`, finalSum[i]]);
        }
        setBinsDisplay(newBinsDisplay);
      }
    }
  }


  const optionsLoad = () => {
    const options = {
      title: "Final Sum",
      legend: { position: "none" },
      colors: ["#e7711c"],
      vAxis: {
        title: "Sum Value",
        minValue: 0, 
      },
      chartArea: {
        width: '80%', 
        height: '70%', 
      },
      hAxis: {
        title: "Bins",
      },
      histogram: {
        bucketSize: 1,
      },
      bar: {
        gap: 2, 
      },
    };
    return options;
  };


  return (
    <PageLayout>
      <div className="content-layout">
        <h1 id="page-title" className="content__title">
          {message}
        </h1>
        <div className="content__body">
          <p id="page-description">
            <span>
              This page retrieves <strong>the sum</strong> from an
              external API.
            </span>
            <span>
              <strong>
                Only authenticated users with the{" "}
                <code>get:eta-data</code> permission should access this
                page.
              </strong>
            </span>
          </p>
          <div>
            <Chart
            className="sum-container"
              chartType="ColumnChart" 
              height="400px"
              data={binsDisplay}
              options={optionsLoad()}
            />
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
