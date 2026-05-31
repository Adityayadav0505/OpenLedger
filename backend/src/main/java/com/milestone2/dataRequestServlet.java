package com.milestone2;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.google.gson.Gson;

/**
 * Servlet implementation class dataRequestServlet
 * Mapped to /fetchdata.do in web.xml.
 */
public class dataRequestServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

    /**
     * @see HttpServlet#HttpServlet()
     */
    public dataRequestServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		Connection connection=null;
		try{
			connection = DBConfig.getConnection();
			Integer limit = Integer.parseInt(request.getParameter("limit"));
			Integer count = Integer.parseInt(request.getParameter("count"));
			String query = "SELECT * FROM invoice_details LIMIT ?,?;";
			PreparedStatement statement = connection.prepareStatement(query);
			statement.setInt(1, (limit)*(count-1));
			statement.setInt(2, limit);
			ResultSet rs = statement.executeQuery();
			ArrayList<Manager> arr = new ArrayList<>();
			while(rs.next()) {
				Manager m = new Manager();
				m.setBusiness_code(rs.getString("Business_code"));
				m.setCust_number(rs.getString("Cust_number"));
				m.setName_customer(rs.getString("Name_customer"));
				m.setClear_date(rs.getDate("Clear_date"));
				m.setBusiness_year(rs.getInt("Business_year"));
				m.setDoc_id(rs.getLong("Doc_id"));
				m.setPosting_date(rs.getDate("Posting_date"));
				m.setDoc_create_date(rs.getDate("Document_create_date"));
				m.setDue_in_date(rs.getDate("Due_in_date"));
				m.setInv_currency(rs.getString("Invoice_currency"));
				m.setDoc_type(rs.getString("Document_type"));
				m.setPosting_id(rs.getInt("Posting_id"));
				m.setBusiness_area(rs.getString("Area_business"));
				m.setTotal_open_amount(rs.getDouble("Total_open_amount"));
				m.setBaseline_create_date(rs.getDate("Baseline_create_date"));
				m.setCust_payment_terms(rs.getString("Cust_payment_terms"));
				m.setInvoice_id(rs.getLong("Invoice_id"));
				m.setIsOpen(rs.getInt("IsOpen"));
				if(rs.getString("notes")!=null)
					m.setNotes(rs.getString("notes"));
				else
					m.setNotes("");
				arr.add(m);
			}

			Gson gson = new Gson();
			String data = gson.toJson(arr);
			PrintWriter out = response.getWriter();
			response.setContentType("application/json");
			response.setCharacterEncoding("UTF-8");
			out.print(data);
			out.flush();
		}
		catch(SQLException se)
		{
		    //Handling errors for JDBC
		    se.printStackTrace();
		}
		catch(Exception e)
		{
		    //Handling errors for Class.forName
		    e.printStackTrace();
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
