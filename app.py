from flask import Flask, render_template
from libs import Element
from typing import List

app = Flask(__name__)


elements: List[Element] = [
    Element(
        name="Typography",
        description="A collection of typography styles and components.",
        link="/typography",
    ),
    Element(
        name="Accordion",
        description="A simple accordion component using the <details> element.",
        link="/accordion",
    ),
    Element(
        name="Alert",
        description="A callout component for user attention with info, success, destructive, and warning variants.",
        link="/alert",
    ),
    Element(
        name="Avatar",
        description="Displays a user avatar with an image or initials fallback, with a group variant for stacking.",
        link="/avatar",
    ),
    Element(
        name="Badge",
        description="Small status and label indicators with info, secondary, destructive, and outline variants.",
        link="/badge",
    ),
]


# inject to every template
@app.context_processor
def inject_elements():
    return dict(elements=elements)


@app.route("/")
def index():
    return render_template("landing_page.html")


@app.route("/<path:path>")
def catch_all(path):
    return render_template(f"elements/{path}.html")
