app.controller('AddNewCatIModalController', function($rootScope, $scope, $uibModalInstance, $http, TitleparentParameter, WebService, ModalService, parentParameter, ValidateUltility) {
	$scope.modalTitle = TitleparentParameter;

	$scope.modalTitle = TitleparentParameter
	var getDataDropModal = function() {

		//khai báo điều kiện để get dữ liệu lên Level
		var DataDropModal = {
			"client": fnGetClientInfo()
		}


		//gọi để hiển thị data lên drop Level
		WebService.call($http, "flag/flag03", DataDropModal, function(response) {

			var StatusModal = [];

			var data = response.data.list;
			if (data == 0) {
				console.log("Không có dữ liệu");
			} else {
				for (x in data) {

					StatusModal.push(data[x]);

					$scope.modalStatus = StatusModal;
					$scope.selectStatusModal = $scope.modalStatus[0].id + '';

				}
			}
		}, "POST");

	}
		();
	// làm drop down ngôn ngữ
	var getDataDropModalLang = function() {

		//khai báo điều kiện để get dữ liệu lên Level
		var DataDropModalLang = {
			"client": fnGetClientInfo()
		}


		//gọi để hiển thị data lên drop Level
		WebService.call($http, "lang/lang001", DataDropModalLang, function(response) {
			var LangModal = [];
			var dataLang = response.data.list;
			if (dataLang == 0) {
				console.log("Không có dữ liệu lang");
			} else {
				for (x in dataLang) {

					LangModal.push(dataLang[x]);


					$scope.languageModal = LangModal;
					$scope.selectLanguageModal = $scope.languageModal[0].langCode;
				}
			}
		}, "POST");

	}
		();

	// hàm lưu và tiếp
	$scope.fnsaveAndNext = function() {
		if (fnValidateForm() == true) {
			return;
		} else {
			var datarequestcati =
			{
				"client": {
					"langCode": $scope.selectLanguageModal

				},
				"dto": {
					"categoryId": parentParameter.categoryId,
					"code": $scope.roleCode,
					"parentId": parentParameter.parentId,
					"displayText": $scope.roleName,
					"flagValue": 0,
					"sortOrder": 1,
					"useFlag": 1,
					"companyId": fnGetClientInfo().companyId

				}
			}
		}
		console.log(datarequestcati)

		WebService.call($http, "catitem/ci05", datarequestcati, function(response) {

		}, "POST");
	};
	// hàm lưu và thêm
	$scope.fnsaveAndAdd = function() {
		fnClearMessage();
		if (fnValidateForm() == true) {
			return;
		} else {
			var datarequestcati =
			{
				"client": {
					"langCode": $scope.selectLanguageModal

				},
				"dto": {
					"categoryId": parentParameter.categoryId,
					"code": $scope.roleCode,
					"parentId": parentParameter.parentId,
					"displayText": $scope.roleName,
					"flagValue": 0,
					"sortOrder": 1,
					"useFlag": 1,
					"companyId": fnGetClientInfo().companyId

				}
			}

			console.log(datarequestcati);
			WebService.call($http, "catitem/ci05", datarequestcati, function(response) {
				if (response.data.isDone == true) {
					console.log(response)
					ModalService.alert({ "modalTitle": "OKDONE", "messageValue": "Thêm mới thành công" }, function() { }, function() { });
					$uibModalInstance.close(response)

				}
				else {
					console.log("Lưu thất bại");
				}
				fnClearData();

			}, "POST");

		}
	};
	// hàm lưu và đóng
	$scope.fnsaveAndClose = function() {
		fnClearMessage();
		if (fnValidateForm() == true) {
			return;
		} else {
			var datarequestcati =
			{
				"client": {
					"langCode": $scope.selectLanguageModal

				},
				"dto": {
					"categoryId": parentParameter.categoryId,
					"code": $scope.roleCode,
					"parentId": parentParameter.parentId,
					"displayText": $scope.roleName,
					"flagValue": 0,
					"sortOrder": 1,
					"useFlag": 1,
					"companyId": fnGetClientInfo().companyId

				}
			}
		}
		console.log(datarequestcati)


		WebService.call($http, "catitem/ci05", datarequestcati, function(response) {
			if (response.data.isDone == true) {
				console.log(response)
				ModalService.alert({ "modalTitle": "OKDONE", "messageValue": "Thêm mới thành công" }, function() { }, function() { });
				$uibModalInstance.close(response)

			}
			else {
				console.log("Lưu thất bại");
			}
			console.log(response)
			$uibModalInstance.close();
		}, "POST");

	};

	/*// function validate
	function fnValidateForm() {
		var hasError = false;

		if (ValidateUltility.checkEmpty($scope.roleCode)) {
			$scope.codeMessage = "Vui lòng nhập mã ";
			hasError = true;
		}

		if (ValidateUltility.checkEmpty($scope.roleName)) {
			$scope.nameMessage = "Vui lòng nhập tên";
			hasError = true;
		}

		return hasError;
	}*/

	//
	function fnClearMessage() {
		$scope.CodeMess = "";
		$scope.NameMess = "";
	}
	function fnClearData() {
		$scope.categoryId = "";
		$scope.roleCode = "";
		$scope.roleName = "";
		$scope.Useflag = 1 + "";
	}
	$scope.fnCloseAdd = function() {
		$uibModalInstance.close();
	}
	// function validate
	function fnValidateForm() {
		var hasError = false;

		if (ValidateUltility.checkEmpty($scope.roleCode)) {
			$scope.CodeMess = "Vui lòng nhập mã  ";
			hasError = true;
		}

		if (ValidateUltility.checkEmpty($scope.roleName)) {
			$scope.NameMess = "Vui lòng nhập tên";
			hasError = true;
		}

		return hasError;
	}


});