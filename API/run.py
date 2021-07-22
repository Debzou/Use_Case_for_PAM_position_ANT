
################################
#       Importing Library      #
################################
from app import app
from dotenv import load_dotenv
load_dotenv()
import os

################################
################################
#     import configuration     #
################################
port = os.environ.get("port_api")

################################
#      RUN API : flask run     #
################################
if __name__ == "__main__":
    app.run(host='0.0.0.0',port=port,debug=True)

