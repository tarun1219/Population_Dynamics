import numpy as np
import pandas as pd
#dataset=pd.read_csv('rent.csv')
dataset2=pd.read_csv('population_growth.csv')
dataset3=pd.read_csv('demo_file.csv')
dataset4=pd.read_csv('Unemployment.csv')
dataset5=pd.read_csv('Economic_Growth.csv')
unemployment_year=list(dataset4.columns)[2:]
growth_year=list(dataset5.columns)[2:]
populationgrowth=[]
year=dataset2.iloc[:,0].values
growth=dataset2.iloc[:,1].values
unemployment=dataset2.iloc[:,2].values
economicgrowth=dataset2.iloc[:,-1].values

for i in range(len(year)):
    temp_pop={}
    temp_pop['year']=int(year[i])
    temp_pop['growth']=float(growth[i])
    temp_pop['unemployment']=float(unemployment[i])
    temp_pop['economicgrowth']=float(economicgrowth[i])
    populationgrowth.append(temp_pop)

years= list(dataset3.columns)[2:]
# aruba=list(dataset3.iloc[0,:].values)[2:]
# aruba_details=[]
# for i in range(len(aruba)):
#   temp={}
#   temp['year']=int(years[i])
#   temp['population']=int(aruba[i])
#   aruba_details.append(temp)
country_names=list(dataset3.iloc[:,1].values)
country_code=list(dataset3.iloc[:,0].values)
country_list=[]
for i in range(len(country_code)):
  temp={}
  temp['value']=country_code[i]
  temp['label']=country_code[i]
  country_list.append(temp)

