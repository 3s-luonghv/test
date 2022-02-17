package org.o7planning.sbcrudrestful.search.webservice;

import org.o7planning.sbcrudrestful.search.dto.SearchRequest;
import org.o7planning.sbcrudrestful.search.dto.SearchResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;



@RequestMapping("/demo")
@RestController("Search")
public class SearchWebService  {

	@Qualifier("procSearch") // Đặt Qualifier của Proc tương ứng
	@Autowired
	//IProcessor proc = null;

	@RequestMapping(value = "procSearch", consumes = "application/json;charset=UTF-8", produces = "application/json;charset=UTF-8", method = RequestMethod.POST)
	@ResponseBody
	public SearchResponse process(@RequestBody SearchRequest request) {
		return (SearchResponse) process(request);
	}

}