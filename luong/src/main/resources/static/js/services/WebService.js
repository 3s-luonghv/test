app.service('WebService', function () {

    this.call = function ($http, wsName, request, fnSuccess, nameMethod,typeReponse) {
        $http({
            url: "http://localhost:9999/hr/"+ wsName,
            method: nameMethod,
            'Content-Type': 'application/json;charset=UTF-8',
            data: request,
			responseType: typeReponse,
        }).then(function (response) {//khi phan hoi thanh cong gan tham so response vao cho funtion o vi tri tham so thu4 tren WebService.call()
            fnSuccess(response);
        });
    }
}); 