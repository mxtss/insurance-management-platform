from flask import Blueprint, request

from schemas.auth_schema import LoginSchema, RegisterSchema
from services.auth_service import register_user
from services.auth_service import register_user, login_user
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt
from models.user import User
from middleware.role_required import role_required

auth_bp = Blueprint("auth", __name__)

register_schema = RegisterSchema()
login_schema = LoginSchema()


@auth_bp.route("/register", methods=["POST"])
def register():

    data = request.get_json()

    errors = register_schema.validate(data)

    if errors:
        return errors, 400

    return register_user(data)


@auth_bp.route("/test")
def test():
    return {
        "message": "Authentication Blueprint Working"
    }

@auth_bp.route("/login", methods=["POST"])
def login():    
    data = request.get_json()

    errors = login_schema.validate(data)

    if errors:
        return errors, 400

    return login_user(data)

@auth_bp.route("/profile", methods=["GET"])
@jwt_required()
def profile():

    user_id = get_jwt_identity()
    claims = get_jwt()

    user = User.query.get(user_id)

    return {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "role": user.role,
        "jwt_claims": claims
    }, 200

@auth_bp.route("/admin", methods=["GET"])
@role_required("Administrator")
def admin_dashboard():

    return {
        "message": "Welcome Administrator"
    }, 200