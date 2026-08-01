from extensions import db


class Claim(db.Model):
    __tablename__ = "claims"

    id = db.Column(db.Integer, primary_key=True)

    policy_id = db.Column(
        db.Integer,
        db.ForeignKey("policies.id"),
        nullable=False
    )

    claim_amount = db.Column(db.Float, nullable=False)

    reason = db.Column(db.Text, nullable=False)

    status = db.Column(db.String(30), nullable=False)

    submission_date = db.Column(db.Date, nullable=False)

    policy = db.relationship(
        "Policy",
        backref="claims"
    )