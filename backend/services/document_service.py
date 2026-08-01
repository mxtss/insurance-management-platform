import os

from werkzeug.utils import secure_filename

from flask import current_app, send_from_directory
from mimetypes import guess_type
from extensions import db

from models.document import Document
from models.customer import Customer


ALLOWED_EXTENSIONS = {
    "pdf",
    "jpg",
    "jpeg",
    "png"
}


def allowed_file(filename):

    return "." in filename and \
        filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


def upload_document(customer_id, file):

    customer = Customer.query.get(customer_id)

    if not customer:
        return {"message": "Customer not found"}, 404

    if file.filename == "":
        return {"message": "No file selected"}, 400

    if not allowed_file(file.filename):
        return {"message": "Invalid file type"}, 400

    filename = secure_filename(file.filename)

    upload_folder = current_app.config["UPLOAD_FOLDER"]

    os.makedirs(upload_folder, exist_ok=True)

    file.save(
        os.path.join(upload_folder, filename)
    )

    document = Document(
        customer_id=customer_id,
        file_name=filename,
        file_path=filename
    )

    db.session.add(document)
    db.session.commit()

    return {
        "message": "Document uploaded successfully"
    }, 201


def get_documents():

    documents = Document.query.all()

    result = []

    for doc in documents:

        result.append({

            "id": doc.id,

            "customer_id": doc.customer_id,

            "file_name": doc.file_name,

            "uploaded_at":
            doc.uploaded_at.strftime("%Y-%m-%d %H:%M:%S")
        })

    return result, 200


def download_document(document_id):

    document = Document.query.get(document_id)

    if not document:
        return {
            "message": "Document not found"
        }, 404


    file_path = os.path.join(
        current_app.config["UPLOAD_FOLDER"],
        document.file_path
    )


    mime_type, _ = guess_type(file_path)


    return send_from_directory(
        current_app.config["UPLOAD_FOLDER"],
        document.file_path,
        as_attachment=True,
        mimetype=mime_type
    )