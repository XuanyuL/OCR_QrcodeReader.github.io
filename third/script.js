let capture;
let captureGraphic;
let socket;
let socketCondition;
let sendButton;
let QRString;
let socketIsConnected = false;
const appWidth = 400;
const appHeight = 640;
const windowWidth = 400;
const windowHeight = 640;
const debuggingArea = 400;


function setup() {
    console.log("appWidth : " + appWidth);
    console.log("appHeight : " + appHeight);

    pixelDensity(1);
	createCanvas(windowWidth, windowHeight);
    console.log("windowWidth : " + windowWidth);
    console.log("windowHeight : " + windowHeight);
    console.log("window.innerWidth : " + window.innerWidth);
    console.log("window.innerHeight : " + window.innerHeight);
    // background(0);

	captureGraphic = createGraphics(appWidth, appHeight);
    console.log("captureGraphic.width : " + captureGraphic.width);
    console.log("captureGraphic.height : " + captureGraphic.height);

    var constraints = {
        audio: false,
        video: {
            facingMode: "environment",
            width: appWidth,
            height: appHeight
        }
    };
	capture = createCapture(constraints);
    capture.size(appWidth, appHeight);
	capture.hide();

    console.log("capture.width : " + capture.width);
    console.log("capture.height : " + capture.height);

    connectButton = createButton("connect");
    connectButton.position(300, debuggingArea + 20);
    connectButton.style('width', '75px');  // Set width of button
    connectButton.style('height', '35px');  // Set height of button
    connectButton.mousePressed(connectSocket);

    sendQRButton = createButton("sendQR");
    sendQRButton.position(300, debuggingArea + 190);
    sendQRButton.style('width', '75px');  // Set width of button
    sendQRButton.style('height', '35px');  // Set height of button
    sendQRButton.mousePressed(sendQRString);


    server = createInput("wss://remosharp-public-server14.glitch.me/");
    server.position(135, debuggingArea + 20);
    server.style("width", "150px");

    oneForthURL = createA("../third/third.html", "Server 14");
    oneForthURL.position(30, debuggingArea - 10);
    oneForthURL.style("color", "white");

    oneFifthURL = createA("../first/first.html", "Server 15");
    oneFifthURL.position(160, debuggingArea - 10);
    oneFifthURL.style("color", "white");

    oneSixthURL = createA("../second/second.html", "Server 16");
    oneSixthURL.position(290, debuggingArea - 10);
    oneSixthURL.style("color", "white");
}

function draw() {
    clear();
    background(64, 70, 47);
	image(capture, 0, 0, capture.width, capture.height);

    fill(64, 70, 47);
    rect(0,debuggingArea - 20, windowWidth, windowHeight);

    fill(0);
    textSize(20);
    text("Server 14", 10, 35);
	let code = getCodeFromCapture(capture, captureGraphic);
	if (code) {
		// text(code.data, 10, windowHeight - 10);
        QRString = code.data;
		// text("QRCode : " + QRString.data, 10, debuggingArea + 10);
        // if(socketCondition == 1){
        //     socket.send(code.data);
        // }
	}
    fill(255);
	text("QRCode : ", 10, debuggingArea + 95);
    textSize(40);
    textAlign(CENTER);
    text(QRString, windowWidth / 2, debuggingArea + 155);
    textAlign(LEFT);
    textSize(20);
    text("Server URL : ", 10, debuggingArea + 35);

    checkSocket();
    text(socketCondition, 10, debuggingArea + 65);


}

function connectSocket(){
    socket = new WebSocket(server.value());
    socketIsConnected = true;
}

function checkSocket(){
    socketCondition = "no connection";
    if(socketIsConnected){
        if(socket.readyState == 0){
            socketCondition = "connecting";
        }else if(socket.readyState == 1){
            socketCondition = "connected";
        }else if(socket.readyState == 3){
            socketCondition = "no connection";
        }
    }
}

function sendSocket(){
    socket.send(sendText.value());
}

function sendQRString(){
    socket.send(QRString);
}

// function mouseClicked(){
//     socket.send("Mouse Clicked!");
//     // return false;
// }

function getCodeFromCapture(cap, g) {
	g.image(cap, 0, 0, cap.width, cap.height);
	const imgData = g.elt
		.getContext('2d')
		.getImageData(0, 0, cap.width, cap.height).data;

	return jsQR(imgData, cap.width, cap.height);
}
