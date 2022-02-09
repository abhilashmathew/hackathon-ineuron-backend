**baseUrl: https://minimal-shop-app.herokuapp.com/**

# Token Route

### create token from refresh token :
> POST request:  https://minimal-shop-app.herokuapp.com/api/v1/token/new

> Body required
 ```   
{
    "refreshToken": "{{refreshToken}}"
}
```

### Decode token  :
> POST request:  https://minimal-shop-app.herokuapp.com/api/v1/token/decode

> Body required
 ```   
{
    "token": "{{anyToken}}"
}
```

# User Route


### register user :
> POST request:  https://minimal-shop-app.herokuapp.com/api/v1/user/register

> Body required
 ```   
{
"email": "newta222@gmail.com",
"password": "newta1234",
"name": "Newta232",
"confirmPassword":"newta1234"
}
```


### login user :
> POST request:  https://minimal-shop-app.herokuapp.com/api/v1/user/login

> Body required
 ```   
{
"email": "newta222@gmail.com",
"password": "newta1234"
}
```


### Get user :
> GET request:  https://minimal-shop-app.herokuapp.com/api/v1/user

> BEARER TOKEN required

### Delete  user :
> DELETE request:  https://minimal-shop-app.herokuapp.com/api/v1/user

> BEARER TOKEN required

### Get all user :
> GET request:  https://minimal-shop-app.herokuapp.com/api/v1/user/all

> BEARER TOKEN required


# Product Route

### create a product :
> POST request:  https://minimal-shop-app.herokuapp.com/api/v1/products

> BEARER TOKEN required

> Body required
 ```   
{
    "title": "This is the title of the product",
    "description": "This is the description of the product",
    "price": 200,
    "image": "https://i.imgur.com/QlRphfQ.jpg"
}
```


### update a product :
> PUT request:  https://minimal-shop-app.herokuapp.com//api/v1/products/{{productId}}

> BEARER TOKEN required

> Body required
 ```   
{
    "title": "This is the updated title of the product",
    "description": "This is the update description of the product",
    "price": 4000,
    "image": "https://i.imgur.com/QlRphfQ.jpg"
}
```

### Get a product :
> GET request:  https://minimal-shop-app.herokuapp.com//api/v1/products/{{productId}}

> BEARER TOKEN required

### deleate a product :
> DELETE request:  https://minimal-shop-app.herokuapp.com//api/v1/products/{{productId}}

> BEARER TOKEN required


