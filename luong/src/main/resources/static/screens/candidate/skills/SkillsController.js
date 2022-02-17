app.controller('SkillsController', function($rootScope, $scope, WebService, $http, $uibModal, ModalService, GridService, $compile) {

	$scope.selectcMon = "-1";
	$scope.selectSkill = "-1";
	$scope.selectLevel00 = "-1";
	var getDataDropDown = function() {
		var dataDropDown = {
			"client": fnGetClientInfo()
		}
		WebService.call($http, "catitem/ci03", dataDropDown, function(response) {
			console.log(response)
			var specializedata = [];
			var skillnamedata = [];
			var leveldata = [];
			var data = response.data.list;
			if (data == 0) {
				console.log("Không có dữ liệu");
			} else {
				for (x in data) {
					if (data[x].categoryId == 13) {
						specializedata.push(data[x]);
					} else if (data[x].categoryId == 14 && data[x].parentId == parent) {
						skillnamedata.push(data[x]);
					}
					else if (data[x].categoryId == 9) {
						leveldata.push(data[x]);
					}
				}
			}

			$scope.Specializedata = specializedata;
			$scope.Skillnamedata = skillnamedata;
			// $scope.selectcMon = -1;
			//	$scope.selectSkill = $scope.Skillnamedata[0].id +"";
			$scope.Leveldata = leveldata;
			// $scope.selectLevel00 = $scope.Leveldata[0].id +"";

		}, "POST");

	}

	getDataDropDown()
	$scope.changeskillName = function() {
		parent = $scope.selectcMon;
		console.log(parent)
		getDataDropDown()
	}
	$scope.btnOpenModalProffessionSkills = function() {
		ModalService.ShowModal('screens/modal/AddNewCatIModal.html', 'AddNewCatIModalController', "Thêm mới Chuyên Môn", 13, "", "");
	}
	$scope.btnOpenModalskill = function() {
		ModalService.ShowModal('screens/modal/AddNewCatIModal.html', 'AddNewCatIModalController', "Thêm mới Kỹ Năng", 14, "");
	}
	$scope.btnOpenModalLevel00 = function() {
		ModalService.ShowModal('screens/modal/AddNewCatIModal.html', 'AddNewCatIModalController', "Thêm mới Trình độ/Bậc", 9, "");
	}
	$scope.saveSkill = function() {
		if (idPer == 0) {
			ModalService.alert({ "modalTitle": "Warning", "messenge": "Chưa có ID Hồ Sơ" }, function() { }, function() { })
		} else {
			ModalService.ShowModal('screens/modal/AddNewModalSkill.html', 'AddNewModalSkillController', "Thêm mới thông tin kỹ năng.", "", function() {
				loaddatagrid();
			}, "xl");
		}
	}
	$scope.deleteForm = function() {
		$scope.selectcMon = "-1";
		$scope.selectSkill = "-1";
		$scope.selectLevel00 = "-1"
	}


	function loadgrid(response) {
		console.log(response);

		// $scope.myData = response.data;

		var columnInfo = [
			{
				"keycol": "action",
				'colType': "template",
				"keyname": "<div class='form-check text-center'><input ng-true-value=true ng-false-value=false class='form-check-input' type='checkbox' data-ng-model='checkAll'><label class='form-check-label'></label></div>",
				"template": "<div class='form-check text-center'><input ng-true-value=true ng-false-value=false class='form-check-input' type='checkbox' data-ng-checked ='checkAll' ng-model='checkbox{id}'><label class='form-check-label'></label></div>"
			},

			{
				"keycol": "id",
				"keyname": "STT",
				"colType": "string"
			},
			{
				"keycol": "startdate",
				"keyname": "Từ",
				"colType": "string"
			},
			{
				"keycol": "enddate",
				"keyname": "Đến",
				"colType": "string"
			},
			{
				"keycol": "nhomchuyenmon",
				"keyname": "Nhóm chuyên môn",
				"colType": "string"
			},
			{
				"keycol": "tenkynang",
				"keyname": "Tên kỹ năng",
				"coltype": "string"
			},
			{
				"keycol": "trinhdobac",
				"keyname": "Trình độ bậc",
				"colType": "string"
			},
			{
				"keycol": "yearexp",
				"keyname": "Năm kinh nghiệm",
				"colType": "string"
			},
			{
				"keycol": "monthexp",
				"keyname": "Tháng kinh nghiệm",
				"colType": "string"
			},
			{
				"keycol": "note",
				"keyname": "Remark",
				"colType": "string"
			},
			{
				"keycol": "action",
				'colType': "template",
				"keyname": "Action",
				"template": "<a class = 'pr-3' data-ng-click='editor({id})' style='cursor:pointer'>" +
					"<i class='fas fa-pen'></i></a>" +
					"<a data-ng-click='delete({})' style='cursor:pointer'>" +
					"<i class='fas fa-times'></i></a>"
			}
		]
		$scope.editor = function(id) {
			console.log(id)


			ModalService.ShowModal('screens/modal/EditModalSkill.html', 'EditModalSkillController', "Chỉnh sữa thông tin kỹ năng", id, function(response) { loaddatagrid() });
		}

		console.log(response);
		GridService.buildGrid(columnInfo, response.data.list);
		var table = GridService.buildGrid(columnInfo, response.data.list);
		console.log("Đã build lưới");
		$("#gridRecords").html('');
		var tableHtml = $("#gridRecords").html(table);
		dataGridListRole = response.data.list;

		$compile(tableHtml)($scope);
		console.log("Đã đưa vào Table");
	}
	if(idPer >0){	loaddatagrid();}
	function loaddatagrid() {
		var datarequest =
		{
			"client": {
				"langCode": "vi"
			},
			"dummySearch": {
				"idper": idPer
			}
		}
		WebService.call($http, "personsk/personsk03", datarequest, function(response) {
			console.log(response)
			loadgrid(response)
		}, "POST")
	}
	$scope.searchForm = function() {
		if (idPer == 0) {
			ModalService.alert({ "modalTitle": "Warning", "messenge": "Chưa có ID Hồ Sơ" }, function() { }, function() { })
		} else {
			var requestForm = {
				"client": {
					"langCode": 'vi'

				},
				"dummySearch": {
					"idper": idPer,
					"skillgroup": $scope.selectcMon,
					"skillname": $scope.selectSkill,
					"level": $scope.selectLevel00
				}
			}

			WebService.call($http, "personsk/personsk03", requestForm, function(response) {
				loadgrid(response)
			}, "POST")
		}
	}
});
