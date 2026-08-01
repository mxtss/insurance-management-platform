from flask import Blueprint

from controllers.customer_controller import add_customer, edit_customer
from middleware.role_required import role_required
from controllers.customer_controller import (
    add_customer,
    view_customers,
    view_customer,
    edit_customer,
    remove_customer,
    search_customer
)

customer_bp = Blueprint("customers", __name__)


@customer_bp.route("", methods=["POST"])
@role_required("Administrator", "Insurance Agent")
def create():
    return add_customer()

@customer_bp.route("", methods=["GET"])
@role_required("Administrator", "Insurance Agent")
def get_all():
    return view_customers()

@customer_bp.route("/<int:customer_id>", methods=["GET"])
@role_required("Administrator", "Insurance Agent")
def get_customer_by_id(customer_id):
    return view_customer(customer_id)

@customer_bp.route("/<int:customer_id>", methods=["PUT"])
@role_required("Administrator", "Insurance Agent")
def update_customer(customer_id):
    return edit_customer(customer_id)

@customer_bp.route("/<int:customer_id>", methods=["DELETE"])
@role_required("Administrator", "Insurance Agent")  
def delete_customer(customer_id):
    return remove_customer(customer_id) 

@customer_bp.route("/search", methods=["GET"])
@role_required("Administrator", "Insurance Agent")
def search():
    return search_customer()