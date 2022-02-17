app.controller("ExpController", function($http, $scope, $rootScope, WebService, GridService, ModalService, $compile) {
	var dataDel = [];
	var loaddatadummny = "";
	var getDataDropDownAll = function() {
		//khai báo điều kiện để get dữ liệu lên Level
		var dataDropDownAll = {
			"client": fnGetClientInfo(),
			"dummySearch": {}
		}
		//gọi để hiển thị data lên drop Level
		WebService.call($http, "catitem/ci03", dataDropDownAll, function(response) {
			var placework = [];
			var rolework = [];
			var data = response.data.list;
			if (data == 0) {

			} else {
				//console.log("OK");

				for (x in data) {
					if (data[x].categoryId == 17) {
						placework.push(data[x]);
					} else if (data[x].categoryId == 10) {
						rolework.push(data[x]);
					}
				}
				$scope.dataPlaceWorking = placework;
				//  $scope.placeWorking = $scope.dataPlaceWorking[-1].id + "";
				$scope.dataRole = rolework;
				//    $scope.selectRole = $scope.dataRole[-1].id + "";
                /*					$scope.statusNameList = status;
                					$scope.selectstatus = $scope.statusNameList[0].useFlag + "";
                					loadgrid()*/

			}
		}, "POST");
	}
	getDataDropDownAll();


	$scope.fnAddnew = function() {
		if (idPer == 0) {
			ModalService.alert({ "modalTitle": "Warning", "messenge": "Chưa có ID Hồ Sơ" }, function() { }, function() { })
		} else {
			ModalService.ShowModal('screens/modal/AddNewExpModal.html', 'AddNewExpModalController', "Thêm mới", '', function(response) {
				console.log(response)
				if (response == true) {
					loaddatagrid();
				}

			}, 'xl');
		}
	}
	$scope.placeWorking = "-1";
	$scope.selectRole = "-1";

	$scope.fnClearForm = function() {
		$scope.placeWorking = $scope.dataPlaceWorking[-1];
		$scope.selectRole = $scope.dataRole[-1];
	}

	function loadgrid(response) {

		dataDel = response.data.list;
		console.log(dataDel);
		// $scope.myData = response.data;

		var columnInfo = [{
			"keycol": "action",
			'colType': "checkbox",
			"keyname": "<div class='form-check text-center'><input ng-true-value=true ng-false-value=false class='form-check-input' type='checkbox' data-ng-model='checkAll'><label class='form-check-label'></label></div>",
			"template": "<div class='form-check text-center'><input ng-true-value=true ng-false-value=false class='form-check-input' type='checkbox' data-ng-checked ='checkAll' ng-model='checkbox{id}'><label class='form-check-label'></label></div>"
		},
		{
			"keycol": "STT",
			"keyname": "STT",
			"colType": "STT"
		},
		{
			"keycol": "startTime",
			"keyname": "Từ",
			"colType": "Date"
		},
		{
			"keycol": "endTime",
			"keyname": "Đến",
			"colType": "Date"
		},
		{
			"keycol": "Noilamviec",
			"keyname": "Nơi làm việc",
			"colType": "string"
		},
		{
			"keycol": "nameProjects",
			"keyname": "Công việc, dự án",
			"coltype": "string"
		},
		{
			"keycol": "time",
			"keyname": "Thời gian",
			"colType": "string"
		},
		{
			"keycol": "Vaitrochinh",
			"keyname": "Vai trò",
			"colType": "string"
		},
		{
			"keycol": "Loaicongviec",
			"keyname": "Loại công việc",
			"colType": "string"
		},
		{
			"keycol": "organizationName",
			"keyname": "Tổ chức, địa chỉ",
			"colType": "string"
		},
		{
			"keycol": "scale",
			"keyname": "Quy mô",
			"colType": "string"
		},
		{
			"keycol": "workSammary",
			"keyname": "Thông tin công việc, dự án",
			"colType": "string"
		},
		{
			"keycol": "technologyApplication",
			"keyname": "Chuyên môn, công nghệ áp dụng",
			"colType": "string"
		},
		{
			"keycol": "achievements",
			"keyname": "Thành tích",
			"colType": "string"
		},
		{
			"keycol": "action",
			'colType': "template",
			"keyname": "Action",
			"template": "<a class = 'pr-3' data-ng-click=editor({id}) style='cursor:pointer'>" +
				"<i class='fas fa-pen'></i></a>" +
				"<a data-ng-click=deleteTrain({id}) style='cursor:pointer'>" +
				"<i class='fas fa-times'></i></a>"
		}
		]


		console.log(response);
		GridService.buildGrid(columnInfo, response.data.list);
		var table = GridService.buildGrid(columnInfo, response.data.list);
		// console.log("Đã build lưới");
		$("#GridTableExp").html('');
		var tableHtml = $("#GridTableExp").html(table);
		//dataGridListRole = response.data.list;



		$compile(tableHtml)($scope);
		// console.log("Đã đưa vào Table");
	}



		if(idPer >0){	loaddatagrid();}

	function loaddatagrid() {
		var datarequest = {

			"client": {
				"langCode": "vi"
			},
			"dummySearch": {
				"idper": idPer,
				"useFlag": 1

			}

		}

		WebService.call($http, "personexp/perexp03", datarequest, function(response) {
			console.log(response);
			loadgrid(response);
			loaddatadummny = response;
		}, "POST")
	}
	
		$scope.fnSearchRole = function() {
			if (idPer == 0) {
		ModalService.alert({ "modalTitle": "Warning", "messenge": "Chưa có ID Hồ Sơ" }, function() { }, function() { })
	} else {
			console.log("loc form")
			var requestForm = {
				"client": {
					"langCode": 'vi'
				},
				"dummySearch": {
					"idper": idPer,
					"workplace": $scope.placeWorking,
					"nameProjects": $scope.project,
					"mainRole": $scope.selectRole
				}
			}
			console.log(requestForm)
			WebService.call($http, "personexp/perexp03", requestForm, function(response) {
				console.log(response)
				loadgrid(response);
			}, "POST")
		}
	}
	$scope.editor = function(id) {
		//	id = dataGridListRole[stt].id;
        /*					console.log(stt)
        					dataGridListRole[stt - 1].langCode
        					
        					console.log(dataGridListRole[stt - 1].id)
        					console.log(dataGridListRole[stt - 1].langCode)*/
		ModalService.ShowModal('screens/modal/AddNewExpModal.html', 'EditExpModalController', "Cập nhật thông tin", id, function(response) {
			console.log(response)
			loaddatagrid();
		}, 'xl');


	};

	$scope.deleteTrain = function(id) {
		var datarequest = {

			"client": {
				"langCode": "vi"
			},
			"dummySearch": {
				"id": id,
				"useFlag": 1

			}

		}

		WebService.call($http, "personexp/perexp03", datarequest, function(response) {
			console.log(response);


			/*    var    laaaa  = response.data.list[0];
			/*			delete laaaa.Loaicongviec;
						delete laaaa.Vaitrochinh;
						delete laaaa.Noilamviec;
						laaaa.useFlag = 3*/
			var delreq = {
				"client": {
					"langCode": "vi"
				},
				"dto":
				{
					"id": response.data.list[0].id,
					"idper": response.data.list[0].idper,
					"startTime": response.data.list[0].startTime,
					"endTime": response.data.list[0].endTime,
					"workplace": response.data.list[0].workplace,
					"organizationName": response.data.list[0].organizationName,
					"workTypes": response.data.list[0].workTypes,
					"nameProjects": response.data.list[0].nameProjects,
					"mainRole": response.data.list[0].mainRole,
					"workSammary": response.data.list[0].workSammary,
					"technologyApplication": response.data.list[0].technologyApplication,
					"achievements": response.data.list[0].achievements,
					"scale": response.data.list[0].scale,
					"time": response.data.list[0].time,
					"useFlag": response.data.list[0].useFlag
				}
			}
			WebService.call($http, "personexp/perexp05", delreq, function(response) {
				console.log(response)
				loaddatagrid();
			}, "POST")
		}, "POST")



	}
});