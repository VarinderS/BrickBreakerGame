(function() {

	var canvas = document.getElementById("gameCanvas");

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	var context = canvas.getContext("2d");

	var GAME_FRAME_RATE = 30;

	var ballRadius = 10;
	var ballX = 30;
	var ballY = 30;

	var ballSpeedX = 20;
	var ballSpeedY = 30;


	var PADDLE_WIDTH = 100;
	var PADDLE_HEIGHT = 10;
	var PADDLE_DISTANCE_FROM_EDGE = 60;

	var paddleTopLeftX = 30;
	var paddleTopLeftY = canvas.height - (PADDLE_DISTANCE_FROM_EDGE + PADDLE_HEIGHT);

	setInterval(updateAll, 1000/GAME_FRAME_RATE);

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

			ballSpeedY = ballSpeedY * -1;
		}
	}

	/**
	 * draws all elements on canvas
	 */
	function drawAll() {
		drawRect(0,0, canvas.width,canvas.height, "black");
		drawCircle(ballX, ballY, ballRadius, "white");
		drawRect(paddleTopLeftX,paddleTopLeftY, PADDLE_WIDTH,PADDLE_HEIGHT, "white");
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
})();