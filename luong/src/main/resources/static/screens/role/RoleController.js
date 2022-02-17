app.controller("RoleCtrl", function($http, $timeout, $scope, $compile, ModalService, $rootScope, WebService, GridService) {
	$rootScope.titlePage = "HỆ THỐNG | VAI TRÒ";
	$scope.StatusGroupList = 1 + "";
	//tạo  Arraylist của gridrole
	var dataGridListRole = [];
	//$scope.limitValue = '5';
	var url = "screens/modal/modalrole.html" // khai báo đường dẫn của form modal
	//fnc active tab vai trò
	tabsInfoDefault();
	function tabsInfoDefault() {
		$scope.showRole = "active";
	}
	$scope.clickTab = function(tabName) {
		if (tabName == "role") {
			tabsInfoDefault();
		}
	}
	//gửi request từ api searchrole_dummy và ứng với từng trường để search thông tin mong muốn
	function gridRequest(pageIndex) {
		var request = {
			"client": {
				"langCode": $scope.languageGroup
			},
			"dummySearch": {
				"displayText": $scope.rolename,
				"useFlag": $scope.StatusGroupList
			},"page":{
					"limit": $scope.limitValue,
					"pageIdx": pageIndex
				}
		}
		return request;
	}
	//gửi request từ api searchrole_dummy và để rỗng để hiển thị toàn bị bảng
	function gridRequestDefault(pageIndex) {
		var request = {
			"client":{
				"langCode": fnGetClientInfo().langCode
			}
			, "dummySearch": {
				"displayText": "",
				"useFlag": $scope.StatusGroupList
			},"page":{
					"limit": $scope.limitValue,
					"pageIdx": pageIndex
				}
		}
		return request;
	}
	$timeout(function() {
		fnInit();
	});

	function fnInit() {
		fnGetData();
	}
	function fnGetData() {
		getdropdown();
		Loadrole(gridRequestDefault());
	}
	//////getdropdown trang vai trò 
	getdropdown();
	function getdropdown() {
		//khai báo điều kiện để get dữ liệu select
		var datadropdown = {
			"client": {
				"langCode": fnGetClientInfo().langCode
			}
		}
		//gọi để hiển thị data lên dropdown
		WebService.call($http, "useflag/usl03", datadropdown, function(response) {
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
	//----------------------------------------------------------//
	//phần TABLE
	function Loadrole(request) {
		WebService.call($http, "role/rol03", request, function(response) {
			var columnInfo = [
				{"keycol": "action",'colType': "checkbox", 
				"keyname": "<div class='form-check text-center'><input class='form-check-input' type='checkbox' data-ng-change='allcheckboxRole()' data-ng-model='ischeckRoleAll'><label class='form-check-label'></label></div>",
				"template": "<div class='form-check text-center'><input  class='form-check-input' type='checkbox' data-ng-click ='clickRole({})' ng-model='checkboxRole{}'><label class='form-check-label'></label></div>"
				},
				{ "keycol": "STT", "keyname": "{{role12}}", "colType": "STT" },
				{ "keycol": "displayText", "keyname": "{{role4}}", "colType": "string" },
				{ "keycol": "code", "keyname": "{{role13}}", "colType": "string" },
				{ "keycol": "displayTextLang", "keyname": "{{role5}}", "colType": "string" },
				{ "keycol": "Status", "keyname": "{{role6}}", "colType": "string" },
				{"keycol": "action", 'colType': "checkbox", "keyname": "{{role13}}", "template": "<a href data-ng-click='roleUpdate({})'>" + "<i class='fa fa-edit'></i></a>" + "<i class='mx-1'></i> " + "<a href data-ng-click='deleteRole({})'>" + "<i class='far fa-trash-alt'></i></a>"}
			]
		var tablehtml = "";
		if(response.data.list.length == 0){
				var table = "Chưa nhập dữ liệu. Vui lòng nhập dữ liệu.";
				tableHtml = $("#gridRoles").html(table);
				$("#paginationRole").html('')
		}else{
				//console.log(response);
			var table = GridService.buildGrid(columnInfo, response.data.list)
			tablehtml = $("#gridRoles").html("").html(table);
			var pagi = GridService.buildpagination(response.data);
			var pagiHtml = $("#paginationRole").html(pagi);
			$compile(pagiHtml)($scope);
			}
			
			$scope.isActivePagi = function(pagi) {

				return pagi === response.data.page.pageIdx;
			}
			$compile(tablehtml)($scope);
			//cheats gia tri checkbox = false
			for (var row = 1; row <= response.data.list.length; row++) {
				//console.log(response.data.list);
				$scope["checkboxRole" + row] = false;
				response.data.list[row - 1]["isCheck"] = false; //tạo mảng "isCheck" vào mảng được sinh ra
			}
			dataGridListRole = response.data.list;
		}, "POST");

	}
	//Tạo Arraylist và so sánh với Arraylist role (checkboxallRole)
	var storeCheckedRow = {};  // khai báo 1 object rỗng để sử dụng
	//nút checkboxall all
	$scope.allcheckboxRole = function() {
		storeCheckedRow = {};
		if ($scope.ischeckRoleAll == true) {
			for (var row = 1; row <= dataGridListRole.length; row ++) {
				$scope["checkboxRole" + row] = true;
				dataGridListRole[row - 1]["isCheck"] = true;
				storeCheckedRow[row - 1] = true;
			}
		} else {
			for (var row = 1; row <= dataGridListRole.length; row ++) {
				$scope["checkboxRole" + row] = false;
				dataGridListRole[row - 1]["isCheck"] = false;
			}
		}
		fnUpdCheckAll();
	};
	//nút click checkbox của bảng role
	$scope.clickRole = function(id) {
		dataGridListRole[id - 1]["isCheck"] = $scope["checkboxRole" + id];
		if ($scope["checkboxRole" + id]) {
			storeCheckedRow[idx - 1] = true;
		} else {
			delete storeCheckedRow[id - 1];
		}
		fnUpdCheckAll();
		//console.log("ok"+id);
	}

	//function check so sánh giữa Arraylist storeCheckedRow và Arraylist role
	function fnUpdCheckAll() {
		var objectKey = Object.keys(storeCheckedRow);
		if (objectKey.length == dataGridListRole.length) {
			$scope.ischeckRoleAll = true;
		} else {
			$scope.ischeckRoleAll = false;
		}
	}
	
	//----------------------------------------------------------//
	//phần SEARCH
	//nút lọc,tìm để search dữ liệu theo kiểu searchdummy_role trong database
	$scope.searchFilter = function() {
		Loadrole(gridRequest());
	}
	//nút clear form search trang vai trò
	$scope.clearFilter = function() {
		$scope.languageGroup = "",
		$scope.StatusGroupList = -1 + "",
		$scope.rolename = ""
	}
	//----------------------------------------------------------//
	//phần TƯƠNG TÁC TRONG TRANG VAI TRÒ
	//// nút thêm mới thông tin danh sách vai trò
	$scope.btnaddRole = function() {
		ModalService.ShowModal(url, "ModalRoleCtrl", "title", "", function(response) {
			Loadrole(gridRequest());
		});
	}
	
	///nút cập nhật thông tin danh sách vai trò
	$scope.roleUpdate = function(idx) {
		ModalService.ShowModal(url, "ModalRoleCtrl", "title", dataGridListRole[idx - 1], function(response) {
			Loadrole(gridRequest());
		});
	}
	//nút xóa vai trò khi checkbox vào vai trò 
	$scope.btndeleteRole = function() {
		ModalService.alert({ 'modalTitle': 'Question', 'messenge': 'Bạn có chắc muốn xoá vai trò đã chọn?' }, function() {
			var listDeleteCheckbox = new Array();
			for (var row = 1; row <= dataGridListRole.length; row++) {
				if (dataGridListRole[row - 1].isCheck == true) {
					dataGridListRole[row - 1].useFlag = 3; // xoá chuyển useFlag = 3
					listDeleteCheckbox.push(dataGridListRole[row - 1])
				}
			}
			if (listDeleteCheckbox.length <= 0) {
				ModalService.alert({ 'modalTitle': 'Warning', 'messenge': 'Vui lòng chọn vai trò cần xóa?' }, function() { }, function() { }, true)
			} else {
				//console.log(listDeleteCheckbox);
				var request = { "dtoList": listDeleteCheckbox }
				WebService.call($http, "role/rol07", request, function(response) {
					if (response.data.isDone == true) {
						ModalService.alert({ 'modalTitle': 'Success', 'messenge': 'Xóa thành công' }, function() { }, function() { });
						Loadrole(gridRequest());
						$scope.ischeckRoleAll = false;
					} else {
						ModalService.alert({ 'modalTitle': 'Error', 'messenge': 'Xóa thất bại' }, function() { }, function() { });
					}

				}, "POST")
			}
		}, function() { });

	}
	//nút xóa trong bảng danh sách vai trò
	$scope.deleteRole = function(idx) {
		ModalService.alert({
			'modalTitle': 'Question',
			'messenge': 'Bạn có chắc chắn muốn xóa'
		}, function() {
			dataGridListRole[idx - 1].useFlag = 3;
			var datarequestdelete = {
				"client": {
					"langCode": dataGridListRole[idx - 1].langCode
				},"dto": dataGridListRole[idx - 1],
			}
			WebService.call($http, 'role/rol05', datarequestdelete, function(response) {
				if (response.data.isDone == true) {
					ModalService.alert({ 'modalTitle': 'Success', 'messenge': 'Xóa thành công' }, function() {
						Loadrole(gridRequest());
					}, function() { }, true);
				} else if (response.data.isDone == false) {
					ModalService.alert({ 'modalTitle': 'Error', 'messenge': 'Xóa thất bại' }, function() {
					}, function() { }, true);
				}
			}, "POST")
		}, function() { }, false);
	}
	//----------------------------------------------------------//
	//phần PAGINATION
	//khai báo lại request chạy bảng để đưa vào change paniga
	$scope.pagina = function(page) {	
		Loadrole(gridRequest(page));			
	}
	
	$scope.changeValuelimit = function ()
	{
		Loadrole(gridRequest(1));
	}
	$scope.fnSearch = function (){
		Loadrole(gridRequest(1));
	}
	//----------------------------------------------------------//
	// gọi API thể hiện Đa ngôn ngữ trên màn hình
	loadMultiLang();
	function loadMultiLang() {
		var dataMultiLang = {
			"client": {
				"langCode": fnGetClientInfo().langCode
			},
			"dummySearch": {
				"screensId": 3
			}
		}
		WebService.call($http, "screensitem/screensitem03", dataMultiLang, function(response) {
			//console.log(response);
			var db = response.data.list;
			dbMultiLang = db;
			$rootScope.titlePage = db[0].displayText;
			for (x in db) {
				$scope[db[x].code] = db[x].displayText
				//console.log(db[x].code)
			}
		}, "POST");
	}
})