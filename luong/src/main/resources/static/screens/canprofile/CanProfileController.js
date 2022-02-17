var saveDataGetTable = {
	"fullnameGet": "",
	"startDateGet": "",
	"endDateGet": "",
	"jobPositionIdGet": "-1",
	"trainingFieldGet": "-1",
	"tranningSpecGet": "-1",
	"statusIdGet": "-1",
	"sexGet": "-1",
	"limit": "5",
	"page": 1
}
app.controller('CanProfileCtrl', function($http, $rootScope, $location, $scope, $compile, $q,$timeout, WebService, GridService, ModalService, ValidateUltility) {
	$rootScope.showAside = ""
	$rootScope.showNav = true;
	$rootScope.showHead = true;
	var dataDropdown = [];
	var dataCanFrofile = [];
	var messValiDatetime1 = "";
	var messValiDatetime2 = "";
	$scope.limitValue = "5";
	var pageIndex = 1;

	// Xây dựng màn hình
	buidLabelCanProfile();
	function buidLabelCanProfile() {
		var request = {
			"client": fnGetClientInfo(),
			"dummySearch": {
				"screensId": 2
			},
			"page": {
				"orderBy": "c.id ASC"
			}
		}
		WebService.call($http, 'screensitem/screensitem03', request, function(response) {
			//console.log(response);
			$rootScope.titlePage = response.data.list[0].displayText;
			messValiDatetime1 = response.data.list[24].displayText;
			messValiDatetime2 = response.data.list[32].displayText;
			messValidateFileImport = response.data.list[33].displayText;
			$scope.message = response.data.list[34].displayText; // hiển thị mess khi không có dữ liệu
			var data = response.data.list;
			for (var x = 1; x < data.length; x++) {
				$scope["CanPro" + x] = data[x].displayText;
			}

		}, "POST")
	};

	//xây dựng dropdown
	getdropdown();
	function getdropdown() {
		var requestdata = {
			"client": fnGetClientInfo(),
			"dummySearch": {
			}
		}
		WebService.call($http, 'catitem/ci03', requestdata, function(response) {
			dataDropdown = response.data.list;
			var recruitment = [];
			var major = [];
			var status = [];
			var gender = [];
			for (x in dataDropdown) {
				if (dataDropdown[x].categoryId == 2) {
					major.push(dataDropdown[x]);
				} else if (dataDropdown[x].categoryId == 10) {
					recruitment.push(dataDropdown[x])
				} else if (dataDropdown[x].categoryId == 6) {
					status.push(response.data.list[x])
				} else if (response.data.list[x].categoryId == 12) {
					gender.push(response.data.list[x])
				}
			}
			$scope.Status = status;
			$scope.Recruitment = recruitment;
			$scope.Majors = major;
			$scope.Gender = gender;
			if (idPer > 0) {
				$scope.fullname = saveDataGetTable.fullnameGet;
				$scope.firstDate = saveDataGetTable.startDateGet;
				$scope.lastDate = saveDataGetTable.endDateGet;
				$scope.selectRecruitment = saveDataGetTable.jobPositionIdGet;
				$scope.selectMajors = saveDataGetTable.trainingFieldGet;
				$scope.selectSpecial = saveDataGetTable.tranningSpecGet;
				$scope.selectStatus = saveDataGetTable.statusIdGet;
				$scope.selectGender = saveDataGetTable.sexGet;
				pagi = saveDataGetTable.page;
				$scope.limitValue = saveDataGetTable.limit;
				idPer = 0;
				tableCanInfo();
			} else {
				fnClearForm();
				tableCanInfo();
			}
		}, "POST")
	}

	// onchange ngành học thay đổi nội dung dropdown chuyên ngành
	$scope.changeMajors = function() {
		var spec = [];
		if ($scope.selectMajors != "-1") {
			for (x in dataDropdown) {
				if (dataDropdown[x].categoryId == 3 && dataDropdown[x].parentId == $scope.selectMajors) {
					spec.push(dataDropdown[x]);
				}
			}
		}
		$scope.Special = spec;
		$scope.selectSpecial = "-1";
	}

	// định dạng cho dữ liệu ngày tháng tìm kiếm, lọc dữ liệu
	$(function() {
		$('#reservationdate').datetimepicker({
			format: 'YYYY/MM/DD'
		});
		$('#reservationdate2').datetimepicker({
			format: 'YYYY/MM/DD'
		});
	});

	// button clear form
	$scope.delForm = function() {
		fnClearForm();
		tableCanInfo();
	}

	// fn clear form
	function fnClearForm() {
		$scope.fullname = "";
		$scope.firstDate = "";
		$scope.lastDate = "";
		$scope.selectMajors = "-1";
		$scope.selectSpecial = "-1";
		$scope.selectRecruitment = "-1";
		$scope.selectStatus = "-1";
		$scope.selectGender = "-1";
		$scope.changeMajors();
		$scope.dateMessage = "";
		pageIndex = 1;
	}

	// button tìm kiếm, lọc
	$scope.findCanProfile = function() {
		$scope.limitValue = "5";
		pageIndex = 1;
		$scope.dateMessage = "";
		if (validatesearch() == true) {
			return;
		} else {
			tableCanInfo();
		}
	}

	// build lưới dữ liệu
	function tableCanInfo() {
		dataCanFrofile = [];
		var request = {
			"client": fnGetClientInfo(),
			"dummySearch": {
				"fullname": $scope.fullname,
				"startDate": $scope.firstDate,
				"endDate": $scope.lastDate,
				"jobPositionId": $scope.selectRecruitment,
				"trainingField": $scope.selectMajors,
				"tranningSpec": $scope.selectSpecial,
				"statusId": $scope.selectStatus,
				"sex": $scope.selectGender
			},
			"page": {
				"orderBy": "p.id ASC",
				"limit": $scope.limitValue,
				"pageIdx": pageIndex

			}
		}
		WebService.call($http, 'can/info/ig03', request, function(response) {
			dataCanFrofile = response.data.list;
			var columnInfo = [
				{ "keycol": "STT", "keyname": "{{CanPro30}}", "colType": "STT" },
				{ "keycol": "fullname", "keyname": "{{CanPro2}}", "colType": "link", "template": "<a href='' style='text-decoration-line:underline' data-ng-click='canProfileInfolink({id})'>" },
				{ "keycol": "sexname", "keyname": "{{CanPro5}}", "colType": "string" },
				{ "keycol": "birthday", "keyname": "{{CanPro13}}", "colType": "string" },
				{ "keycol": "phone", "keyname": "{{CanPro14}}", "colType": "string" },
				{ "keycol": "email", "keyname": "{{CanPro21}}", "colType": "string" },
				{ "keycol": "address", "keyname": "{{CanPro15}}", "colType": "string" },
				{ "keycol": "recieveDate", "keyname": "{{CanPro23}}", "colType": "string" },
				{ "keycol": "jobPosition", "keyname": "{{CanPro3}}", "colType": "string" },
				{ "keycol": "trainingFieldText", "keyname": "{{CanPro7}}", "colType": "string" },
				{ "keycol": "tranningSpecText", "keyname": "{{CanPro9}}", "colType": "string" },
				{ "keycol": "status", "keyname": "{{CanPro11}}", "colType": "string" },
				{
					"keycol": "action", 'colType': "checkbox", "keyname": "{{CanPro16}}", "template": "<a href data-ng-click='canProfileInfo({})'>" + "<i class='fa fa-glasses'></i></a>" + "<i class='mx-1'></i> " + "<a href data-ng-click='canProfileUpdate({})'>" + "<i class='fa fa-edit'></i></a>" + "<i class='mx-1'></i> " + "<a href data-ng-click='canProfileDelete({})'>" + "<i class='far fa-trash-alt'></i></a>"
				},
			]
			var tableHtml = "";
			var table = ";"
			if (response.data.list.length == 0) {
				table = GridService.buildGridnon(columnInfo, response.data.list);
			} else {
				table = GridService.buildGrid(columnInfo, response.data.list);
			}
			tableHtml = $("#gridCanProfile").html(table);
			$compile(tableHtml)($scope);

			GridService.buildpagination(response.data);
			var pagi = GridService.buildpagination(response.data);
			var pagiHtml = $("#paginateRole").html(pagi);
			$compile(pagiHtml)($scope);

			$scope.isActivePagi = function(pagi) {
				return pagi === response.data.page.pageIdx;
			}

		}, "POST")
	};

	// các button trên lưới
	$scope.canProfileInfolink = function(id) {
		idPer = id;
		saveDataGetTable = {
			"fullnameGet": $scope.fullname,
			"startDateGet": $scope.firstDate,
			"endDateGet": $scope.lastDate,
			"jobPositionIdGet": $scope.selectRecruitment,
			"trainingFieldGet": $scope.selectMajors,
			"tranningSpecGet": $scope.selectSpecial,
			"statusIdGet": $scope.selectStatus,
			"sexGet": $scope.selectStatus,
			"limit": $scope.limitValue,
			"page": pageIndex,
		}
		$location.path('/CanProfileInfo');
	};
	$scope.canProfileInfo = function(idx) {
		idPer = dataCanFrofile[idx - 1].id;
		saveDataGetTable = {
			"fullnameGet": $scope.fullname,
			"startDateGet": $scope.firstDate,
			"endDateGet": $scope.lastDate,
			"jobPositionIdGet": $scope.selectRecruitment,
			"trainingFieldGet": $scope.selectMajors,
			"tranningSpecGet": $scope.selectSpecial,
			"statusIdGet": $scope.selectStatus,
			"sexGet": $scope.selectStatus,
		}
		$location.path('/CanProfileInfo');
	};

	$scope.canProfileUpdate = function(idx) {
		idPer = dataCanFrofile[idx - 1].id;
		$location.path('/Profiles');
	};
	$scope.canProfileDelete = function(idx) {
		ModalService.alert({ "modalTitle": "Question", "messenge": "Bạn muốn muốn xoá hồ sơ?" }, function() {
			var request = {
				"client": fnGetClientInfo(),
				"dto": {
					"id": 1,
					"personId": dataCanFrofile[idx - 1].id,
					"recieveDate": dataCanFrofile[idx - 1].recieveDate,
					"jobTyleId": dataCanFrofile[idx - 1].jobTyleId,
					"jobPositionId": dataCanFrofile[idx - 1].jobPositionId,
					"statusId": dataCanFrofile[idx - 1].statusId,
					"remark": dataCanFrofile[idx - 1].remark,
					"useFlag": 3,
				}
			}
			WebService.call($http, 'can/can/can05', request, function(response) {
				tableCanInfo();
			}, "POST")
		}, function() { })
	};

	// button xuất file
	$scope.exportCanPro = function() {
		var request = {
			"client": fnGetClientInfo(),
			"dummySearch": {
				"fullname": $scope.fullname,
				"startDate": $scope.firstDate,
				"endDate": $scope.lastDate,
				"jobPositionId": $scope.selectRecruitment,
				"trainingField": $scope.selectMajors,
				"tranningSpec": $scope.selectSpecial,
				"statusId": $scope.selectStatus,
				"sex": $scope.selectGender
			},
			"page": {
				"limit": $scope.limitValue,
				"pageIdx": pageIndex,
			}
		}
		WebService.call($http, 'can/info/igexport', request, function(response) {
			var file = new Blob([response.data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
			saveAs(file, 'download.xlsx');
		}, "POST", "blob")
	}

	// button nhập file
	var fileName = "";
	var showImport = false;
	$scope.importCanPro = function() {
		$scope.importMessage = "";
		console.log("asdasd")
		var txt = "";
		if (showImport == false) {
			showImport = true;
			$scope.myForm = {
				url: "excel",
				files: []
			}
			txt = "<input type='file' onchange='angular.element(this).scope().SelectFile(event)' file-model='myForm.files[0]' accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel,text/comma-separated-values, text/csv, application/csv'/>";
			txt += "<button type='submit' class='btn btn-success mr-2' data-ng-model='inportValue' data-ng-click='confirmCanPro()'>{{CanPro31}}</button>"
		} else {
			showImport = false;
		}
		var importHtml = $("#importFile").html(txt);
		$compile(importHtml)($scope);

	}

	function upfile() {
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
		$http.post(url, data, config).then(
			// Success
			function(response) {
				console.log(response.data.slice(13, response.data.indexOf(",")));
				$scope.uploadResult = response.data.slice(13, response.data.indexOf(",")) + "";
			},
			// Error
			function(response) {
				$scope.uploadResult = response.data.slice(13, response.data.indexOf(","));
			});
	};

	function readfile() {
		$scope.importMessage = "";
		if (validateImport() == true) {
			return;
		} else {
			
			var request = {
				"client": fnGetClientInfo(),
				"url": $scope.uploadResult
			}
			WebService.call($http, 'can/read/igread', request, function(response) {
				ModalService.alert({ "modalTitle": "Success", "messenge": "Thêm dữ liệu thành công." }, function() {
						$scope.dateMessage = "";
					fileName = "";
					$scope.limitValue = "5";
					fnClearForm();
					tableCanInfo();
					$scope.importCanPro();
					console.log("ádasdas");
				}, function() {
				
				})

			}, "POST")
		}
	}

	$scope.SelectFile = function(e) {
		fileName = e.target.files[0].name;
		var reader = new FileReader();
		reader.onload = function(e) {
			$scope.$apply();
		};
		reader.readAsDataURL(e.target.files[0]);
	};

	$scope.confirmCanPro = function() {
		$q.all([upfile(), $timeout(function() {readfile()}, 500)]);
	}

	// validate cho 2 input nhập ngày tháng
	function validatesearch() {
		var hasError = false;
		if ((ValidateUltility.checkEmpty($scope.firstDate) && !(ValidateUltility.checkEmpty($scope.lastDate))) ||
			(!(ValidateUltility.checkEmpty($scope.firstDate)) && ValidateUltility.checkEmpty($scope.lastDate))) {
			$scope.dateMessage = messValiDatetime1;
			hasError = true;
		} else if ($scope.firstDate > $scope.lastDate) {
			$scope.dateMessage = messValiDatetime2;
			hasError = true;
		}
		return hasError;
	};
	// validate import
	function validateImport() {
		var hasError = false;
		if (ValidateUltility.checkEmpty(fileName)) {
			$scope.importMessage = messValidateFileImport;
			hasError = true;
		}
		return hasError;
	}

	// phân trang theo số page API gửi về
	$scope.pagina = function(Numberpage) {
		pageIndex = Numberpage;
		tableCanInfo();
	}

	// thay đổi số view hiên tại
	$scope.changeValuelimit = function() {
		pageIndex = 1;
		tableCanInfo();
	}
});
