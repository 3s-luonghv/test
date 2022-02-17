
app.controller('ScreensLabelCtrl', function ($http, $scope, $rootScope, WebService, GridService, $compile, $uibModal, ModalService, ValidateUltility) {
	$rootScope.showAside = ""
	$rootScope.showNav = true;
	$rootScope.showHead = true;
	$rootScope.titlePage = "Nhãn ngôn ngữ";
	 $scope.selectstt = 1 + "";
	// da ngôn ngữ option select
	getoption();
	function getoption() {
		if (fnGetClientInfo().langCode == "vi") {
			$scope.optionscreens = "--Chọn màn hình--";
			$scope.optionlanguage = "--Chọn ngôn ngữ--";
			$scope.optionstatus = "--Chọn trạng thái--";

		}
		else if (fnGetClientInfo().langCode == "en") {
			$scope.optionscreens = "--Select Screens--";
			$scope.optionlanguage = "--select language--";
			$scope.optionstatus = "--select status--";

		}
		else if (fnGetClientInfo().langCode == "jp") {
			$scope.optionscreens = "--画面選択--";
			$scope.optionlanguage = "--言語を選択する--";
			$scope.optionstatus = "--ステータスを選択--";

		}
	}
	// dropdown select screens
	dropdownScreens();
	function dropdownScreens() {
		var dropdownScreens = {
			"client": {
				"langCode": fnGetClientInfo().langCode
			}
		}
		WebService.call($http, "screens/screens001", dropdownScreens, function (response) {

			//tab ngon ngu
			$scope.screensdropdown = response.data.list;
			//$scope.selectscreens = $scope.screensdropdown[1].displayText;
		}, "POST")
	}

	var dataGridScreens = [];
	//drop down select language
	dropdownlanguage();
	function dropdownlanguage() {
		var dropdownlanguage = {
			"client": {
				"langCode": fnGetClientInfo().langCode
			}			
		}
		WebService.call($http, "lang/lang001", dropdownlanguage, function(response) {
			var languageRole = new Array();
			var dataDropLang = response.data.list;
			if (dataDropLang == 0) {
				console.log("Không có dữ liệu");
			} else {
				for (x in dataDropLang) {
					languageRole.push(dataDropLang[x])
				}
			}
			$scope.languagedropdown = languageRole;
			$scope.selectlanguage = fnGetClientInfo().langCode
		}, "POST");
	}
	// khi chọn ngôn ngữ lọc là rỗng thì trạng thái về all
	$scope.changelanguage = function () {

		if ($scope.selectlanguage == "") {
			$scope.selectstt == "";
		} else {
			//dropdownstt();
			getoption();
		}
	}
	//dropdown status theo langcode select language
	dropdownnstatus();
	function dropdownnstatus() {
		var dropdownStt = {
			"client":{
				"langCode": fnGetClientInfo().langCode
				}
		}
		WebService.call($http, "useflag/usl03", dropdownStt, function (response) {
		var statusScreensLabel = new Array();
			var dataDropSTT = response.data.list;
			if (dataDropSTT == 0) {
				console.log("Không có dữ liệu");
			} else {
				for (x in dataDropSTT) {
					statusScreensLabel.push(dataDropSTT[x])
				}
			}
			$scope.sttdropdown = statusScreensLabel;
			//$scope.sttdropdown[1].displayText;
		}, "POST")
	}

	//reset form lọc
	$scope.resetformscreens = function () {
		$scope.SearchText = "";
		$scope.selectlanguage = "";
		$scope.selectscreens = "";
		$scope.selectstt = "-1";
	}
	// build lưới lọc
	function loadGridScreens() {
		var screensRequest = {
			"client": { "langCode": $scope.selectlanguage },
			"dummySearch": {
				"displayText": $scope.SearchText,
				"screensId": $scope.selectscreens,
				"useFlag": $scope.selectstt,
			}
		}
		WebService.call($http, "screensitem/screensitem03", screensRequest, function (response) {

			var columnInfo = [
				{
					"keycol": "action",
					'colType': "checkbox", "keyname": "<div class='form-check checkbox'><input class='form-check-input' type='checkbox' data-ng-model='clickcheckAll' data-ng-change='checkAll()' id='checkAllid'><label class='form-check-label'></label></div>",
					"template": "<div class='form-check checkbox'><input class='form-check-input check' type='checkbox' data-ng-click ='checkItem({})' data-ng-model='checkbox{}'><label class='form-check-label'></label></div>"
				},
				{ "keycol": "STT", "keyname": "STT", "colType": "STT" },
				
				{ "keycol": "screensName", "keyname": "{{Label13}}", "colType": "string" },
				{ "keycol": "displayText", "keyname": "{{Label14}}", "colType": "string" },
				{ "keycol": "code", "keyname": "{{Label15}}", "colType": "string" },
				{ "keycol": "displayTextLang", "keyname": "{{Label4}}", "colType": "string" },
				{ "keycol": "nameUseFlag", "keyname": "{{Label5}}", "colType": "string" },
				{
					"keycol": "action", 'colType': "checkbox", "keyname": "{{Label16}}", "template": "<a data-ng-click='update({})' style='cursor:pointer'>" + "<i class='fa fa-edit'></i></a>" + "   " +
						"<a data-ng-click='delete({})' style='cursor:pointer'>" +
						"<i class='far fa-trash-alt'><i></a>"
				}
			]
			//console.log(response);
			if (response.data.list.length==0 ){
				table = GridService.buildGridnon(columnInfo, response.data.list);}
			
			else 
			var table = GridService.buildGrid(columnInfo, response.data.list);
			var tableHtml = $("#gridRecords").html(table);
			$compile(tableHtml)($scope);

			for (var row = 1; row <= response.data.list.length; row++) {
				//console.log(row)
				$scope["checkbox" + row] = false;
				response.data.list[row - 1]["isCheck"] = false;
			};

			dataGridScreens = response.data.list; // dữ liệu lưới lọc đưa vào dataGridScreens được khai báo trước đó
		}, "POST")
	}
	// bật modal để tiến hành thêm mới........
	$scope.fnAddnew = function (id) {
	//	dataGridScreens = "";
		ModalService.ShowModal( 'screens/modal/modalscreenlabel/addnew.html', 'ModalDemoCtrl', "Thêm mới", "", function (response) {
			loadGridScreens();
		});
	}
	// click mở modal sao chép
	$scope.fnCopy = function () {
		console.log(datacheckcopy)
	//	dataGridScreens = "";
		if(ValidateUltility.checkEmpty(datacheckcopy) )
		{
			ModalService.alert({ 'modalTitle': 'Error', 'messenge': 'Chưa chọn nhãn để sao chép' }, function () { }, function () { });
		} else {
		ModalService.ShowModal('screens/modal/modalscreenlabel/copy.html', 'ModalCopyCtrl',"Sao chép" , datacheckcopy, function (response) {
			datacheckcopy =[]
			
		});
		}
	}
	// button lọc để build lại lưới
	$scope.fnSearchScreens = function () {
		
		loadGridScreens();
	}

	var storeCheckedRow = {};
	var datacheckcopy = []
	//click check all
	$scope.checkAll = function () {
		console.log(storeCheckedRow)
		storeCheckedRow = {};
		if ($scope.clickcheckAll == true) {
			for (var row = 1; row <= dataGridScreens.length; row++) {
				$scope["checkbox" + row] = true;
				dataGridScreens[row - 1]["isCheck"] = true;
				storeCheckedRow[row - 1] = true;
				datacheckcopy.push(dataGridScreens[row - 1])
				console.log(datacheckcopy)
			}
		} else {
			for (var row = 1; row <= dataGridScreens.length; row++) {
				$scope["checkbox" + row] = false;
				dataGridScreens[row - 1]["isCheck"] = false;
				datacheckcopy = []
				console.log(datacheckcopy)
			}
		}
		fnUpdCheckAll();
	}
	// check box item 
	$scope.checkItem = function (checkbox) {

		dataGridScreens[checkbox - 1]["isCheck"] = $scope["checkbox" + checkbox];
		if ($scope["checkbox" + checkbox]) {
			storeCheckedRow[checkbox - 1] = true;
			datacheckcopy.push(dataGridScreens[checkbox - 1])
		} else {
			delete storeCheckedRow[checkbox - 1];
			delete datacheckcopy[datacheckcopy.length -1 ]
		}
		fnUpdCheckAll();
	}
	//function checkall
	function fnUpdCheckAll() {
		var objectKey = Object.keys(storeCheckedRow);
		if (objectKey.length == dataGridScreens.length) {
			$scope.clickcheckAll = true;
		} else {
			$scope.clickcheckAll = false;
		}
	};
	// function click edit de hien modal tien hanh cap nhật thay đổi
	$scope.update = function (update) {
		var datascreens = dataGridScreens[update - 1]
		ModalService.ShowModal('screens/modal/modalscreenlabel/addnew.html', 'ModalEditCtrl', "Cập nhật", datascreens, function (response) {

			loadGridScreens();
		});
	}
	// function click delete tiến hành đổi trạng thái đối tượng 
	$scope.delete = function (del) {
		function yesfunctionalert() {
			var datascreens = dataGridScreens[del - 1];
			var deleteRquest = {
				"client": {
					"langCode": datascreens.langCode,
				},
				"dto": {
					"id": datascreens.id,
					"code": datascreens.code,
					"useFlag": "3",
					"screensId": datascreens.screensId,
					"displayText": datascreens.displayText
				}
			}
			WebService.call($http, "screensitem/screensitem05", deleteRquest, function (response) {

				if (response.data.isDone == true) {
					loadGridScreens();

					ModalService.alert({ 'modalTitle': 'Success', 'messenge': 'Xóa thành công' }, function () { }, function () { });
				}
				else {
					loadGridScreens();

					ModalService.alert({ 'modalTitle': 'Error', 'messenge': 'Xóa thất bại' }, function () { }, function () { });
				}
			}, "POST");

		}
		ModalService.alert({ 'modalTitle': 'Question', 'messenge': 'Bạn có muốn xóa nhãn?' }, yesfunctionalert, function () { });
	}/// function click delete

	/// list checked
	function ListChecked() {
		var idChecked = [];
		for (var row = 1; row <= dataGridScreens.length; row++) {
			if (dataGridScreens[row - 1].isCheck == true) {
				dataGridScreens[row - 1].useFlag = 3
				idChecked.push(dataGridScreens[row - 1]);
			}
		}
		return idChecked;
	}
	//thay đổi trang thái sử dụng của các đối tượng được checkbox
	$scope.fnDeleteCheck = function () {
		console.log("delete");
		if (ListChecked().length == 0) {
			ModalService.alert({ 'modalTitle': 'Warning', 'messenge': 'Vui lòng chọn nhãn muốn xóa?' }, function () { }, function () { });

		} else {
			modalService.alert({ 'modalTitle': 'Question', 'messenge': 'Bạn có chắc muốn xoá danh sách nhãn?' }, function () {
				var DelCheckedRequest = {
					"dtoList": ListChecked()
				}
				WebService.call($http, "screensitem/screensitem06", DelCheckedRequest, function (response) {
					if (response.data.isDone == true) {
						$scope.idChecked = false;
						ModalService.alert({ 'modalTitle': 'Success', 'messenge': 'Xóa thành công' }, function () {
							$scope.clickcheckAll == false;
						}, function () { });
						loadGridScreens();
					} else {
						ModalService.alert({ 'modalTitle': 'Error', 'messenge': 'Xóa thất bại' }, function () { }, function () { });
					}
				}, "POST");
			}, function () { });
		}
	}
	//Ham da ngon ngu
	buidLabelScreens();
	function buidLabelScreens() {
		var request = {
			"client": {
				"langCode": fnGetClientInfo().langCode
				},
			"dummySearch": {
				"screensId": 9
			}
		}
		WebService.call($http, 'screensitem/screensitem03', request, function(response) {
			
		if(response.data.issues.length == 0) {
		
			$scope.Label1 = response.data.list[0].displayText;
			$scope.Label2 = response.data.list[1].displayText;
			$scope.Label3 = response.data.list[2].displayText;
			$scope.Label4 = response.data.list[3].displayText;
			$scope.Label5 = response.data.list[4].displayText;
			$scope.Label6 = response.data.list[5].displayText;
			$scope.Label7 = response.data.list[6].displayText;
			$scope.Label8 = response.data.list[7].displayText;
			$scope.Label9 = response.data.list[8].displayText;
			$scope.Label10 = response.data.list[9].displayText;
			$scope.Label11 = response.data.list[10].displayText;
			$scope.Label12 = response.data.list[11].displayText;
			$scope.Label13 = response.data.list[12].displayText;
			$scope.Label14 = response.data.list[13].displayText;
			$scope.Label15 = response.data.list[14].displayText;
			$scope.Label16 = response.data.list[15].displayText;
			}
			
		else { $window.alert("ERROR: " + response.data.issues[0].message);}
		}, "POST");
	}
});