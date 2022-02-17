app.controller('DecentralizationCtrl', function($rootScope, $scope, $http, $timeout, $compile, WebService, GridService, ModalService, ValidateUltility) {
	$timeout(function() {
	})
	$rootScope.showAside = "";
	$rootScope.showNav = true;
	$rootScope.showHead = true;
	$rootScope.titlePage = "Hệ thống --> Phân quyền vai trò"
	var dataGridListSystem = [];
	var changeDataRole = new Array;
	var idTable = [];//
	//----------------------------------------------------------------------------//
	fnInit();
	function fnInit() {
		getDataDrop(dataRequest());
		loadDataTable(dataAgain());
	}
	//khai báo request để gọi 
	function dataRequest() {
		var datarequest = {
			"client": {
				"langCode": fnGetClientInfo().langCode
			}
		}
		return datarequest;
	}

	//gọi API lấy data gửi lên DROP vai trò
	function getDataDrop(datarequest) {
		WebService.call($http, "role/rol03", datarequest, function(response) {
			var role = new Array;
			var dataRole = response.data.list;
			if (dataRole == 0) {
				console.log("Không có dữ liệu");
			} else {
				for (x in dataRole) {
					role.push(dataRole[x])
				}
			}
			$scope.RoleList = role;
		}, "POST");
	}

	changeRoleDecen();
	function changeRoleDecen() {
		// thay đổi Role thì bảng thay đổi theo
		$scope.changeRole = function() {
			$scope.messagerole = ""
			for (x in dataGridListSystem) {// vòng lặp để khi change role thì clear các nút tích về chưa tích rồi chạy cái dưới
				$scope["checkboxRole" + x] = false
				dataGridListSystem[x]["isCheck"] = false;
			}
			/*
			* khai báo request để gọi bảng functionrole để so sánh id bảng function với functionId bàng functionrole
			* chạy vòng for x trong data bảng function với y trong data bảng functionrole
			* nếu id bảng function = functionId bảng functionrole thì tích = true
			*/
			var datarequest = {
				"client": {
					"langCode": ""
				},
				"dummySearch": {
					"roleId": $scope.selectRole
				}
			}
			WebService.call($http, "funcrole/furol02", datarequest, function(response) {
				changeDataRole = response.data.list;
				for (x in dataGridListSystem) {
					for (y in changeDataRole) {
						if (dataGridListSystem[x].id == changeDataRole[y].functionId) {
							$scope["checkboxRole" + (parseInt(x) + 1)] = true //phải là x + 1 vì vòng lặp chạy từ 0
							dataGridListSystem[x]["isCheck"] = true;
						}
					}
				}
			}, "POST");
		}
	}

	// khai báo data search để sử dụng nhiều lần
	function dataAgain() {
		var datarequest = {
			"client": {
				"langCode": fnGetClientInfo().langCode
			},
			"dummySearch": {

			}
		}
		return datarequest;
	}
	//viết fn gọi API lấy data vào
	function loadDataTable(datarequest) {
		WebService.call($http, "system/sys03", datarequest, function(response) {
			var listmenu = response.data.list;
			$scope.dropicon = response.data.list
			$scope.url = response.data.list
			var treeall = [];
			var columnInfo = [
				{
					"keycol": "action",
					'colType': "idx",
					"keyname": "<div class='form-check'><input class='form-check-input' type='checkbox' data-ng-change='checkboxRoleAll()' ng-model='ischeckRoleAll'><label class='form-check-label'></label></div>",
					"template": "<div class='form-check'><input class='form-check-input' type='checkbox' ng-model='checkboxRole{}' data-ng-click='clickRole({})'><label class='form-check-label'></label></div>"
				},
				{ "keycol": "STT", "keyname": "{{strName4}}", "colType": "STT" },
				{
					"keycol": "displayText",
					"keyname": "{{strName3}}",
					"colType": "link",
					"template": "<a class='nav-link p-0' style='line-height: 15px display: inline-flex !important'>"
				},
				{ "keycol": "functionalClassification", "keyname": "{{strName5}}", "colType": "string" },
			]
			if (listmenu.length == 0) {
				var table = GridService.buildGridnon(columnInfo, treeall)
				var tablehtml = $("#myGridTable").html("").html(table);
				$compile(tablehtml)($scope);
			} else {
				for (x in listmenu) {
					if (listmenu[x].parentId == -1) {
						listmenu[x]["level"] = "0"
						treeall.push(listmenu[x])
						for (y in listmenu) {
							if (listmenu[y].parentId == listmenu[x].id) {
								listmenu[y]["level"] = "1"
								treeall.push(listmenu[y])
								for (z in listmenu) {
									if (listmenu[z].parentId == listmenu[y].id) {
										listmenu[z]["level"] = "2"
										treeall.push(listmenu[z])
										for (v in listmenu) {
											if (listmenu[v].parentId == listmenu[z].id) {
												listmenu[v]["level"] = "3"
												treeall.push(listmenu[v])
											}

										}
									}
								}
							}
						}
					}
				}

				$scope.isActivePagi = function(pagi) {
					return pagi === response.data.page.pageIdx + "";
				}
				//khai báo lấy dữ liệu từ database ra gắn vô bảng vủa tạo
				var table = GridService.buildGridTable(columnInfo, treeall)
				var tablehtml = $("#myGridTable").html("").html(table);
				$compile(tablehtml)($scope);
				// xét giá trị checkbox = false
				for (var row = 1; row <= response.data.list.length; row++) {
					$scope["checkboxRole" + row] = false;
					response.data.list[row - 1]["isCheck"] = false;
				}
				dataGridListDecentralization = response.data.list;
				dataGridListSystem = treeall; //dataGridListRole được khai báo toàn cục ở trên
				for (i in dataGridListSystem) {
					$scope["row" + dataGridListSystem[i].id] = true;
					$scope["icon" + dataGridListSystem[i].id] = "fa-angle-right"
				}
				$scope.menutable = function(id) {
					//console.log(id)
					if ($scope["icon" + id] == "fa-angle-right") {
						$scope["icon" + id] = "fa-angle-down"
						for (x in dataGridListSystem) {
							if (dataGridListSystem[x].parentId == id) {
								$scope["row" + dataGridListSystem[x].id] = "";
								for (y in dataGridListSystem) {
									if (dataGridListSystem[y].parentId == dataGridListSystem[x].id) {
										$scope["row" + dataGridListSystem[y].id] = "";
										for (z in dataGridListSystem) {
											if (dataGridListSystem[z].parentId == dataGridListSystem[y].id) {
												$scope["row" + dataGridListSystem[z].id] = "";
											}
										}
									}
								}
							}
						}
					} else if ($scope["icon" + id] == "fa-angle-down") {
						$scope["icon" + id] = "fa-angle-right"
						for (x in dataGridListSystem) {
							if (dataGridListSystem[x].parentId == id)
								$scope["row" + dataGridListSystem[x].id] = true;
							for (y in dataGridListSystem) {
								if (dataGridListSystem[y].parentId == dataGridListSystem[x].id) {
									$scope["row" + dataGridListSystem[y].id] = true
									for (z in dataGridListSystem) {
										if (dataGridListSystem[z].parentId == dataGridListSystem[y].id) {
											$scope["row" + dataGridListSystem[z].id] = true
										}
									}
								}
							}
						}
					}
				}
			}

		}, "POST");
	}
	//////Đoạn này làm cho phần checkbox ở bảng
	var storeCheckedRow = {}; // khai báo 1 cái object rỗng để sử dụng
	//khai báo function cho nút checkbox all
	$scope.checkboxRoleAll = function() {
		storeCheckedRow = {};
		if ($scope.ischeckRoleAll == true) {
			for (var row = 1; row <= dataGridListSystem.length; row++) {
				$scope["checkboxRole" + row] = true;
				dataGridListSystem[row - 1]["isCheck"] = true;
				storeCheckedRow[row - 1] = true;
			}
		} else {
			for (var row = 1; row <= dataGridListSystem.length; row++) {
				$scope["checkboxRole" + row] = false;
				dataGridListSystem[row - 1]["isCheck"] = false;
			}
		}
		fnUpdCheckAll();
	}
	// khai báo function cho nút checkbox alone
	$scope.clickRole = function(id) {
		dataGridListSystem[id - 1]["isCheck"] = $scope["checkboxRole" + id];
		if ($scope["checkboxRole" + id]) {
			/*
			* Tạo vòng lặp for để click vào thằng cha thì hiển thị thằng con
			*/
			for (x in dataGridListSystem) {
				if (dataGridListSystem[x].id == dataGridListSystem[id - 1].parentId) {
					$scope["checkboxRole" + (parseInt(x) + 1)] = true
					dataGridListSystem[x]["isCheck"] = true
					for (y in dataGridListSystem) {
						if (dataGridListSystem[y].id == dataGridListSystem[x].parentId) {
							$scope["checkboxRole" + (parseInt(y) + 1)] = true
							dataGridListSystem[y]["isCheck"] = true
							for (z in dataGridListSystem) {
								if (dataGridListSystem[z].id == dataGridListSystem[y].parentId) {
									$scope["checkboxRole" + (parseInt(z) + 1)] = true
									dataGridListSystem[z]["isCheck"] = true
								}
							}
						}
					}
				}
			}
			for (x in dataGridListSystem) {
				if (dataGridListSystem[x].parentId == dataGridListSystem[id - 1].id) { // nếu parentId của thằng con = id của thằng cha
					$scope["checkboxRole" + (parseInt(x) + 1)] = true
					dataGridListSystem[x]["isCheck"] = true
					for (y in dataGridListSystem) {
						if (dataGridListSystem[y].parentId == dataGridListSystem[x].id) {
							$scope["checkboxRole" + (parseInt(y) + 1)] = true
							dataGridListSystem[y]["isCheck"] = true
							for (z in dataGridListSystem) {
								if (dataGridListSystem[z].parentId == dataGridListSystem[y].id) {
									$scope["checkboxRole" + (parseInt(z) + 1)] = true
									dataGridListSystem[z]["isCheck"] = true
								}
							}
						}
					}
				}
			}
			storeCheckedRow[id - 1] = true;
		} else {
			delete storeCheckedRow[id - 1];
			/*
			* Tạo vòng lặp for để click vào thằng cha thì tắt luôn thằng con
			*/

			for (x in dataGridListSystem) {
				if (dataGridListSystem[x].parentId == dataGridListSystem[id - 1].id) {
					$scope["checkboxRole" + (parseInt(x) + 1)] = false
					dataGridListSystem[x]["isCheck"] = false
					for (y in dataGridListSystem) {
						if (dataGridListSystem[y].parentId == dataGridListSystem[x].id) {
							$scope["checkboxRole" + (parseInt(y) + 1)] = false
							dataGridListSystem[y]["isCheck"] = false
							for (z in dataGridListSystem) {
								if (dataGridListSystem[z].parentId == dataGridListSystem[y].id) {
									$scope["checkboxRole" + (parseInt(z) + 1)] = false
									dataGridListSystem[z]["isCheck"] = false
								}
							}
						}
					}
				}
			}
		}
		fnUpdCheckAll();
	}
	//viết function fnUpdCheckAll để đưa lên 2 cái check ở trên
	function fnUpdCheckAll() {
		var objectKey = Object.keys(storeCheckedRow);
		if (objectKey.length == dataGridListSystem.length) {
			$scope.ischeckRoleAll = true;
		} else {
			$scope.ischeckRoleAll = false;
		}
	}
	//////kết thúc.
	function ListDecentralizationChecked() {
		var idListDecentralization = [];
		for (var row = 1; row <= dataGridListDecentralization.length; row++) {
			if (dataGridListDecentralization[row - 1].isCheck == true) {
				idListDecentralization.push(dataGridListDecentralization[row - 1].id)
			}
		}
		return idListDecentralization;
	}
	function getdataListId() {
		var requestList = new Array();
		var listId = ListDecentralizationChecked();
		for (x in listId) {
			var request = {
				"roleId": $scope.selectRole,
				"functionId": listId[x]
			}
			requestList.push(request);
		}
		return requestList;
	}
	//Nút phân quyền
	$scope.btnDecentralization = function() {
		if (ValidateUltility.checkEmpty($scope.selectRole)) {
			$scope.messagerole = "vui lòng chọn vai trò"
		} else {
			
			if (ListDecentralizationChecked().length == 0) {
				ModalService.alert({ "modalTitle": "Warning", "messenge": "Bạn chưa chọn dữ liệu để phân quyền" }, function() { }, function() { })
			} else {
				if (!ValidateUltility.checkEmpty(changeDataRole)) {
					var datarequest = {
						"client": {
							"langCode": fnGetClientInfo().langCode
						},
						"dtoList": getdataListId()
					}
					var datarequestDel = {
						"client": {
							"langCode": fnGetClientInfo().langCode
						},
						"listId": [$scope.selectRole] // đây là listroleId nhưng do code a Long không sửa được
					}
					WebService.call($http, "funcrole/furol07", datarequestDel, function(response) {
						if (response.data.isDone == true) {// nếu có ô bắt buộc chưa nhập thì báo lỗi không thì chạy tiếp
							WebService.call($http, "funcrole/furol06", datarequest, function(response) {
								if (response.data.isDone == true) {// nếu có ô bắt buộc chưa nhập thì báo lỗi không thì chạy tiếp
									ModalService.alert({ "modalTitle": "Success", "messenge": "Phân quyền thành công" }, function() { }, function() { })
									changeDataRole = response.data.list
									changeRoleDecen();
								} else {
									ModalService.alert({ "modalTitle": "Error", "messenge": "Phân quyền thất bại" }, function() { }, function() { })
								}
							}, "POST");
						} else {
							ModalService.alert({ "modalTitle": "Error", "messenge": "Phân quyền thất bại" }, function() { }, function() { })
						}

					}, "POST");
				} else {
					var datarequest = {
						"client": {
							"langCode": fnGetClientInfo().langCode
						},
						"dtoList": getdataListId()
					}
					WebService.call($http, "funcrole/furol06", datarequest, function(response) {
						if (response.data.isDone == true) {// nếu có ô bắt buộc chưa nhập thì báo lỗi không thì chạy tiếp
							ModalService.alert({ "modalTitle": "Success", "messenge": "Phân quyền thành công" }, function() { }, function() { })
							changeDataRole = response.data.list
						} else {
							ModalService.alert({ "modalTitle": "Error", "messenge": "Phân quyền thất bại" }, function() { }, function() { })
						}
					}, "POST");
				}
			}
		}

	}
	//gọi API để đa ngôn ngữ
	multiLanguage();
	function multiLanguage() {
		var datarequest = {
			"client": {
				"langCode": fnGetClientInfo().langCode
			},
			"dummySearch": {
				"screensId": 6
			}
		}
		WebService.call($http, "screensitem/screensitem03", datarequest, function(response) {
			$rootScope.titlePage = response.data.list[0].displayText // tên tiêu đề
			var langScreens = [];
			langScreens = response.data.list;
			$scope.Chooseyourrole = langScreens[8].displayText
			for (x in langScreens) {
				$scope["strName" + x] = langScreens[x].displayText;
			}
		}, "POST");
	}
	// khai báo function để callback lại dữ liệu
	function callBack() {
		loadDataTable(dataAgain());
	}
});