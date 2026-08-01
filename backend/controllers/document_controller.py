from flask import request

from services.document_service import (
    upload_document,
    get_documents,
    download_document
)


def upload():

    print(request.form)
    print(request.files)

    customer_id = request.form.get("customer_id")
    file = request.files.get("file")

    if not customer_id or not file:
        return {
            "message": "Customer ID and file required"
        }, 400

    return upload_document(int(customer_id), file)



def view_documents():
    return get_documents()


def download(document_id):
    return download_document(document_id)