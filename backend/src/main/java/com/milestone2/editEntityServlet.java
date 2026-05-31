package com.milestone2;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class editEntityServlet
 * Mapped to /editData.do in web.xml.
 */
public class editEntityServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

    /**
     * @see HttpServlet#HttpServlet()
     */
    public editEntityServlet() {
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
			Long invoice_id = Long.parseLong(request.getParameter("invoice_id"));
			Double total_open_amount = Double.parseDouble(request.getParameter("total_open_amount"));
			String notes = request.getParameter("notes");
			String query = "UPDATE invoice_details SET total_open_amount = ?, notes = ? WHERE doc_id = ?;";
			PreparedStatement statement = connection.prepareStatement(query);
			statement.setDouble(1, total_open_amount);
			statement.setString(2, notes);
			statement.setLong(3, invoice_id);
			int no_of_rows = statement.executeUpdate();
			System.out.println("No of rows affected : "+ no_of_rows);
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
