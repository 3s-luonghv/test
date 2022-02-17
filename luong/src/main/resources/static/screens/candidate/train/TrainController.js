app.controller('TrainController', function($rootScope, WebService, $http, $scope, GridService, $compile, ModalService) {
	$rootScope.titlePage = "Đào tạo";
	$scope.valueselectLanguage = "";
	console.log(idPer)
	var limitItem = 5;
	var pageIndex = 1
	var getDataDrop = function() {
		//khai báo điều kiện để get dữ liệu lên Specialized
		var dataLanguage = {
			"client": fnGetClientInfo(),
			"dummySearch": {}

		}
		//gọi để hiển thị data lên drop Level
		WebService.call($http, "catitem/ci03", dataLanguage, function(response) {
			//console.log(response);
			var special = new Array();
			var system = new Array();
			var degree = new Array();
			var data = response.data.list;
			if (data == 0) {
				console.log("Không có dữ liệu");
			} else {
				for (x in data) {
					if (data[x].categoryId == 3) {
						special.push(data[x]);
					} else if (data[x].categoryId == 4) {
						system.push(data[x]);
					} else if (data[x].categoryId == 1) {
						degree.push(data[x]);
					}
				}
				//console.log(special);
				//console.log(status);
				//tab thông tin chung
				$scope.specialized = special;
				$scope.Specialized = $scope.specialized[0].id + "";
				$scope.trainingSystem = system;
				$scope.TrainingSystem = $scope.trainingSystem[0].id + "";
				$scope.degreeTraining = degree;
				$scope.DegreeTraining = $scope.degreeTraining[0].id + "";
				//loadGrid(response)
			}
		}, "POST");

	}
	$scope.deleteForm = function() {
		console.log("XOAFORM")
		$scope.Specialized = $scope.specialized[0].id;
		$scope.TrainingSystem = $scope.trainingSystem[0].id;
		$scope.DegreeTraining = $scope.degreeTraining[0].id

	}


	$scope.filterForm = function() {
		if (idPer == 0) {
			ModalService.alert({ "modalTitle": "Warning", "messenge": "Chưa có ID Hồ Sơ" }, function() { },  function( ){  })
		} else {
			//console.log("loc form")
			var requestForm = {
				"client": {
					"langCode": "vi"

				},
				"dummySearch": {
					"idper": idPer,
					"specializedid": $scope.Specialized,
					"trainingSystemid": $scope.TrainingSystem,
					"degreeTrainingId": $scope.DegreeTraining,
					"useFlag": 1
				},
				"page":
				{
					"limit": limitItem,
					"pageIdx": pageIndex
				}

			}
			console.log(requestForm)
			WebService.call($http, "person/ps03", requestForm, function(response) {
				console.log(response)
				loadgrid(response)
			}, "POST")

		}
	}
	/*function loadFilter(){
		   console.log("test data form loc")*/



	getDataDrop();
	// Bật modal Chuyên ngành
	$scope.insertSpecialized = function() {
		ModalService.ShowModal('screens/modal/AddNewCatIModal.html', 'AddNewCatIModalController', "Thêm mới chuyên ngành", 3, "");
	};

	//Bật modal Hệ đào tạo
	$scope.insertTrainingSystem = function() {
		ModalService.ShowModal('screens/modal/AddNewCatIModal.html', 'AddNewCatIModalController', "Thêm mới hệ đào tạo", 4, "");
	};

	// Bật modal Trình độ đào tạo
	$scope.insertDegreetraining = function() {
		ModalService.ShowModal('screens/modal/AddNewCatIModal.html', 'AddNewCatIModalController', "Thêm mới quá trình đào tạo", 1, "");
	};

	// Bật modal Thêm mới
	$scope.addTrainingProcess = function() {
		if (idPer == 0) {
			ModalService.alert({ "modalTitle": "Warning", "messenge": "Chưa có ID Hồ Sơ" }, function() { },  function( ){  })
		}  else {
			ModalService.ShowModal('screens/modal/AddNewModalTrain.html', 'AddNewModalTrainController', "Thêm mới thông tin quá trình đào tạo", idPer, function() {
				loaddatagrid();
			}, "xl");
		}
	}

	// load bảng 
	function loadgrid(response) {

		// $scope.myData = response.data;

		var columnInfo = [
			{
				"keycol": "check",
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
				"keycol": "fromDate",
				"keyname": "Từ",
				"colType": "string"
			},
			{
				"keycol": "toDate",
				"keyname": "Đến",
				"colType": "string"
			},
			{
				"keycol": "degreeTraining",
				"keyname": "Trình độ ",
				"colType": "string"
			},
			{
				"keycol": "fieldsOfStudy",
				"keyname": "Lĩnh vực",
				"coltype": "string"
			},
			{
				"keycol": "specialized",
				"keyname": "Chuyên ngành",
				"colType": "string"
			},
			{
				"keycol": "trainingSystem",
				"keyname": "Hệ đào tạo",
				"colType": "string"
			},
			{
				"keycol": "ratings",
				"keyname": "Xếp loại",
				"colType": "string"
			},
			{
				"keycol": "trainingPlaces",
				"keyname": "Nơi đào tạo",
				"colType": "string"
			},
			{
				"keycol": "action",
				'colType': "template",
				"keyname": "Action",
				"template": "<a class = 'pr-3' data-ng-click='editTrain({id})' style='cursor:pointer'>" +
					"<i class='fas fa-pen'></i></a>" +
					"<a data-ng-click='deleteTrain({id})' style='cursor:pointer'>" +
					"<i class='fas fa-times'></i></a>"
			}
		]
		/*$scope.editor = function(stt) {
			console.log(stt)
			dataGridListRole[stt - 1].langCode
			console.log(dataGridListRole[stt - 1].id)
			console.log(dataGridListRole[stt - 1].langCode)
			ModalService.ShowModal('screens/modal/modalrole.html', 'ModalRoleController', "Cập nhật thông tin vai trò", dataGridListRole[stt - 1], function(response) { loadgrid() });
		}*/
		$("#myGridTable").html('');
		$("#paginationTrain").html('');
		console.log(response);
		//GridService.buildGrid(columnInfo, response.data.list);
		var table = GridService.buildGrid(columnInfo, response.data.list);
		var tableHtml = $("#myGridTable").html(table);
		$compile(tableHtml)($scope);

		dataGridListRole = response.data.list;
		GridService.buildpagination(response.data);
		var pagi = GridService.buildpagination(response.data);
		var pagiHtml = $("#paginationTrain").html(pagi);
		$compile(pagiHtml)($scope);


	}


	$scope.pagina = function(page) {
		var request = {

			"client": {
				"langCode": "vi"

			},
			"dummySearch": {
				"idper": idPer,
				"specializedid": $scope.Specialized,
				"trainingSystemid": $scope.TrainingSystem,
				"degreeTrainingId": $scope.DegreeTraining,
				"useFlag": 1
			},
			"page":
			{
				"limit": limitItem,
				"pageIdx": page
			}
		}
		WebService.call($http, 'person/ps03', request, function(response) {
			loadgrid(response)
			$scope.isActivePagi = function(pagi) {

				return pagi === response.data.page.pageIdx;
			}
		}, "POST")
	}
	
	if(idPer >0){
		loaddatagrid();
		}
	function loaddatagrid() {
		var datarequest =
		{

			"client": {
				"langCode": "vi"

			},
			"dummySearch": {
				"idper": idPer,
				"useFlag": 1


			},
			"page":
			{
				"limit": limitItem,
				"pageIdx": pageIndex
			}

		}

		WebService.call($http, "person/ps03", datarequest, function(response) {
			console.log(response)
			loadgrid(response)
		}, "POST")
	}







	$scope.editTrain = function(id) {
		console.log("edit train");
		ModalService.ShowModal('screens/modal/EditModalTrain.html', 'EditModalTrainController', "Cập nhật quá trình đào tạo", id, function() {
			loaddatagrid()
		});
	}
	$scope.deleteTrain = function(id) {
		console.log("Xóa Train")
		var request = {
			"client": {
				"langCode": "vi"

			},
			"dto": {
				"id": id,
				"idper": idPer,
				"fromDate": $scope.FromDate,
				"toDate": $scope.ToDate,
				"degreeTrainingId": $scope.DegreeTraining,
				"fieldsOfStudyId": $scope.FieldsOfStudy,
				"specializedid": $scope.Specialized,
				"trainingSystemid": $scope.TrainingSystem,
				"ratingsId": $scope.Ratings,
				"trainingPlaces": $scope.TrainingPlaces,
				"useFlag": 3,
				"useFlagName": 3
			}
		}
		console.log(request);
		WebService.call($http, "person/ps05", request, function(response) {

			console.log(response);
			loaddatagrid()

		}, "POST");


	}





	$(function() {
		$('#reservationdate_start').datetimepicker({
			format: 'YYYY-MM-DD'
		});
		$('#reservationdate_end').datetimepicker({
			format: 'YYYY-MM-DD'
		});

	});
});