package com.work.main.worknote.webservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.work.main.common.base.BaseResponse;
import com.work.main.worknote.dto.WorknoteRequest;
import com.work.main.worknote.process.WorknoteService;

@RestController
@CrossOrigin
@RequestMapping("/worknote")
public class WorknoteWebService {

	@Autowired
	WorknoteService service;
	
	
	@PostMapping("/save")
	@ResponseBody
	public  ResponseEntity<?> save(@RequestBody WorknoteRequest req)
	{
		service.save(req);
		return new ResponseEntity<>(HttpStatus.CREATED);
	}
	
	@GetMapping("/getall")
	@ResponseBody
	public ResponseEntity<?> getAll() {
		BaseResponse rep = service.getAll();
		return new ResponseEntity<>(rep, HttpStatus.OK);

	}
	@GetMapping("/getallsort")
	@ResponseBody
	public ResponseEntity<?> getAll(@RequestBody WorknoteRequest req) {
		BaseResponse rep = service.getAllSort(req);
		return new ResponseEntity<>(rep, HttpStatus.OK);

	}
	
	@PostMapping("/getbyid")
	@ResponseBody
	public ResponseEntity<?> getByID(@RequestBody WorknoteRequest req)
	{
		BaseResponse  rep = service.getByID(req);
		return new ResponseEntity<>(rep,HttpStatus.OK);
	}
	
	@PostMapping("/delete")
	@ResponseBody
	public ResponseEntity<?> delete(@RequestBody WorknoteRequest req) {
		service.delete(req);
		return new ResponseEntity<>(HttpStatus.OK);

	}
	@PostMapping("/update")
	@ResponseBody
	public ResponseEntity<?> deleteCheck(@RequestBody WorknoteRequest req) {
		service.update(req);
		return new ResponseEntity<>(req,HttpStatus.OK);

	}
}
