app.controller('ModaluselistCtrl', function($compile, GridService, $scope, $uibModalInstance, $http, WebService, ModalService, parentParameter, TitleparentParameter, ValidateUltility) {
	$scope.Headertitle = TitleparentParameter;
	var listrole = [];
	var selectlistrole = [];
	var emailId = 0;
	$scope.StatusGroupList = 1 + "";
	//list giá trị trả về của danh sách người dùng
	$scope.date = new Date();
	var x = true;
	var y = true;
	//show/hide password and confirmpassword	
	$scope.showPass = function (){
		
		if(x){
			$scope.pass="password";
			x = false;
		}else{
			$scope.pass="text";
			x = true;
		}
		
	}	
	$scope.showConfirmPass = function (){
		if(y){
			$scope.confirmpass = "password";
			y = false;
		}else{
			$scope.confirmpass="text";
			y = true;
		}
	}

	//fnc check hiển thị vai trò được phân
	function checkboxrole() {
		var request = {
			"client":  {
				"langCode": fnGetClientInfo().langCode
			},
			"dummySearch": {
				"displayText": "",
				"useFlag": $scope.StatusGroupList,
			}
		}
			//gọi request để hiển thị data lên dropdown
		WebService.call($http, "useflag/usl03", request, function(response) {
			var statusRole = new Array();
			var dataDropSTT = response.data.list;
			if (dataDropSTT == 0) {
				console.log("Không có dữ liệu");
			} else {
				for (x in dataDropSTT) {
					statusRole.push(dataDropSTT[x])
				}
			}
			$scope.StatusList = statusRole
		}, "POST");
		WebService.call($http, "role/rol03", request, function(response) {
			//console.log(response)
			var columnInfo = [
				{"keycol": "action",'colType': "checkboxrole",
				"template": "<div class='form-check pl-0' style ='margin-left: 40px !important'><input  class='form-check-input' type='checkbox' data-ng-click ='clickRL({})' ng-model='checkboxRole{}'><label class='form-check-label' style ='display: block !important'></label></div>"
				}, { "keycol": "displayText", "colType": "string" }
			]
			var table = GridService.buildBody(columnInfo, response.data.list)
			var tablehtml = $("#RoleList").html("").html(table);
			$compile(tablehtml)($scope);
			for (var row = 1; row <= response.data.list.length; row++) {
				//console.log(response.data.list);
				$scope["checkboxRole" + row] = false;
				response.data.list[row - 1]["isCheck"] = false; //tạo mảng "isCheck" vào mảng được sinh ra
			}
			listrole = response.data.list;
			if (parentParameter > 0) {
				getdidmodalgrid()
			}
		}, "POST");
	}
	checkboxrole();
	//fuction ramdom
	function makeid(length) {
		var result = '';
		var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		var charactersLength = characters.length;
		for (var i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	}
	//fnc hiển thị thông tin người dùng được lưu
	function getdidmodalgrid() {
		var requestmodal = {
			"client": {
				"langCode": fnGetClientInfo().langCode
			},
			"dummySearch": {
				"id": parentParameter,
				"UrId": parentParameter
			}
		}
		// đọc danh sách nguoi dung
		WebService.call($http, "user/user002", requestmodal, function(response) {
			// trả về nếu có dữ liệu thì đưa vào các vị trí
			if (response.data.list.length > 0) {
				//console.log(response);
				parentParameter = response.data.list[0].id;
				emailId = response.data.list[0].emailId;
				$scope.usename = response.data.list[0].userName;
				$scope.password = response.data.list[0].password;
				$scope.confirmpassword = response.data.list[0].password;
				$scope.registeemail = response.data.list[0].email;
				$scope.StatusGroupList = response.data.list[0].useFlag + "";
				for (x in listrole) {
					for (var i = 0; i < response.data.list.length; i++) {
						if (listrole[x].id == response.data.list[i].roleid) {
							//console.log(response.data.list[i].roleid)
							$scope["checkboxRole" + response.data.list[i].roleid] = true;
						}

					}
				}

			}
			else {
				$scope.usename = "";
				$scope.password = "";
				$scope.confirmpassword = "";
				$scope.registeemail = "";
				$scope.rolelist = "";
			}
		}, "POST");

	}
	//sự kiện click vào checkbox để lấy id của vai trò
	$scope.clickRL = function(idx) {
		//console.log(idx)
		//console.log(listrole[idx - 1].id)
		listrole[idx - 1]["isCheck"] = $scope["checkboxRole" + idx];
		if ($scope["checkboxRole" + idx]) {
			$scope["checkboxRole" + idx] = true;
			listrole[idx - 1]["isCheck"] = true;
		} else {
			$scope["checkboxRole" + idx] = false;
			listrole[idx - 1]["isCheck"] = false;
		}
	}
	function clicklistroleChecked() {
		selectlistrole = [];
		for (var roleIndex = 0; roleIndex < listrole.length; roleIndex++) {
			if ($scope["checkboxRole" + listrole[roleIndex].id] == true) {
				selectlistrole.push(listrole[roleIndex].id);
			}
		}
		return selectlistrole;
	}
	function save() {
		fnClearMessage();
		if (fnValidateForm() == true) {
			return;
		} else {
			if (parentParameter.id > 0) {
				if ($scope.password == $scope.confirmpassword) {
					var requestUse = {
						"userDto": {
							"id": parentParameter,
							"emailId": emailId,
							"companyId": 1,
							"email": $scope.registeemail,
							"userName": $scope.usename,
							"password": $scope.password,
							"lang": "",
							"isVerified": "",
							"verifiedTime": "",
							"verifinedBy": "",
							"useFlag": $scope.StatusGroupList,
							"token": makeid(100),
							"curentState": "",
							"lastState": $scope.date,
						},
						"roleList": clicklistroleChecked()

					}
					WebService.call($http, "user/user004", requestUse, function(response) {
						if (response.data.isDone == true) {
							// Gọi đến popup để xác nhận bạn đã lưu thành công
							ModalService.alert({ 'modalTitle': 'Success', 'messenge': 'Bạn đã cập nhật thành công' }, function() { }, function() { }, true);
							$uibModalInstance.close(response);
						} else {
							ModalService.alert({ 'modalTitle': 'Error', 'messenge': 'Lưu thất bại' }, function() { }, function() { }, true);
						}
					}, "POST");
				} else {
					ModalService.alert({ "modalTitle": "Warning", "messenge": "Mật khẩu và xác nhận mật khẩu không trùng" }, function() { console.log("yes") }, function() { console.log("no") });
				}
			} else {
				if ($scope.password == $scope.confirmpassword) {
					var requestUse = {
						"userDto": {
							"id": parentParameter,
							"emailId": emailId,
							"companyId": 1,
							"email": $scope.registeemail,
							"userName": $scope.usename,
							"password": $scope.password,
							"lang": "",
							"isVerified": "",
							"verifiedTime": "",
							"verifinedBy": "",
							"useFlag": $scope.StatusGroupList,
							"token": makeid(100),
							"curentState": "",
							"lastState": "",
						},
						"roleList": clicklistroleChecked()

					}
					WebService.call($http, "user/user004", requestUse, function(response) {
						console.log(response)
						if (response.data.isDone == true) {
							// Gọi đến popup để xác nhận bạn đã lưu thành công
							ModalService.alert({ 'modalTitle': 'Success', 'messenge': 'Bạn đã thêm mới thành công' }, function() { }, function() { }, true);
							$uibModalInstance.close(response);
						} else {
							ModalService.alert({ 'modalTitle': 'Error', 'messenge': 'Lưu thất bại' }, function() { }, function() { }, true);
						}
					}, "POST");
				} else {
					ModalService.alert({ "modalTitle": "Warning", "messenge": "Mật khẩu và xác nhận mật khẩu không trùng" }, function() { console.log("yes") }, function() { console.log("no") });
				}

			}
		}
	}

	//nút thêm mới người dùng khi id = 0 và cập nhật khi id > 0
	$scope.SaveAdd = function() {
		save();
	}


	//Nút đóng dữ liệu modal 
	$scope.close = function() {
		ModalService.alert({ "modalTitle": "Question", "messenge": "Bạn có muốn thoát không" }, function() {
			$uibModalInstance.close()
		}, function() { })

	};
	// reset lỗi nhập liệu
	function fnClearMessage() {
		$scope.UsenameMessage = "";
		$scope.PasswordMessage = "";
		$scope.ConfirmpasswordMessage = "";
		$scope.RegisteemailMessage = "";
		$scope.RolelistMessage = "";
	}
	function fnValidateForm() {
		var hasError = false;
		if (ValidateUltility.checkEmpty($scope.usename)) {
			$scope.UsenameMessage = "Vui lòng nhập tên người dùng.";
			hasError = true;
		}
		if (ValidateUltility.checkEmpty($scope.password)) {
			$scope.PasswordMessage = "Vui lòng nhập mật khẩu.";
			hasError = true;
		}else
		if (ValidateUltility.checkLength($scope.password)) {
			$scope.PasswordMessage = "Vui lòng nhập mật khẩu. từ 8 - 32 ký tự";
			hasError = true;
		}

		if (ValidateUltility.checkEmpty($scope.confirmpassword)) {
			$scope.ConfirmpasswordMessage = "Vui lòng nhập xác nhận mật khẩu.";
			hasError = true;
		}else
		if (ValidateUltility.checkLength($scope.confirmpassword)) {
			$scope.ConfirmpasswordMessage = "Vui lòng nhập xác nhận mật khẩu. từ 8 - 32 ký tự";
			hasError = true;
		}
		if (ValidateUltility.checkEmpty($scope.registeemail)) {
			$scope.RegisteemailMessage = "Vui lòng nhập email.";
			hasError = true;
		}else
		if (ValidateUltility.checkEmail($scope.registeemail)) {
			$scope.RegisteemailMessage = "Vui lòng nhập đúng kiểu email.";
			hasError = true;
		}
		if (clicklistroleChecked() == "") {
			$scope.rolelistMessage = "Vui lòng nhập vai trò người dùng.";
			hasError = true;
		}
		return hasError;
	}

	//----------------------------------------------------------//
	// gọi API thể hiện Đa ngôn ngữ trên màn hình
	loadMultiLang();
	function loadMultiLang() {
		var dataMultiLang = {
			"client":{
				"langCode": fnGetClientInfo().langCode
			},
			"dummySearch": {
				"screensId": 4
			}
		}
		WebService.call($http, "screensitem/screensitem03", dataMultiLang, function(response) {
			var db = response.data.list;
			dbMultiLang = db;
			if (parentParameter > 0) {
				$scope.Headertitle = db[18].displayText;
				$scope.buttonchange = db[18].displayText;
			} else {
				$scope.pass="password";
				$scope.confirmpass = "password";
				$scope.Headertitle = db[9].displayText;
				$scope.buttonchange = db[9].displayText;
			}

			for (x in db) {
				$scope[db[x].code] = db[x].displayText
				//console.log(db[x].code)
			}
		}, "POST");
	}

});

