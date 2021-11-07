import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [dataCats, setDataCats] = useState(null);
  const [popupInfo, setPopupInfo] = useState(false);
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetch("cats.json", {
      method: "GET"
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        let data1 = data.filter((cat) => {
          if (cat) {
            return Object.keys(cat).length !== 0;
          }
        });
        let data2 = [];
        let cats = data1.map((catJson) => JSON.stringify(catJson, data1.name));
        data2 = cats.filter(function (item, pos) {
          return cats.indexOf(item) === pos;
        });
        let data3 = data2.map((cat) => JSON.parse(cat));
        let data4 = data3.filter((cat) => cat.image !== null);
        data4.forEach(
          (cat) =>
            (cat.style = {
              width: "80%"
            })
        );
        setDataCats(data4);
      });
  }, []);

  const showInfo = (name) => {
    dataCats.forEach((cat) => {
      if (cat) {
        if (cat.name === name) {
          cat.style = { width: "100%" };
          setDescription(cat.description);
        }
      }
    });
    setPopupInfo(true);
  };

  const hideInfo = (name) => {
    dataCats.forEach(
      (cat) =>
        (cat.style = {
          width: "80%"
        })
    );
    setDataCats(dataCats);
    setPopupInfo(false);
    setDescription("");
  };

  return (
    <div className="App">
      {dataCats &&
        dataCats.map((catInfo) => {
          if (catInfo && catInfo.length !== 0)
            return (
              <div className="cat-container">
                <div className="img-block">
                  <img
                    style={catInfo.style}
                    id={catInfo.name}
                    src={catInfo.image}
                    alt="cat"
                  />
                </div>

                <div>{catInfo.name}</div>
                <div
                  className="info-button"
                  onClick={() => showInfo(catInfo.name)}
                >
                  more info...
                </div>
              </div>
            );
          else return <div></div>;
        })}
      {popupInfo && (
        <div className="background">
          <div className="description-container">
            <div className="description">{description}</div>
            <div className="hide-button" onClick={hideInfo}>
              Hide
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
