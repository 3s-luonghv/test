
app.controller('EditModalTrainController', function($rootScope, $scope, $uibModalInstance, $http, TitleparentParameter, WebService, ModalService, parentParameter, ValidateUltility) {
	$scope.modalTitle = TitleparentParameter
	$scope.valueselectLanguage = "";

	var getDataDrop = function() {
		//khai báo điều kiện để get dữ liệu lên Specialized
		var dataLanguage = {
			"client": fnGetClientInfo(),
			"dummySearch": {}

		}
		//gọi để hiển thị data lên drop Level
		WebService.call($http, "catitem/ci03", dataLanguage, function(response) {
			console.log(response);
			var special = new Array();
			var system = new Array();
			var degree = new Array();
			var field = new Array();
			var rank = new Array();
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
					} else if (data[x].categoryId == 2) {
						field.push(data[x]);
					} else if (data[x].categoryId == 5) {
						rank.push(data[x]);
					}
				}
				console.log(special);
				console.log(status);
				//tab thông tin chung
				$scope.specializedX = special;
				$scope.trainingSystemX = system;
				$scope.degreeTrainingX = degree;
				$scope.fieldsOfStudyX = field;
				$scope.ratingsX = rank;
				

				var requestTrain = {
					"client": {
						"langCode": "vi"

					},
					"dummySearch": {

						"id": parentParameter,

					}

				}


				WebService.call($http, "person/ps03", requestTrain, function(response) {
					console.log(response)
					console.log(response.data.list[0].degreeTrainingId)
					$scope.FromDateX = response.data.list[0].fromDate
					$scope.ToDateX = response.data.list[0].toDate
					$scope.DegreeTrainingX = response.data.list[0].degreeTrainingId +""
					$scope.FieldsOfStudyX = response.data.list[0].fieldsOfStudyId +  ""
					$scope.SpecializedX = response.data.list[0].specializedid + ""
					$scope.TrainingSystemX = response.data.list[0].trainingSystemid + ""
					$scope.RatingsX = response.data.list[0].ratingsId + ""
					$scope.TrainingPlacesX = response.data.list[0].trainingPlaces



				}, "POST")

				//loadGrid(response)
			}
		}, "POST");

	}

	getDataDrop();





	$scope.closeAdnewCatIModal = function() {
		$uibModalInstance.dismiss()
	}


	$scope.saveEdit = function(id) {
		console.log("Lưu chỉnh sửa")
		var request = {
			"client": {
				"langCode": "vi"

			},
			"dto": {
				"id": parentParameter,
				"idper": idPer,
				"fromDate": $scope.FromDateX,
				"toDate": $scope.ToDateX,
				"degreeTrainingId": $scope.DegreeTrainingX,
				"fieldsOfStudyId": $scope.FieldsOfStudyX,
				"specializedid": $scope.SpecializedX,
				"trainingSystemid": $scope.TrainingSystemX,
				"ratingsId": $scope.RatingsX,
				"trainingPlaces": $scope.TrainingPlacesX,
				"useFlag": 1,
				"useFlagName": 1
			}
		}
		console.log(request);
		WebService.call($http, "person/ps05", request, function(response) {
if(response.data.isDone == true){
				ModalService.alert({ "modalTitle": "Success", "messenge": "Bạn đã cập nhật thành công" }, function(){}, "");
				$uibModalInstance.close() 
			}else{
				console.log("Lưu thất bại");
			}
			console.log(response);
			

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
