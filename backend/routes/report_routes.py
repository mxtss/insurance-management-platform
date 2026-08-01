from flask import Blueprint

from controllers.report_controller import (
    active,
    expired,
    claims,
    premium,
    customers,
    monthly
)

from middleware.role_required import role_required

report_bp = Blueprint(
    "reports",
    __name__
)


@report_bp.route("/active-policies")
@role_required("Administrator")
def active_route():
    return active()


@report_bp.route("/expired-policies")
@role_required("Administrator")
def expired_route():
    return expired()


@report_bp.route("/claim-statistics")
@role_required("Administrator")
def claim_route():
    return claims()


@report_bp.route("/premium-collection")
@role_required("Administrator")
def premium_route():
    return premium()


@report_bp.route("/customer-growth")
@role_required("Administrator")
def customer_route():
    return customers()


@report_bp.route("/monthly-report")
@role_required("Administrator")
def monthly_route():
    return monthly()