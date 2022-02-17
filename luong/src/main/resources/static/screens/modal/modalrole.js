app.controller('ModalRoleCtrl', function($scope, $uibModalInstance, $http, WebService, ModalService, parentParameter, TitleparentParameter, ValidateUltility) {
	$scope.TitleModal = TitleparentParameter;
	$scope.StatusGroupList = 1 + "";
	var idNew = 0;
	var idlang = "";
	//list giá trị trả về của vai trò 
	var datalistmodal ="";
	//////getdropdown modal vai trò 
	dropdown();
	function dropdown() {
		//khai báo điều kiện để get dữ liệu select
		var datadropdown = {
			"client": {
				"langCode": fnGetClientInfo().langCode
			}
		}
		//gọi để hiển thị data lên dropdown
		WebService.call($http, "useflag/usl03", datadropdown, function(response) {
			if (parentParameter.id > 0) {
				idNew = parentParameter.id;
				idlang = parentParameter.langCode
				getdidmodalgrid()
			}
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
		WebService.call($http, "lang/lang001", datadropdown, function(response) {
			if (parentParameter.id > 0) {
				idNew = parentParameter.id;
				idlang = parentParameter.langCode
				getdidmodalgrid()
			}
				var languageRole = new Array();
			var dataDropLang = response.data.list;
			if (dataDropLang == 0) {
				console.log("Không có dữ liệu");
			} else {
				for (x in dataDropLang) {
					languageRole.push(dataDropLang[x])
				}
			}
			$scope.LangList = languageRole;
			$scope.languageGroup = fnGetClientInfo().langCode
			
		}, "POST");

	}
	//function getid của danh sách bảng
	function getdidmodalgrid() {
		var requestmodal = {
			"client": {
				"langCode": idlang
			},
			"dummySearch": {
				"id": idNew
			}
		}
		//gọi để hiển thị data lên drop modal
		WebService.call($http, "role/rol03", requestmodal, function(response) {
			//console.log(datalistmodal);
			datalistmodal = response.data.list[0];
			// trả về nếu có dữ liệu thì đưa vào các vị trí
			if (response.data.list.length > 0) {
				//console.log(response)
					$scope.languageGroup = response.data.list[0].langCode + "",
					$scope.coderole = response.data.list[0].code,
					$scope.StatusGroupList = response.data.list[0].useFlag + "",
					$scope.NameRole = response.data.list[0].displayText
					idNew = response.data.list[0].id;
			}
			// trả về nếu không có dữ liệu thì để trống ( giữ lại langCode hiện tại)
			else {
				$scope.NameRole = "";
			}
		}, "POST");

	}
	// khi thay đổi ngôn ngữ thì input cũng thay đổi theo
	$scope.Langchange = function() {
		if (idNew > 0) {
			idlang = $scope.languageGroup
			getdidmodalgrid()
		} else {
			return null;
		}
	}
	var fclose = false;
	var btclear = false;
	//fn ham save modal truyen id cua STT vao de khi co id se chuyen sang update
	function saveRole() {
		fnClearMessage();
		if (fnValidateForm() == true) {
			return;
		}
		else {
			var datarequest = {
				"client": {
					"langCode": $scope.languageGroup
				}, "dto": {
					"id": idNew,
					"code": $scope.coderole,
					"description" : $scope.NameRole,
					"useFlag": $scope.StatusGroupList,
					"displayText": $scope.NameRole
				}
			}
			WebService.call($http, "role/rol05", datarequest, function(response) {
				if (response.data.isDone == true) {
					idNew = response.data.dto.id
					// Gọi đến popup để xác nhận bạn đã lưu thành công
					ModalService.alert({ 'modalTitle': 'Success', 'messenge': 'Bạn đã cập nhật thành công' }, function() { }, function() { }, true)
					if (fclose == true) {
						$uibModalInstance.close(response);
					} if (btclear == true) {
						fnClearForm();
					}
				} else {
					ModalService.alert({ 'modalTitle': 'Error', 'messenge': 'cập nhật thất bại' }, function() { }, function() { }, true);
				}
			}, "POST");
		}
	}
	//nút Lưu và thoát
	$scope.SaveAndClose = function() {
		fclose = true;
		saveRole();
	}
	//Lưu và thêm
	$scope.SaveAndAdd = function() {
		btclear = true;
		saveRole();
	}
	//Lưu và tiếp sau khi lấy được id của STT 
	$scope.SaveAndNext = function() {
		saveRole();
		$scope.NameRole = ""
	}
	

	//fn Clear Form trong modal
	function fnClearForm() {
		idNew = 0;
		$scope.languageGroup = "",
		$scope.coderole = "",
		$scope.StatusGroupList = -1 + "",
		$scope.NameRole = ""
	}

	//fn reset lỗi nhập liệu
	function fnClearMessage() {
		$scope.SttCodeRoleMessage = "";
		$scope.SttStatusMessage = "";
		$scope.SttlanguageMessage = "";
		$scope.SttNameRoleMessage = "";
	}
	//fnc check data của nút đóng
	function checkvalueData(){
		if(($scope.coderole == datalistmodal.code)
		&& ($scope.StatusGroupList ==  datalistmodal.useFlag)
		&& ($scope.languageGroup ==  datalistmodal.langCode)
		&& ($scope.NameRole == datalistmodal.displayText))
		{
			ModalService.alert({ 'modalTitle': 'Success', 'messenge': 'Bạn đã đóng' }, function() { }, function() { }, true)
			$uibModalInstance.close();
		}else if((ValidateUltility.checkEmpty($scope.coderole))
		&& (ValidateUltility.checkEmpty($scope.NameRole))){
			ModalService.alert({ 'modalTitle': 'Success', 'messenge': 'Bạn đã đóng' }, function() { }, function() { }, true)
			$uibModalInstance.close();
		}
		else{
			function out() {
					var datarequest = {
						"client": {
							"langCode": $scope.languageGroup
						}, "dto": {
							"id": idNew,
							"code": $scope.coderole,
							"companyId": "1",
							"useFlag": $scope.StatusGroupList,
							"displayText": $scope.NameRole
						}
					}
					WebService.call($http, "role/rol05", datarequest, function(response) {
						ModalService.alert({ 'modalTitle': 'Success', 'messenge': 'Bạn đã cập nhật thành công' }, function() { }, function() { }, true)
						$uibModalInstance.close(response);
					}, "POST");
				}
			ModalService.alert({ 'modalTitle': 'Question', 'messenge': 'Bạn đã cập nhật dữ liệu bạn có muốn lưu trước khi đóng không?' }, out, function() { })
		}
	}
	// đóng dữ liệu modal trang role
	$scope.close = function() {
		checkvalueData()
	}
	//fnc checkvalidate modalrole
	function fnValidateForm() {
		var hasError = false;
		if (ValidateUltility.checkEmpty($scope.coderole)) {
			$scope.SttCodeRoleMessage = "{{role33}}";
			hasError = true;
		}
		if ($scope.coderole >= 10) {
			$scope.SttCodeRoleMessage = "{{role34}}";
			hasError = true;
		}
		if (ValidateUltility.checkEmpty($scope.StatusGroupList)) {
			$scope.SttStatusMessage = "{{role33}}";
			hasError = true;
		}
		if (ValidateUltility.checkEmpty($scope.languageGroup)) {
			$scope.SttlanguageMessage = "{{role33}}";
			hasError = true;
		}

		if (ValidateUltility.checkEmpty($scope.NameRole)) {
			$scope.SttNameRoleMessage = "{{role33}}";
			hasError = true;
		}
		return hasError;
	}
	
	// gọi API thể hiện Đa ngôn ngữ trên màn hình
	loadMultiLang();
	function loadMultiLang() {
		var dataMultiLang = {
			"client":  {
				"langCode": fnGetClientInfo().langCode
			},
			"dummySearch": {
				"screensId": 3
			}
		}
		WebService.call($http, "screensitem/screensitem03", dataMultiLang, function(response) {
			var db = response.data.list;
			dbMultiLang = db;
			if (parentParameter.id > 0) {
				$scope.TitleModal = db[19].displayText;
			}else{
				$scope.TitleModal = db[14].displayText;
				
			}
			for (x in db) {
				$scope[db[x].code] = db[x].displayText
				//console.log(db[x].code)
			}
		}, "POST");
	}

});

