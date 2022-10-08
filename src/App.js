import React, { useEffect, useState } from "react";
import "./App.css";

const generateHexidecimal = () => {
    const digits = [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
    ];

    const color = new Array(6)
        .fill("")
        .map(() => digits[Math.floor(Math.random() * digits.length)])
        .join("");

    return `#${color}`;
};

const App = () => {
    const [color, setColor] = useState("");
    const [answers, setAnswers] = useState([]);
    const [result, setResult] = useState();

    const generateRandomColor = () => {
        const actualColor = generateHexidecimal();
        setColor(actualColor);
        setAnswers(
            // Randomizes the answer choice array
            [actualColor, generateHexidecimal(), generateHexidecimal()].sort(
                () => 0.5 - Math.random()
            )
        );
    };

    useEffect(() => {
        generateRandomColor();
        // Ensure dependency array is empty, otherwise the function will run every time the component rerenders
    }, []);

    const answerClickHandler = (answer) => {
        if (answer === color) {
            setResult(true);
            generateRandomColor();
        } else {
            // Reselect colors if incorrect
            setResult(false);
        }
    };

    return (
        <div className="App">
            <div>
                <h1>what color?</h1>
                <p>try and guess the correct color</p>
                <div
                    className="guess"
                    style={{ backgroundColor: color }}
                ></div>

                {answers.map((answer) => (
                    <button
                        onClick={() => answerClickHandler(answer)}
                        className="button"
                        key={answer}
                    >
                        {answer}
                    </button>
                ))}
                {result === true && (
                    <div className="correctAnswer">Correct Answer</div>
                )}
                {result === false && (
                    <div className="incorrectAnswer">Incorrect Answer</div>
                )}
            </div>
        </div>
    );
};

export default App;
