from flask import Flask
app = Flask(__name__)

@app.route('/')
def index():
    return 'Hello World!Hey You!'

@app.route('/about')
def hello():
    return 'Web-Revival'

app.debug = True
if __name__ == '__main__':
    app.run(host='0.0.0.0')
