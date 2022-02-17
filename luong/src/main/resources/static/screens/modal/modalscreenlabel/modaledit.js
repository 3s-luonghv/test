app.controller('ModalEditCtrl', function ($scope, $uibModalInstance,TitleparentParameter ,$uibModal, ModalService, $http, WebService, ValidateUltility, parentParameter) {
	var responsesave = "";
	//var idscreens = parentParameter.id;   //lay id tu vi tri parentParameter dua qua
	var idlang = "";

	var idscreens=0;
	if (parentParameter.id > 0) {
		idscreens = parentParameter.id;
		//idlang = parentParameter.langCode
	} else {
		idscreens = 0;
	}
	function loaddata() {
		$scope.selectscreens = parentParameter.screensId + "";
		$scope.codeNumber = parentParameter.code;
		$scope.selectstt = parentParameter.useFlag + "";
		$scope.selectlanguage = parentParameter.langCode;
		$scope.nameValue = parentParameter.displayText;

	}
	dropdownScreens();
	function dropdownScreens() {
		var dropdownScreens = {
			"client": {
				"langCode": fnGetClientInfo().langCode
				}
		}
		WebService.call($http, "screens/screens001", dropdownScreens, function (response) {
			//tab ngon ngu
			$scope.screensdropdown = response.data.list;
			loaddata();
			//dropdownlanguage();

		}, "POST")
	}

	//drop down lọc ngôn ngữ 
	dropdownlanguage();
	function dropdownlanguage() {

		var dropdownlanguage = {
			"client": {
				"langCode": fnGetClientInfo().langCode
				}
		}
		WebService.call($http, "lang/lang001", dropdownlanguage, function(response) {
			var languageRole = new Array();
			var dataDropLang = response.data.list;
			if (dataDropLang == 0) {
				console.log("Không có dữ liệu");
			} else {
				for (x in dataDropLang) {
					languageRole.push(dataDropLang[x])
				}
			}
			$scope.languagedropdown = languageRole;
			$scope.selectlanguage = fnGetClientInfo().langCode
		}, "POST");
	}

	//dropdown status theo langcode select language

	dropdownnstatus();
	function dropdownnstatus() {
		var dropdownStt = {
			"client": {
				"langCode": fnGetClientInfo().langCode
				}
		}
		WebService.call($http, "useflag/usl03", dropdownStt, function (response) {

			// tab trang thai su dung
			$scope.sttdropdown = response.data.list;
			//$scope.sttdropdown[1].displayText;
		}, "POST")
	}

	// click close modal
	function closemodal(responsesave) {
		$uibModalInstance.close(responsesave);
	}
	$scope.fnCloseAdd = function () {
		$uibModalInstance.close();
	}
	// button lưu và đóng
	$scope.fnSaveAdd_Close = function (response) {
		if (fnValidateForm() == true) {
			return;
		}
		else {
			savescreens();
			function savescreens() {
				var fnSaveAddCloseRquest = {
					"client": {
						"langCode": $scope.selectlanguage,
					},
					"dto": {
						
						"code": $scope.codeNumber,
						"useFlag": $scope.selectstt,
						"screensId": $scope.selectscreens,
						"displayText": $scope.nameValue
					}
				}

				WebService.call($http, "screensitem/screensitem05", fnSaveAddCloseRquest, function (response) {

					if (response.data.isDone == true) {
						function YesFunction() {
							responsesave = response.data.isDone
							closemodal(responsesave);
							return responsesave
						}
						ModalService.alert({ 'modalTitle': 'Success', 'messenge': 'Lưu nhãn thành công' }, YesFunction(), function () { });
					}
					else {
						function YesFunction() {
							return false
						}
						ModalService.alert({ 'modalTitle': 'Error', 'messenge': 'Lưu nhãn thất bại' }, YesFunction(), function () { });
					}
				}, "POST");
			}
		}
		fnClearMessage();

	};
	// button lưu và tiếp (cho phép tiến hành thêm mới hoặc thay đổi) 
	$scope.fnSaveAdd_Continue = function (response) {

		if (fnValidateForm() == true) {
			return;
		}

		else {
			savescreens();
			function savescreens() {
				var addnewRquest = {
					"client": {
						"langCode": $scope.selectlanguage,
					},
					"dto": {
						"id":idscreens,
						"code": $scope.codeNumber,
						"useFlag": $scope.selectstt,
						"screensId": $scope.selectscreens,
						"displayText": $scope.nameValue
					}
				}
				WebService.call($http, "screensitem/screensitem05", addnewRquest, function (response) {

					if (response.data.isDone == true) {
						var YesFunction=function() {

							idscreens = response.data.dto.id;
						}
						ModalService.alert({ 'modalTitle': 'Success', 'messenge': 'Lưu nhãn thành công' }, YesFunction(), function () { });
						fnClearMessage();
					}
					else {
						var YesFunction=function() {
							return false
						}
						ModalService.alert({ 'modalTitle': 'Error', 'messenge': 'Lưu nhãn thất bại' }, YesFunction(), function () { });
					}
				}, "POST");
			}
		};
	}
	//luu du~ liệu và clear form để tiến hành thêm mới.luu va them
	$scope.fnSaveAdd_Clear = function (response) {

		if (fnValidateForm() == true) {
			return;
		}
		else {
			savescreens();
			function savescreens() {
				var addnewRquest = {
					"client": {
						"langCode": $scope.selectlanguage,
					},
					"dto": {
						"id": idscreens,
						"code": $scope.codeNumber,
						"useFlag": $scope.selectstt,
						"screensId": $scope.selectscreens,
						"displayText": $scope.nameValue
					}
				}
				WebService.call($http, "screensitem/screensitem05", addnewRquest, function (response) {

					if (response.data.isDone == true) {
						idscreens = "";
						ModalService.alert({ 'modalTitle': 'Success', 'messenge': 'Lưu nhãn thành công' }, function () {
							fncleardata();
						}, function () { });
						fnClearMessage();
					}
					else {

						ModalService.alert({ 'modalTitle': 'Error', 'messenge': 'Lưu nhãn thất bại' }, function () {
							return false
						}, function () { });
					}
				}, "POST");
			}
		}
	};

	function fnClearData() {
		$scope.codeNumber = "";
		$scope.nameValue = "";
		$scope.selectlanguage = $scope.languagedropdown[0].code;
		$scope.selectstt = $scope.sttdropdown[0].code;
	}
	function fncleardata() {
		$scope.codeNumber = "";
		$scope.nameValue = "";
	}
	function fnClearMessage() {
		$scope.codeMessage = "";
		$scope.nameMessage = "";
		$scope.selectstt = "1";
		$scope.selectlanguage = "vi";
	}
	function fnValidateForm() {
		var hasError = false;

		if (ValidateUltility.checkEmpty($scope.codeNumber)) {
			$scope.codeMessage = "Vui lòng nhập dữ liệu vào Code.";
			hasError = true;
		}

		if (ValidateUltility.checkEmpty($scope.nameValue)) {
			$scope.nameMessage = "Vui lòng nhập dữ liệu vào Name.";
			hasError = true;
		}
		
		if ($scope.codeNumber.length >= 10 || $scope.codeNumber.length == 0) {
			$scope.codeMessage = "Vui lòng nhập dữ liệu từ 1 - 10 ký tự.";
			hasError = true;
		}

		return hasError;
	}
	function closemodal(responsesave) {
		$uibModalInstance.close(responsesave);
	}
	$scope.fnCloseAdd = function () {
		$uibModalInstance.close();
	}
	$scope.changeLangScreens = function () {
		if (idscreens > 0) {
			idlang = $scope.selectlanguage;
			changegetscreens()
		}
	}
	//ham da ngon ngu
buidLabelScreens();
	function buidLabelScreens() {
		var request = {
			"client": {
				"langCode": fnGetClientInfo().langCode
			},
			"dummySearch": {
				"screensId": 9
			}
		}
		WebService.call($http, 'screensitem/screensitem03', request, function(response) {
			
		if(response.data.issues.length == 0) {
			$scope.Label13 = response.data.list[12].displayText;
			$scope.Label15 = response.data.list[14].displayText;
			$scope.Label5 = response.data.list[4].displayText;
			$scope.Label4 = response.data.list[3].displayText;
			$scope.Label19 = response.data.list[18].displayText;
			$scope.Label20 = response.data.list[19].displayText;
			$scope.Label21 = response.data.list[20].displayText;
			$scope.Label22 = response.data.list[21].displayText;
			$scope.Label23 = response.data.list[22].displayText;
			$scope.Label24 = response.data.list[23].displayText;		
			
			}
			
		else { $window.alert("ERROR: " + response.data.issues[0].message);}
		}, "POST");
	}

	

});
