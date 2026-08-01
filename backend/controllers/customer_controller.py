from flask import request

from schemas.customer_schema import CustomerSchema
from services.customer_service import (
    create_customer,
    get_all_customers,
    get_customer,
    update_customer,
    delete_customer,
    search_customers
)

customer_schema = CustomerSchema()


def add_customer():

    data = request.get_json()

    errors = customer_schema.validate(data)

    if errors:
        return errors, 400

    return create_customer(data)

def view_customers():
    return get_all_customers()

def view_customer(customer_id):
    return get_customer(customer_id)

def edit_customer(customer_id):

    data = request.get_json()

    errors = customer_schema.validate(data)

    if errors:
        return errors, 400

    return update_customer(customer_id, data)

def remove_customer(customer_id):
    return delete_customer(customer_id) 

def search_customer():
    keyword = request.args.get("keyword", "")
    return search_customers(keyword)