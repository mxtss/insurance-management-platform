import os

from flask import send_file
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import SimpleDocTemplate, Paragraph

from models.customer import Customer
from models.policy import Policy
from models.claim import Claim
from models.premium_payment import PremiumPayment


REPORT_FOLDER = "reports"


def generate_monthly_report():

    os.makedirs(REPORT_FOLDER, exist_ok=True)

    pdf_path = os.path.join(
        REPORT_FOLDER,
        "monthly_report.pdf"
    )

    document = SimpleDocTemplate(pdf_path)

    styles = getSampleStyleSheet()

    elements = []

    elements.append(
        Paragraph(
            "<b>Insurance Management Platform</b>",
            styles["Title"]
        )
    )

    elements.append(
        Paragraph(
            "Monthly Business Report",
            styles["Heading2"]
        )
    )

    elements.append(
        Paragraph(
            f"Total Customers : {Customer.query.count()}",
            styles["BodyText"]
        )
    )

    elements.append(
        Paragraph(
            f"Total Policies : {Policy.query.count()}",
            styles["BodyText"]
        )
    )

    elements.append(
        Paragraph(
            f"Total Claims : {Claim.query.count()}",
            styles["BodyText"]
        )
    )

    total = 0

    payments = PremiumPayment.query.all()

    for payment in payments:
        total += payment.amount

    elements.append(
        Paragraph(
            f"Premium Collection : ₹ {total}",
            styles["BodyText"]
        )
    )

    document.build(elements)

    return send_file(
        pdf_path,
        as_attachment=True
    )


def generate_policy_report():

    os.makedirs(REPORT_FOLDER, exist_ok=True)

    pdf_path = os.path.join(
        REPORT_FOLDER,
        "policy_report.pdf"
    )

    document = SimpleDocTemplate(pdf_path)

    styles = getSampleStyleSheet()

    elements = []

    elements.append(
        Paragraph(
            "Policy Report",
            styles["Title"]
        )
    )

    policies = Policy.query.all()

    for policy in policies:

        elements.append(
            Paragraph(
                f"{policy.policy_number} | {policy.policy_type} | {policy.status}",
                styles["BodyText"]
            )
        )

    document.build(elements)

    return send_file(
        pdf_path,
        as_attachment=True
    )


def generate_claim_report():

    os.makedirs(REPORT_FOLDER, exist_ok=True)

    pdf_path = os.path.join(
        REPORT_FOLDER,
        "claim_report.pdf"
    )

    document = SimpleDocTemplate(pdf_path)

    styles = getSampleStyleSheet()

    elements = []

    elements.append(
        Paragraph(
            "Claim Report",
            styles["Title"]
        )
    )

    claims = Claim.query.all()

    for claim in claims:

        elements.append(
            Paragraph(
                f"Claim ID : {claim.id}",
                styles["BodyText"]
            )
        )

        elements.append(
            Paragraph(
                f"Status : {claim.status}",
                styles["BodyText"]
            )
        )

        elements.append(
            Paragraph(
                f"Amount : ₹ {claim.claim_amount}",
                styles["BodyText"]
            )
        )

        elements.append(
            Paragraph(
                "--------------------------------",
                styles["BodyText"]
            )
        )

    document.build(elements)

    return send_file(
        pdf_path,
        as_attachment=True
    )