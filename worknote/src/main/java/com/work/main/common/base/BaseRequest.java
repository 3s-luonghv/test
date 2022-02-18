package com.work.main.common.base;

public class BaseRequest {
	private int pageNum = 1;
	private int pageSize = 5;
	public BaseRequest() {
		super();
		// TODO Auto-generated constructor stub
	}
	public BaseRequest(int pageNum, int pageSize) {
		super();
		this.pageNum = pageNum;
		this.pageSize = pageSize;
	}
	public int getPageNum() {
		return pageNum;
	}
	public void setPageNum(int pageNum) {
		this.pageNum = pageNum;
	}
	public int getPageSize() {
		return pageSize;
	}
	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}
	
	
}
