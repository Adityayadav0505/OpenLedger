package com.milestone2;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import java.text.ParseException;
import java.text.SimpleDateFormat;

import java.util.Locale;
import java.sql.Date;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class addEntityServlet
 * Mapped to /addData.do in web.xml.
 */
public class addEntityServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

    /**
     * @see HttpServlet#HttpServlet()
     */
    public addEntityServlet() {
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
			String name_customer = request.getParameter("name_customer");
			String cust_number = request.getParameter("cust_number");
			Long invoice_id = Long.parseLong(request.getParameter("invoice_id"));
			Double total_open_amount = Double.parseDouble(request.getParameter("total_open_amount"));
			//String due_in_date =request.getParameter("due_in_date");
			Date date=null;

	        SimpleDateFormat formatter = new SimpleDateFormat("EEE MMM dd yyyy HH:mm:ss zzz", Locale.ENGLISH);


	        java.util.Date utilDate = formatter.parse(request.getParameter("due_in_date"));
	        date = new java.sql.Date(utilDate.getTime());


			String notes = request.getParameter("notes");
			String query = "INSERT INTO invoice_details (name_customer, cust_number, invoice_id, "
					+ "total_open_amount, due_in_date, notes, doc_id) values(?,?,?,?,?,?,?);";
			PreparedStatement statement = connection.prepareStatement(query);
			statement.setString(1, name_customer);
			statement.setString(2, cust_number);
			statement.setLong(3, invoice_id);
			statement.setDouble(4, total_open_amount);
			statement.setDate(5, date);
			statement.setString(6, notes);
			statement.setLong(7, invoice_id);
			int no_of_rows = statement.executeUpdate();
			System.out.println("No of rows affected : "+ no_of_rows);
		}
		catch (ParseException e)
        {
            e.printStackTrace();
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
