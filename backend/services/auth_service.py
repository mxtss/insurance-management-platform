from models.user import User
from extensions import db
from flask_jwt_extended import create_access_token


def register_user(data):
    existing_user = User.query.filter_by(email=data["email"]).first()

    if existing_user:
        return {"message": "Email already exists"}, 400

    user = User(
        name=data["name"],
        email=data["email"],
        role=data["role"]
    )

    user.set_password(data["password"])

    db.session.add(user)
    db.session.commit()

    return {"message": "User registered successfully"}, 201

def login_user(data):
    user = User.query.filter_by(email=data["email"]).first()

    if not user:
        return {"message": "Invalid email or password"}, 401

    if not user.check_password(data["password"]):
        return {"message": "Invalid email or password"}, 401

    access_token = create_access_token(
        identity=str(user.id),
        additional_claims={
            "role": user.role,
            "name": user.name
        }
    )

    return {
        "message": "Login successful",
        "access_token": access_token,
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": user.role
        }
    }, 200