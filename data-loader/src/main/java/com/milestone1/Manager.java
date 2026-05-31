package com.milestone1;

import java.time.LocalDateTime;
import java.time.LocalDate;

public class Manager
{

	private String business_code = null;
	private String cust_number = null;
	private String name_customer = null;
	private LocalDateTime clear_date = null;
	private int business_year;
	private Long doc_id = null;
	private LocalDate posting_date = null;
	private LocalDate doc_create_date = null;
	private LocalDate due_in_date = null;
	private String inv_currency = null;
	private String doc_type = null;
	private int posting_id;
	private String business_area = null;
	private double total_open_amount;
	private LocalDate baseline_create_date = null;
	private String cust_payment_terms=null;
	private Long invoice_id=null;
	private int isOpen;

	public String getBusiness_code() {
		return business_code;
	}
	public void setBusiness_code(String business_code) {
		this.business_code = business_code;
	}
	public String getCust_number() {
		return cust_number;
	}
	public void setCust_number(String cust_number) {
		this.cust_number = cust_number;
	}
	public String getName_customer() {
		return name_customer;
	}
	public void setName_customer(String name_customer) {
		this.name_customer = name_customer;
	}
	public LocalDateTime getClear_date() {
		return clear_date;
	}
	public void setClear_date(LocalDateTime clear_date) {
		this.clear_date = clear_date;
	}
	public int getBusiness_year() {
		return business_year;
	}
	public void setBusiness_year(int business_year) {
		this.business_year = business_year;
	}
	public Long getDoc_id() {
		return doc_id;
	}
	public void setDoc_id(Long doc_id) {
		this.doc_id = doc_id;
	}
	public LocalDate getPosting_date() {
		return posting_date;
	}
	public void setPosting_date(LocalDate posting_date) {
		this.posting_date = posting_date;
	}
	public LocalDate getDoc_create_date() {
		return doc_create_date;
	}
	public void setDoc_create_date(LocalDate doc_create_date) {
		this.doc_create_date = doc_create_date;
	}
	public LocalDate getDue_in_date() {
		return due_in_date;
	}
	public void setDue_in_date(LocalDate due_in_date) {
		this.due_in_date = due_in_date;
	}
	public String getInv_currency() {
		return inv_currency;
	}
	public void setInv_currency(String inv_currency) {
		this.inv_currency = inv_currency;
	}
	public String getDoc_type() {
		return doc_type;
	}
	public void setDoc_type(String doc_type) {
		this.doc_type = doc_type;
	}
	public int getPosting_id() {
		return posting_id;
	}
	public void setPosting_id(int posting_id) {
		this.posting_id = posting_id;
	}
	public String getBusiness_area() {
		return business_area;
	}
	public void setBusiness_area(String business_area) {
		this.business_area = business_area;
	}
	public double getTotal_open_amount() {
		return total_open_amount;
	}
	public void setTotal_open_amount(double total_open_amount) {
		this.total_open_amount = total_open_amount;
	}
	public LocalDate getBaseline_create_date() {
		return baseline_create_date;
	}
	public void setBaseline_create_date(LocalDate baseline_create_date) {
		this.baseline_create_date = baseline_create_date;
	}
	public String getCust_payment_terms() {
		return cust_payment_terms;
	}
	public void setCust_payment_terms(String cust_payment_terms) {
		this.cust_payment_terms = cust_payment_terms;
	}
	public Long getInvoice_id() {
		return invoice_id;
	}
	public void setInvoice_id(Long invoice_id) {
		this.invoice_id = invoice_id;
	}
	public int getIsOpen() {
		return isOpen;
	}
	public void setIsOpen(int isOpen) {
		this.isOpen = isOpen;
	}
}
