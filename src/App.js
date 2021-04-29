import React, {useEffect, useRef, useState} from "react";
import './App.css';

function App() {
  const [question, setQuestion] = useState('');
  

  const [counter, setCounter] = useState(0);
  const [multiplicando, setMultiplicando] = useState(2);
  const [multiplicador, setMultiplicador] = useState([ 2, 3 ,4 ,5 ,6 ,7 ,8 ,9]);

  const [timer, setTimer] = useState(3);
  const [isRunning, setIsRunning] = useState(false);

  const [ansawerList, setAnsawerList] = useState([
    {
      "id" : 1,
      "res" : "?"
    },
    {
      "id" : 2,
      "res" : "?"
    },
    {
      "id" : 3,
      "res" : "?"
    },
  ]);

  const [next, setNext] = useState(false);

 

  const submitByClick = (e, value) => {
    e.preventDefault();
    console.log();
    let correct = multiplicando * multiplicador[counter];
    
    if(counter < multiplicador.length ){
      
      if(correct === value.res){
        console.log(" -- CORRECTO --");
        question_panel.current.style.backgroundColor = "#59A96A";
        setCounter(counter => counter + 1);
        

        setTimeout(() => {
          question_panel.current.style.backgroundColor = "#222222";
          setNext(true);
        }, 1000);
      }else{
        question_panel.current.style.backgroundColor = "#B23A48";
        setCounter(counter => counter + 1);
        

        setTimeout(() => {
          question_panel.current.style.backgroundColor = "#222222";
          setNext(true);
        }, 1000);
      }

      
    }else{
      setQuestion("COMPLETADO");
    }


  }

  function start(){
    setIsRunning(true);
    multiplicador.sort(() => Math.random() - 0.5);
    console.log(multiplicador);
  }

  function reset(){
    setCounter(0);
    setQuestion('');
    //setAnsawer('');
    setAnsawerList([
      {
        "id" : 1,
        "res" : "?"
      },
      {
        "id" : 2,
        "res" : "?"
      },
      {
        "id" : 3,
        "res" : "?"
      },
    ]);

    setIsRunning(false);
    setNext(false);
    setTimer(timer => timer = 3);
    console.log("JUEGO RESETEADO, Count => ", counter);
  }

  function makeAnsawer(){
    let random = Math.floor(Math.random() * 1 * (4 - 2)) + 2;

    let correct = multiplicando * multiplicador[counter];
    let incorrect = multiplicando * multiplicador[counter] + 2;
    let incorrect_2 = multiplicando * multiplicador[counter] - 2;

    if(incorrect === 20){incorrect = incorrect - 1}

    let randomAnsawers = [
      {
        id : 1,
        res : correct
      },
      {
        id : 2,
        res : incorrect
      },
      {
        id : 3,
        res : incorrect_2
      },
    ];

    randomAnsawers.sort(() => Math.random() - 0.5);
    setAnsawerList(randomAnsawers);
  }
  
  useEffect(() => {
    console.log("Primer Render");
    if(isRunning){
        const id = setInterval(() => {
          setTimer(timer => {
            if(timer > 0){
              return  timer - 1;
            }else{
              clearInterval(id);

              let question = multiplicando + " X " + multiplicador[counter] + " = ";
              //setCounter(counter => counter + 1);
              setQuestion(question);
              makeAnsawer();
              console.log(counter);
              return timer;
            }
          });
        }, 1000);

      return() => clearInterval(id);
      
    }else{
    }
  }, [isRunning])

  useEffect(() => {
    if(counter < multiplicador.length ){
      if(next){
        console.log("siguiente pregunta..");
        
        let q = multiplicando +" X "+ multiplicador[counter] + " = ";
        console.log(q);
        setQuestion(q);
        makeAnsawer();
        setNext(false);
      }
    }else{
      setQuestion("COMPLETADO");
    }
    
  }, [next])

  
  const question_panel = useRef(null);

  return (
    <div className="App">
      <header className="App-header">
        <h1>TABLAS DE MULTIPLICAR</h1>
      </header>

      <section className="Question-panel" ref={question_panel}>
        <span className="Question">
          {question ? question : timer}
        </span>
      </section>

      <section className="Ansawer-panel">
        {ansawerList.map(x => {
          return(
            <div className="Ansawer" key={x.id} onClick={e => submitByClick(e, x)} value={x.res}>
              {x.res}
            </div>
          )
        })}
      </section>

      
      <button className="btn btn-primary Button-start" onClick={start}>START</button>
      <button className="btn btn-danger Button-start" onClick={() => reset()}>RESET</button>

      <div className="App-footer text-muted">
        <span>PAGC</span>
      </div>
    </div>
  );
}

export default App;
