from flask import Flask, request
import processing
from flask_cors import CORS, cross_origin
app=Flask(__name__)
cors = CORS(app)
@app.route("/")
def home():
    return("Server for EC273 project")


@app.route("/populationgrowth")
@cross_origin()

def populationgrowth():
    return processing.populationgrowth

@app.route("/aruba")
@cross_origin()

def aruba():
    data=request.args.get('data')
    for i in range(len(processing.country_code)):
        if processing.country_code[i]==data:
            country=list(processing.dataset3.iloc[i,:].values)[2:]
            country_details=[]
            for i in range(len(country)):
                temp={}
                temp['year']=int(processing.years[i])
                temp['population']=int(country[i])
                country_details.append(temp) 
    return country_details

@app.route("/unemployment")
@cross_origin()
def unemployment():
    data=request.args.get('data')
    for i in range(len(processing.country_code)):
        if processing.country_code[i]==data:
            country=list(processing.dataset4.iloc[i,:].values)[2:]
            country_unemployment=[]
            for i in range(len(country)):
                if country[i]>-50:
                    temp={}
                    temp['year']=int(processing.unemployment_year[i])
                    temp['unemployment']=float(country[i])
                    country_unemployment.append(temp) 
    return country_unemployment
@app.route("/growth")
@cross_origin()
def growth():
    data=request.args.get('data')
    for i in range(len(processing.country_code)):
        if processing.country_code[i]==data:
            country=list(processing.dataset5.iloc[i,:].values)[2:]
            country_growth=[]
            for i in range(len(country)):
                if country[i]>-80:
                    temp={}
                    temp['year']=int(processing.growth_year[i])
                    temp['growth']=float(country[i])
                    country_growth.append(temp) 
    return country_growth
    # return processing.aruba_details

@app.route("/country")
@cross_origin()

def country():
    return processing.country_list

if __name__=="__main__":
    app.run(debug=True)