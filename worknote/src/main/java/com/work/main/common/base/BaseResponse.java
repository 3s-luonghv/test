package com.work.main.common.base;

public class BaseResponse {
	private Object content;
	private Object error;

	public BaseResponse() {
		super();
	}

	public BaseResponse(Object content, Object error) {
		super();
		this.content = content;
		this.error = error;
	}

	public Object getContent() {
		return content;
	}

	public void setContent(Object content) {
		this.content = content;
	}

	public Object getError() {
		return error;
	}

	public void setError(Object error) {
		this.error = error;
	}
}
