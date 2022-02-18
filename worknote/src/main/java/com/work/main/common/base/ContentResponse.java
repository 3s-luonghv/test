package com.work.main.common.base;

import java.util.List;

/**
 * [Description]: Create constructure for content of response<br>
 * [ Remarks ]:<br>
 * [Copyright]: Copyright (c) 2020<br>
 * 
 * @author Brycen VietNam Company
 * @version 1.0
 */
public class ContentResponse {
    private List<Object> data;
    private int pageNum;
    private int pageSize;
    private int totalElements;

    public ContentResponse() {
        super();
    }

    public ContentResponse(List<Object> data) {
        super();
        this.data = data;
    }

    public ContentResponse(List<Object> data, int pageNum, int pageSize, int totalElements) {
        super();
        this.data = data;
        this.pageNum = pageNum;
        this.pageSize = pageSize;
        this.totalElements = totalElements;
    }

    public List<Object> getData() {
        return data;
    }

    public void setData(List<Object> data) {
        this.data = data;
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

    public int getTotalElements() {
        return totalElements;
    }

    public void setTotalElements(int totalElements) {
        this.totalElements = totalElements;
    }
}
