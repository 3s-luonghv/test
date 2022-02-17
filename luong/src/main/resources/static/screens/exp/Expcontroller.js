app.controller("ExpController", function($http, $scope, $rootScope, WebService, GridService, ModalService, $compile) {
	$rootScope.titlePage = "HỒ SƠ ỨNG VIÊN | KINH NGHIỆM";
	Loadtablet();
	//get du lieu bang webservice
	function Loadtablet(){
		var datarequest = {

	}
	WebService.call($http, "exp/expitemsearch", datarequest, function(response) {
		console.log(response);
		var columnInfo = [
			{ "keycol": "id", "keyname": "STT", "colType": "int" },
			{ "keycol": "fromday", "keyname": "Từ", "colType": "date" },
			{ "keycol": "today", "keyname": "Đến", "colType": "date" },
			{ "keycol": "work_place", "keyname": "Nơi Đào tạo", "colType": "string" },
			{ "keycol": "organization_name", "keyname": "Tên tổ chức", "colType": "string" },
			{ "keycol": "type_of_work", "keyname": "Loại công việc", "colType": "string" },
			{ "keycol": "project_work_name", "keyname": "Tên Công việc", "colType": "string" },
			{ "keycol": "time", "keyname": "Thời gian", "colType": "string" },
			{ "keycol": "scale", "keyname": "Quy mô", "colType": "string" },
			{ "keycol": "summary_job_information", "keyname": "Tóm tắt", "colType": "string" },
			{ "keycol": "applied_technology_expertise", "keyname": "Chuyên môn", "colType": "string" },
			{ "keycol": "main_role", "keyname": "Vai trò chính", "colType": "string" },
			{ "keycol": "responsibility_work_achievement", "keyname": "Trách nhiệm", "colType": "string" },
			{
				"keycol": "action", 'colType': "template", "keyname": "Action", "template": "<a data-ng-click='update({id})' style='cursor:pointer'>" +
					"<i class='fas fa-pen'></i></a>" +
					"<a data-ng-click='delete({id})' style='cursor:pointer'>" +
					"<i class='fas fa-times'></i></a>"
			}
		]
		var table = GridService.buildGrid(columnInfo, response.data.searchexpResult.list)
		var tablehtml = $("#mygridtable1").html("").html(table);
		$compile(tablehtml)($scope);
		}, "POST");
	}
	
	//khi click delete thì database bị xóa hàng dử liệu hiện tai(id)
	var yesdel = function(){
		
	}
	$scope.delete = function(id) {
		console.log(id);
		var request = {
			"objectSource": {
				"id": id
			}
		}
		WebService.call($http, "exp/expdelete", request, function(response) {
			Loadtablet();
			console.log('aaa');
		}, "POST");
		ModalService.popup('Info','Bạn Đã Xóa thành công',function(response){},function(response){},true)
	}
	
	
	//khi click update thì database sẽ hiển thi lên modal
	var callback = function(response) {
		if (response.data.updateResult == true) {
			Loadtablet();
		}
	}
	$scope.update = function(id) {
		console.log(id);
		ModalService.modaltablet(id, "screens/Modal/Modaltable.html", "ModalDemoCtrl",callback);
	}
	
	//Gọi API để trả về dữ liệu cần sử dụng cho select nơi làm việc
	LoadWorkplace();
	function LoadWorkplace() {
		var sttWorkplace = {
			"searchCondiction": {
				"companyId": 1,
				"catalogId": 2,
				"locale": "vi"
			}
		}
		WebService.call($http, "catitem/catItemSearch", sttWorkplace, function(response) {
			$scope.Workplace = response.data.searchResult.list;
		}, "POST");
	}
	
	//hiển thị moldal select nơi làm việc
	$scope.btnOpenWorkplace = function() {
		ModalService.modalop('screens/Modal/modal.html', 'ModalDemoCtrl', 2, loadAddataWorkplaceSuccess);
	}
	
	//function để callback lại dữ liệu  nơi làm việc
	var loadAddataWorkplaceSuccess = function(response) {
		if (response.data.insertResult == true) {
			LoadWorkplace();
		}
	}
	
	//Gọi API để trả về dữ liệu cần sử dụng cho select loại công việc
	LoadTypeOfWork();
	function LoadTypeOfWork() {
		var sttTypeOfWork = {
			"searchCondiction": {
				"companyId": 1,
				"catalogId": 3,
				"locale": "vi"
			}
		}
		WebService.call($http, "catitem/catItemSearch", sttTypeOfWork, function(response) {
			$scope.TypeOfWork = response.data.searchResult.list;
		}, "POST");
	}
	
	//hiển thị moldal select loại công việc
	$scope.btnOpenTypeOfWork = function() {
		ModalService.modalop('screens/Modal/modal.html', 'ModalDemoCtrl', 3, loadAddataTypeOfWorkSuccess);
	}
	
	//function để callback lại dữ liệu  loại công việc
	var loadAddataTypeOfWorkSuccess = function(response) {
		if (response.data.insertResult == true) {
			LoadTypeOfWork();
		}
	}
	
	//Gọi API để trả về dữ liệu cần sử dụng cho select vai trò chính
	LoadMainRole();
	function LoadMainRole() {
		var sttMainRole = {
			"searchCondiction": {
				"companyId": 1,
				"catalogId": 4,
				"locale": "vi"
			}
		}
		WebService.call($http, "catitem/catItemSearch", sttMainRole, function(response) {
			$scope.MainRole = response.data.searchResult.list;
		}, "POST");
	}
	
	//hiển thị moldal select vai trò chính
	$scope.btnOpenMainRole = function() {
		ModalService.modalop('screens/Modal/modal.html', 'ModalDemoCtrl', 4, loadAddataMainRoleSuccess);
	}
	
	//function để callback lại dữ liệu vai trò chính
	var loadAddataMainRoleSuccess = function(response) {
		if (response.data.insertResult == true) {
			LoadMainRole();
		}
	}
	
	//save toàn bộ dữ liệu được nhập trên trang vào table
	$scope.saveExptable = function() {
		if ($scope.selectWorkplace == null || $scope.selectTypeOfWork == null || $scope.selectMainRole == null) {
			console.log("faild")
			ModalService.popup('Error','Bạn chưa chọn select vui lòng chọn ',function(response){},function(response){},true)
		} else {
			console.log('Đã lưu thành công');
			var insertexptable = {
				"client": fnGetClientInfo(),
				"objectSource": {
					"fromday": $scope.fromdate,
					"today": $scope.todate,
					"work_place": $scope.selectWorkplace,
					"organization_name": $scope.organizationname,
					"type_of_work": $scope.selectTypeOfWork,
					"project_work_name": $scope.projectworkname,
					"time": $scope.time,
					"scale": $scope.scale,
					"summary_job_information": $scope.summaryjobinformation,
					"applied_technology_expertise": $scope.appliedtechnologyexpertise,
					"main_role": $scope.selectMainRole,
					"responsibility_work_achievement": $scope.responsibilityworkachievement
				}
			}
			WebService.call($http, "exp/insertexptable", insertexptable, function(response) {
				Loadtablet();
			}, "POST");
			ModalService.popup("Info", 'Thêm thành công ! .',function(response){},function(response){},true);
		}

	}
})