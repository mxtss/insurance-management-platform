from flask import Blueprint
from services.premium_payment_service import update_payment
from controllers.premium_payment_controller import (
    add_payment,
    view_payments,
    view_payment,
    due_payments,
    overdue_payments,
    update_payment_controller,
    delete_payment_controller
)

from middleware.role_required import role_required

payment_bp = Blueprint("payments", __name__)


@payment_bp.route("", methods=["POST"])
@role_required("Administrator", "Insurance Agent")
def create_payment():
    return add_payment()


@payment_bp.route("", methods=["GET"])
@role_required("Administrator", "Insurance Agent")
def get_all():
    return view_payments()


@payment_bp.route("/<int:payment_id>", methods=["GET"])
@role_required("Administrator", "Insurance Agent")
def get_one(payment_id):
    return view_payment(payment_id)


@payment_bp.route("/due", methods=["GET"])
@role_required("Administrator", "Insurance Agent")
def due():
    return due_payments()


@payment_bp.route("/overdue", methods=["GET"])
@role_required("Administrator", "Insurance Agent")
def overdue():
    return overdue_payments()


@payment_bp.route("/<int:payment_id>", methods=["PUT"])
@role_required("Administrator", "Insurance Agent")
def update(payment_id):
    return update_payment_controller(payment_id)


@payment_bp.route("/<int:payment_id>", methods=["DELETE"])
@role_required("Administrator")
def delete(payment_id):
    return delete_payment_controller(payment_id)