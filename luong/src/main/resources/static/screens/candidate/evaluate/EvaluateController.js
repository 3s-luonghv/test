app.controller('EvaluateController', function($rootScope, $scope, GridService, $compile, WebService, $http, $uibModal, ModalService) {

	var page = 1;
	$scope.addNew = function() {
		if (idPer == 0) {
		ModalService.alert({ "modalTitle": "Warning", "messenge": "Chưa có ID Hồ Sơ" }, function() { }, function() { })
	} else {
		ModalService.ShowModal('screens/modal/AddNewModalEvaluate.html', 'AddNewModalEvaluateController', 'Thêm mới', '', function() {
			loaddatagrid()
		}, 'xl')
	}
	}
	$scope.editor = function(id) {
		ModalService.ShowModal('screens/modal/EditModalEvaluate.html', 'EditModalEvaluateController', 'EditAdd', id, '', 'xl')
	}
	$(function() {
		$('#dayreview').datetimepicker({
			format: 'YYYY-MM-DD'
		})
	});
	//Btn lọc, tìm kiếm
	$scope.search = function() {
		console.log("test nut lọc tìm")
		var filter = {
			"client": {
				"langcode": "",
			},
			"dummySearch": {
				"dateview": $scope.dayReview,
				"useview": $scope.perReview,
				"rankview": $scope.selectRank,
				"result": $scope.selectStatusProfile
			},
			"page": {
				"limit": 5,
				"pageIdx": page
			}
		}
		console.log(filter);
	}
	// highlight dòng trong bảng khi được tích trong checkbox table
	// được check 
	$('#TableCandidate').find('input:checkbox[id$="chkStatus"]').click(function() {
		var isChecked = $(this).prop("checked");
		var $selectedRow = $(this).parent("td").parent("tr");

		if (isChecked) $selectedRow.css({
			"background-color": "#28a745",
			"color": "white"
		});
		else $selectedRow.css({
			"background-color": '',
			"color": "black"
		});
	});
	// end
	//grid
	function loadgrid(response) {

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
				"keycol": "dateview",
				"keyname": "Ngày",
				"colType": "string"
			},
			{
				"keycol": "usereview",
				"keyname": "Người review",
				"colType": "string"
			},
			{
				"keycol": "roundView",
				"keyname": "Phạm vi",
				"coltype": "string"
			},
			{
				"keycol": "resultText",
				"keyname": "Hồ sơ",
				"colType": "string"
			},
			{
				"keycol": "pointview",
				"keyname": "Tổng điểm",
				"colType": "string"
			},
			{
				"keycol": "rankview",
				"keyname": "Xếp hạng",
				"colType": "string"
			},
			{
				"keycol": "conclusionText",
				"keyname": "Kết luận",
				"colType": "string"
			},
			{
				"keycol": "note",
				"keyname": "Ý kiến",
				"colType": "string"
			},
			{
				"keycol": "action",
				'colType': "template",
				"keyname": "Action",
				"template": "<a class = 'pr-3' data-ng-click='editor({id})' style='cursor:pointer'>" +
					"<i class='fas fa-pen'></i></a>" +
					"<a data-ng-click='delete({id})' style='cursor:pointer'>" +
					"<i class='fas fa-times'></i></a>"
			}
		]
		var table
		if (response.data.list.length == 0) {
			table = GridService.buildGridnon(columnInfo, response.data.list);
		} else {
			table = GridService.buildGrid(columnInfo, response.data.list);
		}
		$("#TableCandidate").html('');
		var tableHtml = $("#TableCandidate").html(table);
		dataGridListRole = response.data.list;
		$compile(tableHtml)($scope);

		$scope.isActivePagi = function(pagi) {
			return pagi === response.data.page.pageIdx;
		}
	}


	$scope.pagina = function(Numberpage) {
		page = Numberpage;
		loaddatagrid();
	}

	if (idPer > 0) { loaddatagrid(); } function loaddatagrid() {
		var datarequest =
		{

			"client": {
				"langCode": "vi"
			},
			"dummySearch": {



			}

		}

		WebService.call($http, "candireview/candireview03", datarequest, function(response) {

			loadgrid(response);
		}, "POST")
	}
	//end


	// user review dropdown
	var getDataDropDownUser = function() {
		//khai báo điều kiện để get dữ liệu lên Level
		var dataDropDownUser = {
			"client": fnGetClientInfo(),
			"dummySearch": {}
		}
		//gọi để hiển thị data lên drop Level
		WebService.call($http, "userreview/userreview03", dataDropDownUser, function(response) {

			var userDropdown = [];
			var data = response.data.list;
			if (data == 0) {
				console.log("không có dữ liệu candiate review");
			} else {
				console.log("OK dropdown user dropdown");
				for (x in data) {
					if (data[x].id) {
						userDropdown.push(data[x]);
					}
				}
				$scope.UserName = userDropdown;
				//$scope.selectUser = $scope.UserName[0].id +"";

			}
		}, "POST");
	};
	console.log("test user dropdown")
	getDataDropDownUser();
	//end
	// phạm vi review page
	var getDataDropDownAll2 = function() {
		//khai báo điều kiện để get dữ liệu lên Level
		var dataDropDownAll2 = {
			"client": fnGetClientInfo(),
			"dummySearch": {
				"idper": idPer
			}
		}
		//gọi để hiển thị data lên drop Level
		WebService.call($http, "candidatetest/candidatetest03", dataDropDownAll2, function(response) {

			var pviReview1 = [];
			var data = response.data.list;
			if (data == 0) {
				console.log("không có dữ liệu candiate review");
			} else {
				console.log("OK dropdown phạm vi review");
				for (x in data) {
					if (data[x].id) {
						pviReview1.push(data[x]);
					}
				}
				$scope.pviReview1 = pviReview1;
				//$scope.selectpviReview1 = $scope.pviReview1[0].id +"";

			}
		}, "POST");
	};
	getDataDropDownAll2();
	//end
	//search form
	$scope.search2 = function() {
		if (idPer == 0) {
		ModalService.alert({ "modalTitle": "Warning", "messenge": "Chưa có ID Hồ Sơ" }, function() { }, function() { })
	} else {
		var datasearchrequest =
		{

			"client": {
				"langCode": 'vi'
			},
			"dummySearch": {
				"idper": idPer,
				"useview": $scope.selectUser,
				"scopeview": $scope.selectpviReview1
			}
		}

		WebService.call($http, "candireview/candireview03", datasearchrequest, function(response) {
			loadgrid(response)
		}, "POST")
	}
	}
	//end
	// nút đặt lại form
	$scope.selectUser = "-1";
	$scope.selectpviReview1 = "-1";
	$scope.resetForm = function() {
		$scope.selectUser = $scope.UserName[-1].id;
		$scope.selectpviReview1 = $scope.pviReview1[-1].id;
	}
});

