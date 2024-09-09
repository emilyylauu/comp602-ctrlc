"use client";
import React, { useState, useRef, useEffect } from "react";

const PongGame = () => {
  const canvasRef = useRef(null);
  const requestRef = useRef(null);

  // Paddle and ball refs for game mechanics
  const userPaddleRef = useRef({ x: 0, y: 0, width: 18, height: 120 });
  const comPaddleRef = useRef({ x: 0, y: 0, width: 18, height: 120 });
  const ballRef = useRef({
    x: 0,
    y: 0,
    radius: 12,
    velocityX: 5, // Slightly slower initial velocity
    velocityY: 5,
    speed: 5, // Slower initial speed
  });

  const [userScore, setUserScore] = useState(0);
  const [comScore, setComScore] = useState(0);

  const initialBallSpeed = 5; // Reduced speed, but not too slow
  const maxBallSpeed = 15; // Slightly reduced max speed
  const paddleWidth = 18;
  const paddleHeight = 120;
  const netWidth = 5;
  const netColor = "WHITE";
  const [gamePaused, setGamePaused] = useState(true);
  const [onPausePage, setOnPausePage] = useState(false);

  // Initialize canvas and objects when window resizes
  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    userPaddleRef.current.x = 0;
    userPaddleRef.current.y = canvas.height / 2 - paddleHeight / 2;

    comPaddleRef.current.x = canvas.width - paddleWidth;
    comPaddleRef.current.y = canvas.height / 2 - paddleHeight / 2;

    resetBall();
  };

  // Reset the ball position
  const resetBall = () => {
    const canvas = canvasRef.current;
    ballRef.current = {
      x: canvas.width / 2,
      y: Math.random() * (canvas.height - ballRef.current.radius * 2) + ballRef.current.radius,
      velocityX: -ballRef.current.velocityX, // Invert direction on reset
      velocityY: ballRef.current.velocityY,
      speed: initialBallSpeed,
      radius: 12,
    };
  };

  // Collision detection between the ball and paddle
  const collision = (ball, paddle) => {
    return (
      ball.x + ball.radius > paddle.x &&
      ball.x - ball.radius < paddle.x + paddle.width &&
      ball.y + ball.radius > paddle.y &&
      ball.y - ball.radius < paddle.y + paddle.height
    );
  };

  // Update the ball and paddle positions
  const update = () => {
    const canvas = canvasRef.current;
    const ball = ballRef.current;
    const userPaddle = userPaddleRef.current;
    const comPaddle = comPaddleRef.current;

    // Ball movement
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    // Ball collision with top or bottom wall
    if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
      ball.velocityY = -ball.velocityY;
    }

    // Ball collision with paddles
    let paddle = ball.x < canvas.width / 2 ? userPaddle : comPaddle;
    if (collision(ball, paddle)) {
      const collidePoint = ball.y - (paddle.y + paddle.height / 2);
      const angle = (Math.PI / 4) * (collidePoint / (paddle.height / 2));
      const direction = ball.x < canvas.width / 2 ? 1 : -1;

      // Adjust ball velocity after hitting paddle
      ball.velocityX = direction * ball.speed * Math.cos(angle);
      ball.velocityY = ball.speed * Math.sin(angle);
      ball.speed = Math.min(ball.speed + 0.3, maxBallSpeed); // Increase speed gradually
    }

    // Ball out of bounds (scoring)
    if (ball.x - ball.radius < 0) {
      setComScore((prev) => prev + 1); // Update computer score
      resetBall();
    } else if (ball.x + ball.radius > canvas.width) {
      setUserScore((prev) => prev + 1); // Update user score
      resetBall();
    }

    // Move the computer paddle
    comPaddle.y += (ball.y - (comPaddle.y + comPaddle.height / 2)) * 0.05;
  };

  // Render the game elements, including updated scores
  const render = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background
    ctx.fillStyle = "BLACK";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw net
    for (let i = 0; i <= canvas.height; i += 15) {
      ctx.fillStyle = netColor;
      ctx.fillRect(canvas.width / 2 - netWidth / 2, i, netWidth, 10);
    }

    // Draw paddles
    const userPaddle = userPaddleRef.current;
    const comPaddle = comPaddleRef.current;
    ctx.fillStyle = "WHITE";
    ctx.fillRect(userPaddle.x, userPaddle.y, userPaddle.width, userPaddle.height);
    ctx.fillRect(comPaddle.x, comPaddle.y, comPaddle.width, comPaddle.height);

    // Draw ball
    const ball = ballRef.current;
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = "WHITE";
    ctx.fill();
    ctx.closePath();

    // Draw scores (force re-render of canvas to show updated scores)
    ctx.fillStyle = "GRAY";
    ctx.font = "120px Courier New";
    ctx.fillText(userScore, canvas.width / 4, canvas.height / 5); // Update user score
    ctx.fillText(comScore, (3 * canvas.width) / 4, canvas.height / 5); // Update com score
  };

  // Game loop
  const gameLoop = () => {
    update();
    render();
    requestRef.current = requestAnimationFrame(gameLoop);
  };

  // Mouse movement to control the user paddle
  const movePaddle = (event) => {
    const rect = canvasRef.current.getBoundingClientRect();
    userPaddleRef.current.y = event.clientY - rect.top - paddleHeight / 2;
  };

  // Start the game
  const startGame = () => {
    setGamePaused(false);
    setOnPausePage(false); // Hide pause page if coming from it
    resetBall();
    requestRef.current = requestAnimationFrame(gameLoop); // Start game loop
  };

  // Pause the game
  const pauseGame = () => {
    setOnPausePage(true); // Show the pause page
    cancelAnimationFrame(requestRef.current); // Pause game loop
  };

  // Continue the game from the pause screen
  const continueGame = () => {
    setOnPausePage(false); // Hide pause page
    requestRef.current = requestAnimationFrame(gameLoop); // Resume game loop
  };

  // Exit game and go to the start screen
  const exitGame = () => {
    setGamePaused(true);
    setOnPausePage(false); // Exit pause page
    setUserScore(0); // Reset score
    setComScore(0);
    cancelAnimationFrame(requestRef.current); // Stop game loop
  };

  // Set up the game and handle resizing
  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => {
      cancelAnimationFrame(requestRef.current);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", backgroundColor: "black", color: "white" }}>
      {gamePaused && !onPausePage && (
        <div id="start-page">
          <h1 style={{ marginLeft: "20px" }}>Pong Game</h1>
          <button onClick={startGame} style={{ padding: "10px 20px", fontSize: "20px", backgroundColor: "white", color: "black", cursor: "pointer", margin: "10px" }}>
            Play
          </button>
          <button onClick={() => window.location.reload()} style={{ padding: "10px 20px", fontSize: "20px", backgroundColor: "white", color: "black", cursor: "pointer", margin: "10px" }}>
            Exit Game
          </button>
        </div>
      )}

      {onPausePage && (
        <div id="pause-page" style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "row", gap: "10px", position: "absolute", top: "5%", left: "50%", transform: "translateX(-50%)" }}>
          <button onClick={continueGame} style={{ padding: "5px 10px", fontSize: "16px", backgroundColor: "white", color: "black", cursor: "pointer" }}>Continue</button>
          <button onClick={exitGame} style={{ padding: "5px 10px", fontSize: "16px", backgroundColor: "white", color: "black", cursor: "pointer" }}>Exit Game</button>
        </div>
      )}

      {!gamePaused && !onPausePage && (
        <button id="pause-button" onClick={pauseGame} style={{ position: "absolute", top: "10px", left: "50%", transform: "translateX(-50%)", padding: "5px 10px", fontSize: "14px", backgroundColor: "white", color: "black", cursor: "pointer" }}>
          Pause
        </button>
      )}

      <canvas ref={canvasRef} onMouseMove={movePaddle} style={{ display: gamePaused && !onPausePage ? "none" : "block", backgroundColor: "black" }} />
    </div>
  );
};

export default PongGame;
