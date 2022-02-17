app.controller('EditModalSkillController', function($rootScope, $scope, $uibModalInstance, $http, WebService, ModalService, parentParameter, ValidateUltility) {
    var parent = 49;
    getDataDropDown();
console.log(parentParameter)
    function getDataDropDown() {
        var dataDropDown = {
            "client": fnGetClientInfo()
        }
        WebService.call($http, "catitem/ci03", dataDropDown, function(response) {
            console.log(response)
            var specializedit = [];
            var skillnamedit = [];
            var leveledit = [];
            var dataedit = response.data.list;
            //console.log(data)
            if (dataedit == 0) {
                console.log("Không có dữ liệu");
            } else {
					for (x in dataedit) {
						if (dataedit[x].categoryId == 13) {
							specializedit.push(dataedit[x]);
						} else if (dataedit[x].categoryId == 14 && dataedit[x].parentId == parent) {
							skillnamedit.push(dataedit[x]);
						}
						 else if (dataedit[x].categoryId == 9) {
							leveledit.push(dataedit[x]);
						}
						}
                          console.log(status);
                //tab thông tin chung
            $scope.Specializedit = specializedit;
			//$scope.Specializeselect =$scope.Specializedit[0].id +"";
            $scope.Skillnamedit = skillnamedit;
			//$scope.Skillname =$scope.Skillnamedit[0].id +"";
            $scope.Leveledit = leveledit;
			//$scope.Level =$scope.Leveledit[0].id +"";

                var requestSkill = {
                    "client": {
                        "langCode": "vi"

                    },
                    "dummySearch": {
                        "id": parentParameter,
                    }

                }
                WebService.call($http, "personsk/personsk03", requestSkill, function(response) {                 
					console.log(response)
                   	$scope.Specializeselect = response.data.list[0].skillgroup + ""
                    $scope.Skillname = response.data.list[0].skillname + ""
                    $scope.Level = response.data.list[0].level + ""
                    $scope.fromdate = response.data.list[0].startdate + ""
                    $scope.todate = response.data.list[0].enddate + ""
                    $scope.YearExp = response.data.list[0].yearexp + ""
                    $scope.MonThexp = response.data.list[0].monthexp + ""
                  
                }, "POST")

                //loadGrid(response)
            }
            
        }, "POST");
    }
    $scope.changemodalskillNamedit = function() {
        parent = $scope.Specializeselect;
        console.log(parent)

        getDataDropDown()
    }
    $scope.closeAdnewCatIModaledit = function() {
        $uibModalInstance.dismiss()
    }
    $(function() {
        $('#fromdate').datetimepicker({
            format: 'YYYY-MM-DD'
        });
        $('#todate').datetimepicker({
            format: 'YYYY-MM-DD'
        });

    });
    $scope.saveSkillEdit = function(id) {
        console.log("Lưu chỉnh sửa")
        var request = {
            "client": {
                "langCode": "vi"

            },
            "dto": {
                "id": parentParameter,
                "idper": idPer,
                "startdate": $scope.fromdate,
                "enddate": $scope.todate,
                "skillgroup": $scope.Specializeselect,
                "skillname": $scope.Skillname,
                "yearexp": $scope.YearExp,
                "monthexp": $scope.MonThexp,
                "level": $scope.Level,
            }
        }
        console.log(request);
        WebService.call($http, "personsk/personsk05", request, function(response) {
	  	$uibModalInstance.close()
            console.log(response);
        }, "POST");

    }

});