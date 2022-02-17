app.controller('ProfileGeneralController', function($rootScope, $scope, WebService, $http, $timeout, ModalService, ValidateUltility) {
	$timeout(function() {
		fnInit()

	});

	var filename = ""
	function getDataDropDownAll() {
		//khai báo điều kiện để get dữ liệu lên Level
		var dataDropDownAll = {
			"client": fnGetClientInfo()
		}
		$scope.myForm = {
			url: "avatar",
			files: []
		}
		//gọi để hiển thị data lên drop Level
		WebService.call($http, "catitem/ci03", dataDropDownAll, function(response) {

			var statuslist = [];
			var marry = [];
			var jobapp = [];
			var jobposi = [];
			var data = response.data.list;
			if (data == 0) {
				console.log("Không có dữ liệu");
			} else {
				for (x in data) {
					if (data[x].categoryId == 6) {
						statuslist.push(data[x]);
					} else if (data[x].categoryId == 7) {
						marry.push(data[x]);
					}
					else if (data[x].categoryId == 11) {
						jobapp.push(data[x]);
					}
					else if (data[x].categoryId == 9) {
						jobposi.push(data[x]);
					}
				}
				$scope.status = statuslist;
				$scope.selectSttProfiles = $scope.status[0].id + '';
				$scope.marrystatus = marry;
				$scope.selectMarriage = $scope.marrystatus[0].id + '';
				$scope.jobapply = jobapp;
				$scope.selectJobAplly = $scope.jobapply[0].id + '';
				$scope.jobPosition = jobposi;
				$scope.selectLevel = $scope.jobPosition[0].id + '';

			}
		}, "POST");
	}

	$scope.PreviewImage = "images/avatar.png"

	function fnInit() {

		if (ValidateUltility.checkEmpty(idPer)) {

			ClearAll()
			getDataDropDownAll()
			console.log("idPer 0")
			idPer = 0
			$scope.isDisabledTranning = true
			$scope.isDisabledSkill = true
			$scope.isDisabledExp = true
			$scope.isDisabledEvaluate = true



			$scope.SaveAll = function() {
				var url = "upfile/fileg05"
				var data = new FormData();

				data.append("url", $scope.myForm.url);
				for (i = 0; i < $scope.myForm.files.length; i++) {
					data.append("files", $scope.myForm.files[i]);
				}

				var config = {
					transformRequest: angular.identity,
					transformResponse: angular.identity,
					headers: {
						'Content-Type': undefined
					}
				}
				/*WebService.call($http, url, data, config, function(response) {
					$scope.uploadResult = response.data;
				}, "POST");*/

				$http.post(url, data, config).then(
					// Success
					function(response) {
						$scope.uploadResult = response.data;
					},
					// Error
					function(response) {
						$scope.uploadResult = response.data;
					});
				console.log($scope.submissiondate);
				var saveallchange = {
					"Perdto": {
						"firstName": $scope.firstName,
						"lastName": $scope.lastName,
						"birthDay": $scope.birthDay,
						"sex": $scope.gender,
						"cardId": 1,
						"familyStatusId": $scope.selectMarriage,
						"phonenumber": $scope.PhoneNumber,
						"address": $scope.addres,
						"aboutMe": $scope.remark,
						"email": $scope.AdressEmail,
						"jobTyleId": $scope.selectJobAplly,
						"jobPositionId": $scope.selectLevel,
						"statusId": $scope.selectSttProfiles,
						"photo": filename,
						"recieveDate": $scope.submissiondate
					}
				}
				console.log($scope.submissiondate);
				console.log(saveallchange)
				WebService.call($http, "person/per05", saveallchange, function(response) {
					console.log(response)
						idPer =response.data.Perdto.id
					fnInit()
				}, "POST");

			}

		} else {
						getDataDropDownAll()
			console.log("idPer" + idPer)
			loadPageFrom(idPer);

			$scope.SaveAll = function() {
				var url = "upfile/fileg05"
				var data = new FormData();

				data.append("url", $scope.myForm.url);
				for (i = 0; i < $scope.myForm.files.length; i++) {
					data.append("files", $scope.myForm.files[i]);
				}

				var config = {
					transformRequest: angular.identity,
					transformResponse: angular.identity,
					headers: {
						'Content-Type': undefined
					}
				}
				/*WebService.call($http, url, data, config, function(response) {
					$scope.uploadResult = response.data;
				}, "POST");*/

				$http.post(url, data, config).then(
					// Success
					function(response) {
						$scope.uploadResult = response.data;
					},
					// Error
					function(response) {
						$scope.uploadResult = response.data;
					});

				var saveallchange = {
					"Perdto": {
						"id": idPer,
						"firstName": $scope.firstName,
						"lastName": $scope.lastName,
						"birthday": $scope.birthDay,
						"sex": $scope.gender,
						"cardId": 1,
						"familyStatusId": $scope.selectMarriage,
						"phonenumber": $scope.PhoneNumber,
						"address": $scope.addres,
						"aboutMe": $scope.remark,
						"email": $scope.AdressEmail,
						"jobTyleId": $scope.selectJobAplly,
						"jobPositionId": $scope.selectLevel,
						"statusId": $scope.selectSttProfiles,
						"photo": filename,
						"recieveDate": $scope.submissiondate
					}
				}
				console.log(saveallchange)
				WebService.call($http, "person/per05", saveallchange, function(response) {
					console.log(response)
				
				}, "POST");

			}
		} //end else
	}



	$(function() {
		$('#reservationdate2').datetimepicker({
			format: 'YYYY-MM-DD'
		});
		$('#reservationdate').datetimepicker({
			format: 'YYYY-MM-DD'
		});


	});
	//modal thêm mới công việc ứng tuyển
	$scope.btnJobApplyNew = function() {
		ModalService.ShowModal('screens/modal/AddNewCatIModal.html', 'AddNewCatIModalController', "Thêm mới công việc ứng tuyển", { "categoryId": 11, "parentId": 0 }, function() { getDataDropDownAll() }, "lg");
	}
	//modal thêm mới vị trí công việc
	$scope.btnJobPosition = function() {
		ModalService.ShowModal('screens/modal/AddNewCatIModal.html', 'AddNewCatIModalController', "Thêm mới vị trí công việc", { "categoryId": 9, "parentId": 0 }, function() { getDataDropDownAll() }, "lg");
	};
	//kích thêm mới modal trạng thái hồ sơ
	$scope.btnStatus = function() {
		ModalService.ShowModal('screens/modal/AddNewCatIModal.html', 'AddNewCatIModalController', "Thêm mới trạng thái hồ sơ", { "categoryId": 6, "parentId": 0 }, function() { getDataDropDownAll() }, "lg");
	};

	// nút lưu các dữ liệu của drop vô bảng



	//save toàn bộ dữ liệu được nhập trên trang vào tablel exp		



	//Load id bên search qua tab info để sử dụng

	//function get database in vào client Info dựa vào id

	$scope.SelectFile = function(e) {
		filename = e.target.files[0].name
		var reader = new FileReader();
		reader.onload = function(e) {

			$scope.PreviewImage = e.target.result;
			$scope.$apply();
		};
		console.log(reader)

		reader.readAsDataURL(e.target.files[0]);

	};


	function loadPageFrom(idPer) {
		var dataRequest = {
			"client": {
				"companyId": 1
			},
			"dummySearch": {
				"id": idPer,

			}
		};

		WebService.call($http, "person/per03", dataRequest, function(response) {
				$scope.firstName = response.data.list[0].firstName
			$scope.birthDay = response.data.list[0].birthday
			$scope.lastName = response.data.list[0].lastName
			$scope.gender = response.data.list[0].sex
			$scope.PhoneNumber = response.data.list[0].phonenumber
		//	$scope.selectMarriage = response.data.list[0].familyStatusId
			$scope.addres = response.data.list[0].address
			$scope.remark = response.data.list[0].aboutMe
			$scope.AdressEmail = response.data.list[0].email
		//	$scope.status = response.data.list[0].dateOfProfile
		//	$scope.marrystatus = response.data.list[0].selectMarriages
		//	$scope.jobapply = response.data.list[0].selectJobAplly
		//	$scope.jobPosition = response.data.list[0].selectLevel
			$scope.PreviewImage = "images/avatar/" + response.data.list[0].photo
			$scope.submissiondate = response.data.list[0].recieveDate


		}, "POST");
	};
	//		clickInfo2()
	function clickInfo2() {

		$rootScope.$on('clickInfo1', function(events, data) {


			fnInit();
		})
	};
	function ClearAll() {
		$scope.firstName = "";
		$scope.lastName = "";
		$scope.birthDay = "";
		$scope.gender = "";
		$scope.selectMarriage = "";
		$scope.PhoneNumber = "";
		$scope.addres = "";
		$scope.remark = "";
		$scope.AdressEmail = "";
		$scope.selectJobAplly = "";
		$scope.selectLevel = "";
		$scope.selectSttProfiles = "";
		$scope.submissiondate = "";
		$scope.files = ""

	}
	$scope.ClearAll = function() {
		ClearAll()
	}

});