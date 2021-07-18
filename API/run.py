
################################
#       Importing Library      #
################################
from app import app
from dotenv import load_dotenv
load_dotenv()
import os

################################
#     import configuration     #
################################
url = os.environ.get("url_api")
port = os.environ.get("port_api")
debug = os.environ.get("debug")

################################
#      RUN API : flask run     #
################################
if __name__ == "__main__":
    app.run(host=url,port=port,debug=True)

