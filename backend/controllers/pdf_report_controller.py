from services.pdf_report_service import (
    generate_monthly_report,
    generate_policy_report,
    generate_claim_report
)


def monthly_pdf():
    return generate_monthly_report()


def policy_pdf():
    return generate_policy_report()


def claim_pdf():
    return generate_claim_report()