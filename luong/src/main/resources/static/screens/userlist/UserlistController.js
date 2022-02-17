app.controller("UserlistCtrl", function($http, $timeout,$scope, $compile, ModalService, $rootScope, WebService, GridService) {
	$rootScope.titlePage = "HỆ THỐNG | DANH SÁCH NGƯỜI SỬ DỤNG" ;
	$scope.StatusGroupList = 1 + "";
	//tạo  Arraylist của danh sách người dùng
	var dataGridListUser = [];
	//fnc active tab danh sách người dùng
	tabsUselistDefault();
	function tabsUselistDefault() {
		$scope.showUserlist = "active";
	}
	$scope.clickTab = function(tabName) {
		if (tabName == "userlist") {
			tabsUselistDefault();
		}
	}

	function gridRequest() {
		var request = {
				"client" :fnGetClientInfo(),
				"dummySearch":{
					"userName" : $scope.usename,
					"useFlag" : $scope.StatusGroupList,
					"email" : $scope.email
				}
			}
		return request;
	}
	function gridRequestDefault() {
		var request = {
				"client" : {
				"langCode": fnGetClientInfo().langCode
				},"dummySearch":{
					"userName" : "",
					"useFlag": $scope.StatusGroupList,
					"email" : ""
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
		Loadtable(gridRequestDefault());
	}

	//////getdropdown trang danh sách người dùng
	getdropdown();
	function getdropdown(){
		//khai báo điều kiện để get dữ liệu select
		var datadropdown = {
			"client": {
				"langCode": fnGetClientInfo().langCode
			}
		}
		//gọi request để hiển thị data lên dropdown
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
	}
	//fnc hiển thị bảng danh sách người dùng 
	function Loadtable(request) {
		WebService.call($http, "user/user002", request, function(response){
			var columnInfo = [
				{"keycol": "action",
				'colType': "checkbox", "keyname":"<div class='form-check text-center'><input class='form-check-input' type='checkbox' data-ng-change='allcheckboxUseList()' data-ng-model='ischeckUseListAll'><label class='form-check-label'></label></div>",
				"template": "<div class='form-check text-center'><input  class='form-check-input' type='checkbox' data-ng-click ='clickUseList({})' data-ng-model='checkboxUseList{}'><label class='form-check-label'></label></div>"
				},
				{ "keycol": "STT", "keyname": "{{userlist12}}", "colType": "STT" },
				{ "keycol": "userName", "keyname": "{{userlist4}}", "colType": "string" },
				{ "keycol": "email", "keyname": "{{userlist5}}","colType": "string" },
				{ "keycol": "delnamerole", "keyname": "{{userlist13}}", "colType": "string" },
				{ "keycol": "useflaglang", "keyname": "{{userlist6}}", "colType": "string" },
				{"keycol": "action", 'colType': "template", "keyname": "{{userlist14}}", "template": "<a href data-ng-click='Updateuserlist({id})'>" + "<i class='fa fa-edit'></i></a>" + "<i class='mx-1'></i> " + "<a href data-ng-click='deleteuserlist({id})'>" + "<i class='far fa-trash-alt'></i></a>"}
			]
			var tablehtml = "";
			if(response.data.list.length == 0){
				var table = "Chưa nhập dữ liệu. Vui lòng nhập dữ liệu.";
				tableHtml = $("#gridUseLists").html(table);
		}else{
			
			//console.log(response.data.list);
			// Concat list role
			var newList = [];
			var userCheck = {};
			for(var i = 0; i < response.data.list.length; i++){
				
				var row = response.data.list[i];
				if (row.useFlagrole == 3) {
					row["delnamerole"] = row.namerole + " (Vai trò đã bị xóa)";
				} else {
					row["delnamerole"] = row.namerole
				}
				if(row.id in userCheck){
					if(newList[userCheck[row["id"]]] != undefined){
						newList[userCheck[row["id"]]]["namerole"] += (", " + row.namerole);
						newList[userCheck[row["id"]]]["delnamerole"] += (", " + row.delnamerole);
					}else{
						newList[userCheck[row["id"]]]["namerole"] += "";
						newList[userCheck[row["id"]]]["delnamerole"] += "";
					}
					
				}else{
					userCheck[row.id] = i;
					newList.push(row);
				}
				
			}
			var table = GridService.buildGrid(columnInfo,newList)
			var tablehtml = $("#gridUseLists").html("").html(table);
		}
			$compile(tablehtml)($scope);
			for (var row = 1 ;row <= newList.length;row ++){
				//console.log(response.data.list);
				$scope["checkboxRole" + row] = false; //cheats gia tri checkbox = false
				newList[row - 1]["isCheck"] = false; //tạo mảng "isCheck" vào mảng được sinh ra
			}
			dataGridListUser = newList;
		},"POST");
		
	}
	//Tạo Arraylist và so sánh với Arraylist role (checkboxallRole)
	var storeCheckedRow = {};
	//nút checkboxall all
	$scope.allcheckboxUseList = function(){
		storeCheckedRow = {};
		if($scope.ischeckUseListAll == true){
			for (var row = 1 ;row <= dataGridListUser.length;row ++){
				$scope["checkboxUseList" + row] = true;
				dataGridListUser[row - 1]["isCheck"] = true;
				storeCheckedRow[row - 1] = true;
			}
		}else {
			for (var row = 1 ;row <= dataGridListUser.length;row ++){
				$scope["checkboxUseList" + row] = false;
				dataGridListUser[row - 1]["isCheck"] = false;
			}
		}
		fnUpdCheckAll();
		//console.log(dataGridListRole);
	};
	
	//nút click checkbox của bảng role
	$scope.clickUseList= function (id){
		dataGridListUser[id - 1]["isCheck"] = $scope["checkboxUseList" + id];
		if($scope["checkboxUseList" + id]){
			storeCheckedRow[id - 1] = true;
		}else{
			delete storeCheckedRow[id - 1];
		}
		//console.log(storeCheckedRow);
		fnUpdCheckAll();
		//console.log("ok"+id);
	}
	
	//function check so sánh giữa Arraylist storeCheckedRow và Arraylist role
	function fnUpdCheckAll(){
		var objectKey = Object.keys(storeCheckedRow);
		if(objectKey.length == dataGridListUser.length ){
			$scope.ischeckUseListAll = true;
		}else {
			$scope.ischeckUseListAll = false;
		}
	}	
	//nút lọc,tìm để search dữ liệu theo kiểu searchdummy_role trong database
	$scope.searchFilter = function(){
		Loadtable(gridRequest());
	}
	//nút clear form search trang vai trò
	$scope.clearFilter = function(){
		$scope.email = "",
		$scope.StatusGroupList = -1 + "",
		$scope.usename = ""
	}
	//// nút thêm mới người dùng 
	$scope.btnaddUserList = function(){
		ModalService.ShowModal("screens/modal/modaluserlist.html","ModaluselistCtrl","Title","",function(response) {
			Loadtable(gridRequest());
		});
	}
	// nút chỉnh sửa thông tin trong bảng danh sách người dùng
	$scope.Updateuserlist = function(id){
		ModalService.ShowModal('screens/modal/modaluserlist.html', 'ModaluselistCtrl','Title',id,function(response) {
			Loadtable(gridRequest());
		});
	}
	//nút xóa trên giao diện danh sách người dùng khi check vào người dùng muốn xóa
	$scope.btndeleteUserList = function(){
		ModalService.alert({ 'modalTitle': 'Question', 'messenge': 'Bạn có chắc muốn xoá người dùng đã chọn?' }, function() {
			var listDeleteUserCheckbox = [];
			for (var row = 1 ;row <= dataGridListUser.length;row++ ){
				if(dataGridListUser[row - 1].isCheck == true){
					dataGridListUser[row - 1].useFlag = 3 // xoá chuyển useFlag = 3
					listDeleteUserCheckbox.push(dataGridListUser[row - 1])
				}
			}
			if(listDeleteUserCheckbox.length <= 0){
				ModalService.alert({ 'modalTitle': 'Warning', 'messenge': 'Vui lòng chọn vai trò cần xóa?' }, function() { }, function() { }, true)
			}else{
				var request = { "dtoList": listDeleteUserCheckbox }
				WebService.call($http, "user/user006", request, function(response) {
					if (response.data.isDone == true) {
						ModalService.alert({ 'modalTitle': 'Success', 'messenge': 'Xóa thành công' }, function() { }, function() { });
						Loadtable(gridRequest());
						$scope.ischeckUseListAll = false;
						for(x in dataGridListUser){
							$scope["checkboxUseList"+ (parseInt(x)+1)] = false;
						}
					} else {
						ModalService.alert({ 'modalTitle': 'Error', 'messenge': 'Xóa thất bại' }, function() { }, function() { });
					}

				}, "POST")
				
			}
		},function() { });
		
	}
	//nút xóa người dùng trong bảng danh sách người dùng
	$scope.deleteuserlist = function(id){
		ModalService.alert({
			'modalTitle': 'Question',
			'messenge': 'Bạn có chắc chắn muốn xóa'
		}, function() {
			var datarequestdelete = {"listId" :[id]}
			WebService.call($http, 'user/user007', datarequestdelete, function(response) {
				if (response.data.isDone == true) {
					ModalService.alert({ 'modalTitle': 'Success', 'messenge': 'Bạn đã xóa thành công' }, function() {
						Loadtable(gridRequest());
					}, function() { }, true);
				} else if (response.data.isDone == false) {
					ModalService.alert({ 'modalTitle': 'Error', 'messenge': 'Xóa thất bại' }, function() {
					}, function() { }, true);
				}
			}, "POST")
		}, function() { }, false);
	}
	
	//----------------------------------------------------------//
	// gọi API thể hiện Đa ngôn ngữ trên màn hình
	loadMultiLang();
	function loadMultiLang() {
		var dataMultiLang = {
			"client":{
				"langCode": fnGetClientInfo().langCode
			},
			"dummySearch": {
				"screensId": 4
			}
		}
		WebService.call($http, "screensitem/screensitem03", dataMultiLang, function(response) {
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