from flask import Flask, render_template, request, make_response
import random


app = Flask(__name__)


# Predefined list of real first names
first_names = [
    "John",
    "Emma",
    "Olivia",
    "Liam",
    "Noah",
    "Sophia",
    "James",
    "Ava",
    "Lucas",
    "Mia",
]
last_names = [
    "Smith",
    "Johnson",
    "Williams",
    "Brown",
    "Jones",
    "Garcia",
    "Miller",
    "Davis",
    "Martinez",
    "Lopez",
]


def random_id():
    return random.randint(1000, 9999)


def random_name():
    return f"{random.choice(first_names)} {random.choice(last_names)}"


def random_email(name):
    domains = ["example.com", "testmail.com", "sample.org"]
    username = name.lower().replace(" ", ".")
    return f"{username}@{random.choice(domains)}"


def generate_data(num_records=5):
    data_list = []
    for _ in range(1, num_records + 1):
        name = random_name()
        record = {
            "id": random_id(),
            "name": name,
            "email": random_email(name),
            "age": random.randint(18, 65),
            "active": random.choice([True, False]),
        }
        data_list.append(record)
    return data_list


@app.route("/")
def index():
    return render_template("landing_page.html")


@app.get("/api/")
def api():
    num_records = request.args.get("num_records", default=5, type=int)
    data = generate_data(num_records)

    response = ""

    for item in data:
        html = f"""
        <div class="people-card">
            <div class="people-card-header">
                <h2>{item['name']}</h2>
                <p>Email: {item['email']}</p>
            </div>
            <span>Age: {item['age']}</span>
            <span>Active: {item['active']}</span>
        </div>
        """
        response += html
    response = make_response(response, 200)
    response.headers["Content-Type"] = "text/html"
    return response

