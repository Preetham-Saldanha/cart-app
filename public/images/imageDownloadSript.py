import requests # to get image from the web
import shutil # to save it locally

## Set up the image URL and filename
# image_url = "https://cdn.pixabay.com/photo/2020/02/06/09/39/summer-4823612_960_720.jpg"


imageArr= [
  'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
  'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
  'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
  'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg',
  'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg',
  'https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg',
  'https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg',
  'https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg',
  'https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg',
  'https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg',
  'https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg',
  'https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg',
  'https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg',
  'https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg',
  'https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg',
  'https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg',
  'https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg',
  'https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg',
  'https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg',
  'https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg'
]

for image_url in imageArr:

    # Open the url image, set stream to True, this will return the stream content.
    r = requests.get(image_url, stream = True)
    filename = image_url.split("/")[-1]
# Check if the image was retrieved successfully
    if r.status_code == 200:
    # Set decode_content value to True, otherwise the downloaded image file's size will be zero.
       r.raw.decode_content = True
    
    # Open a local file with wb ( write binary ) permission.
       with open(filename,'wb') as f:
          shutil.copyfileobj(r.raw, f)
        
          print('Image sucessfully Downloaded: ',filename)
    else:
        print('Image Couldn\'t be retreived')


