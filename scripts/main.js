(function() {

	var canvas = document.getElementById("gameCanvas");

	canvas.width = 800; //window.innerWidth;
	canvas.height = 600; //window.innerHeight;

	var context = canvas.getContext("2d");

	var GAME_FRAME_RATE = 30;

	var ballRadius = 5;
	var ballX = 30;
	var ballY = 30;

	var ballSpeedX = 10;
	var ballSpeedY = 10;


	var PADDLE_WIDTH = 200;
	var PADDLE_HEIGHT = 10;
	var PADDLE_DISTANCE_FROM_EDGE = 55;

	var paddleTopLeftX = 30;
	var paddleTopLeftY = canvas.height - (PADDLE_DISTANCE_FROM_EDGE + PADDLE_HEIGHT);

	var mousePositionX = 0;
	var mousePositionY = 0;

	setInterval(updateAll, 1000/GAME_FRAME_RATE);

	canvas.addEventListener("mousemove", onMouseMove);


	function onMouseMove(evt) {

		var rect = canvas.getBoundingClientRect();
		var root = document.documentElement;


		mousePositionX = evt.clientX - (rect.left + root.scrollLeft);
		mousePositionY = evt.clientY - (rect.top + root.scrollTop);

		paddleTopLeftX = mousePositionX - (PADDLE_WIDTH / 2);
		// paddleTopLeftY = mousePositionY;
	}

	/**
	 * update all function, gets called about 30 times a second
	 */
	function updateAll() {
		moveAll();
		drawAll();
	}

	/**
	 * moves ball's position
	 */
	function moveAll() {

		ballX = ballX + ballSpeedX;

		ballY = ballY + ballSpeedY;

		if (ballX < 0) { // far left

			ballSpeedX = ballSpeedX * -1;

		}

		if (ballX > canvas.width) { // far right

			ballSpeedX = ballSpeedX * -1;
		}


		if (ballY < 0) { // far top

			ballSpeedY = ballSpeedY * -1;
		}

		if (ballY > canvas.height) { // far bottom

			ballReset();
			// ballSpeedY = ballSpeedY * -1;
		}

		var paddleTopEdgeY = canvas.height - PADDLE_DISTANCE_FROM_EDGE;
		var paddleBottomEdgeY = paddleTopEdgeY + PADDLE_HEIGHT;

		var paddleLeftEdgeX = paddleTopLeftX;
		var paddleRightEdgeX = paddleLeftEdgeX + PADDLE_WIDTH;

			
		if (ballX > paddleLeftEdgeX &&
			ballX < paddleRightEdgeX &&
			ballY > paddleTopEdgeY &&
			ballY < paddleBottomEdgeY) {

			ballSpeedY = ballSpeedY * -1;

			var centerOfPaddle = PADDLE_WIDTH / 2;
			var distanceFromCenter = ballX - centerOfPaddle;

			ballSpeedX = distanceFromCenter * 0.06;
		}
	}


	/**
	 * reset ball's position
	 */
	function ballReset() {
		ballX = 30;
		ballY = 30;

		ballSpeedX = 10;
		ballSpeedY = 10;		
	}


	/**
	 * draws all elements on canvas
	 */
	function drawAll() {
		drawRect(0,0, canvas.width,canvas.height, "black");
		drawCircle(ballX, ballY, ballRadius, "white");
		drawRect(paddleTopLeftX,paddleTopLeftY, PADDLE_WIDTH,PADDLE_HEIGHT, "white");
		drawText(mousePositionX + "," + mousePositionY, mousePositionX,mousePositionY, "yellow");
	}

	/**
	 * Draws a rectangle.
	 *
	 * @param      {int}  topLeftX   The top left x
	 * @param      {int}  topLeftY   The top left y
	 * @param      {int}  width      The width
	 * @param      {int}  height     The height
	 * @param      {string}  fillColor  The fill color
	 */
	function drawRect(topLeftX,topLeftY, width,height, fillColor) {
		context.fillStyle = fillColor;
		context.fillRect(topLeftX,topLeftY, width,height);
	}

	/**
	 * Draws a circle.
	 *
	 * @param      {int}  centerX    The center x
	 * @param      {int}  centerY    The center y
	 * @param      {int}  radius     The radius
	 * @param      {string}  fillColor  The fill color
	 */
	function drawCircle(centerX,centerY, radius, fillColor) {
		context.fillStyle = fillColor;
		context.beginPath();
		context.arc(centerX,centerY, radius, 0,Math.PI*2, true);
		context.fill();		
	}

	function drawText(words, positionX,positionY, fillColor) {
		context.fillStyle = fillColor;
		context.fillText(words, positionX,positionY);
	}
})();