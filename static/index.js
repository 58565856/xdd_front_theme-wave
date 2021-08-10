function showQrcode() {
	var xmlhttp = window.XMLHttpRequest
		? new XMLHttpRequest()
		: new ActiveXObject("Microsoft.XMLHTTP");
	xmlhttp.onreadystatechange = function () {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			data = JSON.parse(xmlhttp.responseText);
			if (data.url && data.url.indexOf("http") != -1) {
				qrcode.src = "data:image/png;base64," + data.img;
				loginUrl = data.url;
			} else {
				showQrcode();
			}
		}
	};
	xmlhttp.open("GET", "/api/login/qrcode", true);
	xmlhttp.send();
}
showQrcode();

function login() {
	var xmlhttp = window.XMLHttpRequest
		? new XMLHttpRequest()
		: new ActiveXObject("Microsoft.XMLHTTP");
	xmlhttp.onreadystatechange = function () {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var results = xmlhttp.responseText;
			console.log(results);
			switch (results) {
				case "授权登录未确认":
					break;
				case "登录":
					qrcode.src = success;
					clearInterval(timer);
					setTimeout(() => {
						window.location.href = "/admin";
					}, 1000);
					break;
				case "成功":
					qrcode.src = success;
					clearInterval(timer);
					setTimeout(() => {
						toNotify();
					}, 1000);
					break;
				default:
					showQrcode();
					break;
			}
		}
	};
	xmlhttp.open("GET", "/api/login/query", true);
	xmlhttp.send();
}

function polling() {
	timer = setInterval(() => {
		login();
	}, 1500);
}
polling();
function changeIndex(index, _this) {
	var aTags = document.querySelectorAll(".title");
	var getCk = document.getElementById("qr");
	var getSub = document.getElementById("qr1");
	// var tips = document.getElementById("tips");
	aTags.forEach(function (e) {
		e.classList.remove("active");
	});
	_this.classList.add("active");
	if (index == 0) {
		getSub.style.display = "none";
		getCk.style.display = "flex";
		// tips.innerHTML = "请使用<big style='color:#e4393c'>京东</big>扫码";
	} else {
		getCk.style.display = "none";
		getSub.style.display = "flex";
		// tips.innerHTML = "请使用<big style='color:#e4393c'>微信</big>扫码";
	}
}
function toNotify() {
	jumpapp.style.display = "none";
	var ckQr = document.getElementById("ck_qr");
	var notify = document.getElementById("notify");
	ckQr.style.display = "none";
	notify.style.display = "block";
}
