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
        name="Links",
        description="A collection of link styles and components.",
        link="/links",
    ),
    Element(
        name="Button",
        description="A collection of button variants and sizes.",
        link="/button",
    ),
    Element(
        name="Accordion",
        description="Collapsible sections using native details and summary elements.",
        link="/accordion",
    ),
    Element(
        name="Dialog",
        description="Modal dialogs using the native dialog element with variant styles.",
        link="/dialog",
    ),
    Element(
        name="Input",
        description="Native HTML inputs styled with CSS, no JavaScript.",
        link="/input",
    ),
    Element(
        name="Form",
        description="Form layouts combining inputs, labels, and buttons.",
        link="/form",
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
