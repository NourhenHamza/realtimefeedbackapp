 


import google.generativeai as genai

genai.configure(api_key="AIzaSyCn2s0w7HzDQHkycbW5b8GGPbuajuEWk2o")

model = genai.GenerativeModel("gemini-2.5-flash")
resp = model.generate_content("Hello!")
print(resp.text)
 
 


