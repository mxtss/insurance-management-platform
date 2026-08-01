from flask import Blueprint

from controllers.claim_controller import (
    add_claim,
    view_claims,
    view_claim,
    approve,
    reject,
    history
)

from middleware.role_required import role_required

claim_bp = Blueprint("claims", __name__)


@claim_bp.route("", methods=["POST"])
@role_required("Administrator", "Insurance Agent", "Customer")
def create_claim():
    return add_claim()


@claim_bp.route("", methods=["GET"])
@role_required("Administrator", "Insurance Agent")
def get_all():
    return view_claims()


@claim_bp.route("/<int:claim_id>", methods=["GET"])
@role_required("Administrator", "Insurance Agent", "Customer")
def get_one(claim_id):
    return view_claim(claim_id)


@claim_bp.route("/<int:claim_id>/approve", methods=["PUT"])
@role_required("Insurance Agent", "Administrator")
def approve_route(claim_id):
    return approve(claim_id)


@claim_bp.route("/<int:claim_id>/reject", methods=["PUT"])
@role_required("Insurance Agent", "Administrator")
def reject_route(claim_id):
    return reject(claim_id)


@claim_bp.route("/history", methods=["GET"])
@role_required("Administrator", "Insurance Agent")
def history_route():
    return history()