from services.report_service import (
    active_policies,
    expired_policies,
    claim_statistics,
    premium_collection,
    customer_growth,
    monthly_business_report
)


def active():
    return active_policies()


def expired():
    return expired_policies()


def claims():
    return claim_statistics()


def premium():
    return premium_collection()


def customers():
    return customer_growth()


def monthly():
    return monthly_business_report()