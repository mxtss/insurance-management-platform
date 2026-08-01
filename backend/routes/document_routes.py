from flask import Blueprint

from controllers.document_controller import (
    upload,
    view_documents,
    download
)

from middleware.role_required import role_required


document_bp = Blueprint(
    "documents",
    __name__
)


@document_bp.route(
    "/upload",
    methods=["POST"]
)
@role_required(
    "Administrator",
    "Insurance Agent",
    "Customer"
)
def upload_route():
    return upload()


@document_bp.route(
    "",
    methods=["GET"]
)
@role_required(
    "Administrator",
    "Insurance Agent"
)
def get_all():
    return view_documents()


@document_bp.route(
    "/download/<int:document_id>",
    methods=["GET"]
)
@role_required(
    "Administrator",
    "Insurance Agent",
    "Customer"
)
def download_route(document_id):
    return download(document_id)