from flask import Blueprint

from controllers.policy_controller import add_policy
from middleware.role_required import role_required
from controllers.policy_controller import (
    add_policy,
    view_policies,
    view_policy,
    edit_policy,
    remove_policy,
    renew,
    view_active_policies,
    expiring_policies
)

policy_bp = Blueprint("policies", __name__)


@policy_bp.route("", methods=["POST"])
@role_required("Administrator", "Insurance Agent")
def create():
    return add_policy()

@policy_bp.route("", methods=["GET"])
@role_required("Administrator", "Insurance Agent")
def list_policies():
    return view_policies()

@policy_bp.route("/<int:policy_id>", methods=["GET"])
@role_required("Administrator", "Insurance Agent")
def get_policy(policy_id):
    return view_policy(policy_id)

@policy_bp.route("/<int:policy_id>", methods=["PUT"])
@role_required("Administrator", "Insurance Agent")
def update(policy_id):
    return edit_policy(policy_id)

@policy_bp.route("/<int:policy_id>/cancel", methods=["PUT"])
@role_required("Administrator", "Insurance Agent")
def cancel(policy_id):
    return remove_policy(policy_id)

@policy_bp.route("/<int:policy_id>/renew", methods=["PUT"])
@role_required("Administrator", "Insurance Agent")
def renew_policy_route(policy_id):
    return renew(policy_id)

@policy_bp.route("/active", methods=["GET"])
@role_required("Administrator", "Insurance Agent")
def active():
    return view_active_policies()

@policy_bp.route("/expiring", methods=["GET"])
@role_required("Administrator", "Insurance Agent")
def expiring():
    return expiring_policies()