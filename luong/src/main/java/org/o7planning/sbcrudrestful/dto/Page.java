/**
 * 
 */
package org.o7planning.sbcrudrestful.dto;

/**
 * Lớp thông tin sử dụng cho việc điều khiển phân trang  
 * Sử dụng lơp này trong các Dto có yêu cầu query, filter, search dữ liệu dang list
 * @author Admin
 *
 */
public class Page {
	//for request
	/**
	 * Reqpuire: Yêu cầu trả về số lượng mục mỗi trang
	 */
	public int limit = 0;//defaul for search all
	/**
	 * Reqpuire: Yêu cầu trang dữ liệu thứ mấy?
	 */
	public int pageIdx =-1;//defaul for search all
	/**
	 * Optional: Danh sách các mục sẽ sắp xếp (cách nhau dấu phẩy)
	 * Exp: EmployeName desc, OgrnName, Age  asc
	 */
	public String orderBy = "";//defaul for search all
	
	//for response
	/**
	 * Default: Tổng số lượng trang trả về theo request ở trên
	 */
	public int pageCount = 0;
	/**
	 * Default: Tổng số mục tìm thấy
	 */
	public int itemCount = 0;
}
