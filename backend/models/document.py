from extensions import db
from datetime import datetime


class Document(db.Model):
    __tablename__ = "documents"

    id = db.Column(db.Integer, primary_key=True)

    customer_id = db.Column(
        db.Integer,
        db.ForeignKey("customers.id"),
        nullable=False
    )

    file_name = db.Column(db.String(255), nullable=False)

    file_path = db.Column(db.String(255), nullable=False)

    uploaded_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    customer = db.relationship(
        "Customer",
        backref="documents"
    )