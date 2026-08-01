from flask import Flask
from extensions import db, migrate, jwt, bcrypt
from flask_cors import CORS
from routes.auth_routes import auth_bp
from routes.customer_routes import customer_bp
from routes.policy_routes import policy_bp
from routes.premium_payment_routes import payment_bp
from routes.claim_routes import claim_bp
from routes.document_routes import document_bp
from routes.report_routes import report_bp
from routes.pdf_report_routes import pdf_bp

from config import Config


def create_app():
    app = Flask(__name__)

    app.config.from_object(Config)
    app.config["UPLOAD_FOLDER"] = "uploads"

    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    bcrypt.init_app(app)
    CORS(
    app,
    origins=[
        "https://insurance-frontend-qtnn.onrender.com/"
    ]
)

    import models

    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(customer_bp, url_prefix="/api/customers")
    app.register_blueprint(policy_bp, url_prefix="/api/policies")
    app.register_blueprint(payment_bp, url_prefix="/api/payments")
    app.register_blueprint(claim_bp, url_prefix="/api/claims")
    app.register_blueprint(document_bp, url_prefix="/api/documents")
    app.register_blueprint(report_bp, url_prefix="/api/reports")
    app.register_blueprint(pdf_bp, url_prefix="/api/pdf-reports")
    @app.route("/")
    def home():
        return {
            "message": "Insurance Management Platform API is running"
        }

    return app


app = create_app()


if __name__ == "__main__":
    app.run(debug=True)