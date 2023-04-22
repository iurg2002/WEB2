import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import NavBar from "./NavBar";


function App() {
  const [num, setNum] = useState(0);
  const [pokList, setPokList] = useState([]);
  useEffect(() => {
    console.log("start ");
    async function fetchData() {
      const request = await getPokemonPage(num, 20);
      const json = await request.json();
      setPokList(await json.results);
      // console.log(await pokList);
      return request;
    }
    fetchData();
  }, [num]);

  let pokComponents = [];
  for (let i = 0; i < pokList.length; i++) {
    pokComponents.push(
      <Widget
        key={i}
        num={i + 1 + num}
        name={pokList[i].name}
        url={pokList[i].url}
      />
    );
  }

  function nextButtonHandler() {
    console.log(num);
    setNum(num + 20);
  }

  function previousButtonHandler() {
    console.log(num);
    if (num - 20 >= 0) setNum(num - 20);
  }

  return (
    <><NavBar/>
    <div className="container">
      <div className="row">{pokComponents}</div>
      <div className="row">
        <div className="col text-center">
          <button
            className="btn btn-dark"
            onClick={() => previousButtonHandler()}
          >
            Previous
          </button>
          <button
            className="btn btn-dark ms-4"
            onClick={() => nextButtonHandler()}
          >
            Next
          </button>
        </div>
      </div>
    </div>
    </>
  );
}

function Widget({ num, name, url }) {
  const [pok, setPok] = useState([]);
  const [image, setImage] = useState([]);
  const [types, setTypes] = useState([{ type: { name: "NOT FOUND" } }]);
  const [stats, setStats] = useState([
    { base_stat: 0, stat: { name: "NO FOUND" } },
  ]);
  const [abilities, setAbilities] = useState([
    { ability: { name: "no found" } },
  ]);
  let height = 0;
  let weight = 0;

  useEffect(() => {
    async function fetchData() {
      const request = await fetch(url);
      const json = await request.json();
      // console.log(await json)
      // console.log(await json.sprites.front_default)
      setImage(await json.sprites.front_default);
      setPok(await json);
      setTypes(await json.types);
      setStats(await json.stats);
      setAbilities(await json.abilities);
      // console.log(await json.stats)
      return request;
    }
    fetchData();
  }, [url]);

  const [show, setShow] = useState(false);

  function handleClose() {
    setShow(false);
    console.log("Handle Close");
  }

  function handleShow() {
    setShow(true);
  }

  return (
    <>
      <div className="col-12 col-md-4 col-lg-3  p-3" onClick={handleShow}>
        <div className="bg-light rounded-5">
          <div className="row">
            <div className="col pt-5 ps-5 pb-3">
              <span className="text-dark">#{num}</span>
              <p className="fw-bolder">{name}</p>
            </div>
            <div className="col text-end align-bottom mt-5 pe-4">
              <img src={image} width="100%" alt="" />
            </div>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col">
              <img src={image} width="100%" alt="" />
            </div>
            <div className="col">
              <p>
                <span className="fw-bolder">Type:</span>{" "}
                {types.map((t) => (t = t.type.name + " | "))}
              </p>
              <p>
                <span className="fw-bolder">Stats:</span> <br />{" "}
                {stats.map(
                  (t) =>
                    (t = (
                      <p key={t.stat.name}>
                        {t.stat.name}: {t.base_stat}
                      </p>
                    ))
                )}
              </p>
              <p>
                <span className="fw-bolder">Abilities:</span>{" "}
                {abilities.map((t) => (t = t.ability.name + " | "))}
              </p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

async function getPokemonPage(offset, limit) {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`
  );
  return response;
}


export default App;
