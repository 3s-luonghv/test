app.controller('CanProFileInfoCtrl', function($rootScope,$window , $scope, $http, $timeout, $uibModal, GridService, $compile, $location, WebService, ModalService, ValidateUltility) {
	$timeout(function() {
	})
	$rootScope.showAside = "";
	$rootScope.showNav = true;
	$rootScope.showHead = true;

	checkTabCanPro('info');
	function checkTabCanPro(tabname) {
		$scope.isActiveTab = function(viewTabName) {
			return viewTabName === tabname;
		}
	}
	$scope.clickTab = function(tabname) {
		checkTabCanPro(tabname);
	};

	// xây dựng đa ngôn ngữ cho label
	buidLabelCanProfile();
	function buidLabelCanProfile() {
		var request = {
			"client": fnGetClientInfo(),
			"dummySearch": {
				"screensId": 2
			}
		}
		WebService.call($http, 'screensitem/screensitem03', request, function(response) {
		if(response.data.issues.length == 0) {
			$rootScope.titlePage = response.data.list[29].displayText;
			var data = response.data.list;
			for (var x = 1; x < data.length; x++) {
				$scope["CanProfile" + x] = data[x].displayText;
			}}
		else { $window.alert("ERROR: " + response.data.issues[0].message);}	
		var requestdata = {
			"client": fnGetClientInfo(),
			"dummySearch": {
				"screensId": 1
			}
		}
		WebService.call($http, 'screensitem/screensitem03', requestdata, function(response) {
			if(response.data.issues.length == 0) {
				var data = response.data.list;
				$scope.message = data[35].displayText;
				for (var x = 0; x < data.length; x++) {
					$scope["canPer" + x] = data[x].displayText;
				}
			}else {
			    $window.alert("ERROR: " + response.data.issues[0].message);
			}
		}, "POST");
		}, "POST");
		

	};

	// thông tin chung
	personInfo();
	function personInfo() {
		var request = {
			"client":
				fnGetClientInfo(),
			"dummySearch": {
				"id": idPer
			},
			"page": {}
		}
		WebService.call($http, 'can/info/ig03', request, function(response) {
			//console.log(response);
			if(response.data.issues.length == 0) {
				var personInfoTag = response.data.list[0];
				$scope.nameCanProfile = personInfoTag.fullname;
				$scope.birthCanProfile = personInfoTag.birthday;
				$scope.genderCanProfile = personInfoTag.sexname;
				$scope.foneCanProfile = personInfoTag.phone;
				$scope.emailCanProfile = personInfoTag.email;
				$scope.familyCanProfile = personInfoTag.familyStatusText;
				$scope.addressCanProfile = personInfoTag.address;
				$scope.receiverDateCanProfile = personInfoTag.recieveDate;
				$scope.jobAppCanProfile = personInfoTag.jobTyle;
				$scope.positionAppCanProfile = personInfoTag.jobPosition;
				$scope.sttProfileCanProfile = personInfoTag.status;
				$scope.descripText = personInfoTag.remark;	
				$scope.hashtag = personInfoTag.photo
				}
			else {
			    $window.alert("ERROR: " + response.data.issues[0].message);
			}
						
		}, "POST")
	};

	// đào tạo
	personTrainning();
	function personTrainning() {
		var request = {
			"client":
				fnGetClientInfo(),
			"dummySearch": {
				"idper": idPer
			},
			"page": {}
		}
		WebService.call($http, 'can/train/ig03', request, function(response) {
			console.log(response);
			var columnInfo = [
				{ "keycol": "STT", "keyname": "{{canPer2}}", "colType": "STT" },
				{ "keycol": "fromDate", "keyname": "{{canPer3}}", "colType": "string" },
				{ "keycol": "toDate", "keyname": "{{canPer4}}", "colType": "string" },
				{ "keycol": "degreeTraining", "keyname": "{{canPer12}}", "colType": "string" },
				{ "keycol": "fieldsOfStudy", "keyname": "{{canPer5}}", "colType": "string" },
				{ "keycol": "specialized", "keyname": "{{canPer6}}", "colType": "string" },
				{ "keycol": "trainingSystem", "keyname": "{{canPer7}}", "colType": "string" },
				{ "keycol": "rating", "keyname": "{{canPer8}}", "colType": "string" },
				{ "keycol": "trainingPlaces", "keyname": "{{canPer9}}", "colType": "string" }

			]
			var table = "";
			if (response.data.list.length == 0) {
				table = GridService.buildGridnon(columnInfo, response.data.list);
			} else {
				table = GridService.buildGrid(columnInfo, response.data.list);
			}
			var tableHtml = $("#gridEducate").html(table);
			$compile(tableHtml)($scope);
			dataGridListRole = response.data.list;

		}, "POST")
	}

	// năng lực
	personSkill()
	function personSkill() {
		var request = {
			"client": fnGetClientInfo(),
			"dummySearch": {
				"idper": idPer
			},
			"page": {
			}
		}
		WebService.call($http, 'can/canskill/ig03', request, function(response) {
			var columnInfo = [
				{ "keycol": "STT", "keyname": "{{canPer2}}", "colType": "STT" },
				{ "keycol": "startdate", "keyname": "{{canPer3}}", "colType": "string" },
				{ "keycol": "enddate", "keyname": "{{canPer4}}", "colType": "string" },
				{ "keycol": "skillgroupname", "keyname": "{{canPer10}}", "colType": "string" },
				{ "keycol": "skillnamename", "keyname": "{{canPer11}}", "colType": "string" },
				{ "keycol": "levelname", "keyname": "{{canPer12}}", "colType": "string" },
				{ "keycol": "yearexp", "keyname": "{{canPer13}}", "colType": "string" },
				{ "keycol": "monthexp", "keyname": "{{canPer14}}", "colType": "string" },
				{ "keycol": "note", "keyname": "{{canPer15}}", "colType": "string" }
			]
			var table = "";
			if (response.data.list.length == 0) {
				table = GridService.buildGridnon(columnInfo, response.data.list);
			} else {
				table = GridService.buildGrid(columnInfo, response.data.list);
			}
			var tableHtml = $("#gridSkills").html(table);
			$compile(tableHtml)($scope);
		}, "POST")
	};

	// kinh nghiệm
	personExp();
	function personExp() {
		var request = {
			"client": fnGetClientInfo(),
			"dummySearch": {
				"idper": idPer
			},
			"page": {

			}
		}
		WebService.call($http, 'can/canexp/ig03', request, function(response) {
			var columnInfo = [
				{ "keycol": "STT", "keyname": "{{canPer2}}", "colType": "STT" },
				{ "keycol": "startTime", "keyname": "{{canPer3}}", "colType": "string" },
				{ "keycol": "endTime", "keyname": "{{canPer4}}", "colType": "string" },
				{ "keycol": "displayText", "keyname": "{{canPer16}}", "colType": "string" },
				{ "keycol": "displayTextWork", "keyname": "{{canPer17}}", "colType": "string" },
				{ "keycol": "nameProjects", "keyname": "{{canPer18}}", "colType": "string" },
				{ "keycol": "Month", "keyname": "{{canPer19}}", "colType": "string" },
				{ "keycol": "displayTextRole", "keyname": "{{canPer20}}", "colType": "string" }

			]
			var table = "";
			if (response.data.list.length == 0) {
				table = GridService.buildGridnon(columnInfo, response.data.list);
			} else {
				table = GridService.buildGrid(columnInfo, response.data.list);
			}
			var tableHtml = $("#gridExp").html(table);
			$compile(tableHtml)($scope);
		}, "POST")
	}

	// đánh giá hồ sơ
	candireview();
	function candireview() {
		var request = {
			"client":
				fnGetClientInfo(),
			"dummySearch": {
				"idPerson": idPer
			},
			"page": {}
		}
		WebService.call($http, 'can/review/rv03', request, function(response) {
			var columnInfo = [
				{ "keycol": "STT", "keyname": "{{canPer2}}", "colType": "STT" },
				{ "keycol": "dateview", "keyname": "{{canPer32}}", "colType": "string" },
				{ "keycol": "userName", "keyname": "{{canPer21}}", "colType": "string" },
				{ "keycol": "scope", "keyname": "{{canPer22}}", "colType": "string" },
				{ "keycol": "resultview", "keyname": "{{canPer23}}", "colType": "string" },
				{ "keycol": "point", "keyname": "{{canPer24}}", "colType": "string" },
				{ "keycol": "rank", "keyname": "{{canPer25}}", "colType": "string" },
				{ "keycol": "conclusionview", "keyname": "{{canPer26}}", "colType": "string" },
				{ "keycol": "note", "keyname": "{{canPer27}}", "colType": "string" }

			]
			var table = "";
			if (response.data.list.length == 0) {
				table = GridService.buildGridnon(columnInfo, response.data.list);
			} else {
				table = GridService.buildGrid(columnInfo, response.data.list);
			}
			var tableHtml = $("#gridReview").html(table);
			$compile(tableHtml)($scope);
			dataGridListRole = response.data.list;
		}, "POST")
	}
	$scope.editCanprofile = function() {
		$location.path('/Profiles');
	}
	$scope.backHome = function() {
		$location.path('/CanProfile');
	}
});