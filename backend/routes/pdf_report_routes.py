from flask import Blueprint

from middleware.role_required import role_required

from controllers.pdf_report_controller import (
    monthly_pdf,
    policy_pdf,
    claim_pdf
)

pdf_bp = Blueprint(
    "pdf_reports",
    __name__
)


@pdf_bp.route("/monthly", methods=["GET"])
@role_required("Administrator")
def monthly():
    return monthly_pdf()


@pdf_bp.route("/policies", methods=["GET"])
@role_required("Administrator")
def policies():
    return policy_pdf()


@pdf_bp.route("/claims", methods=["GET"])
@role_required("Administrator")
def claims():
    return claim_pdf()